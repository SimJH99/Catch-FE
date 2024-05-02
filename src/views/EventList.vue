<template>
  <div>
    <div class="m-3 p-1 bg-white rounded-md shadow-md flex">
      <div class="text-4xl font-bold p-3">이벤트 조회</div>
    </div>

    <div class="m-3 p-1 bg-white rounded-md shadow-md">
      <div class="container mb-4 mx-[10px]" style="width: calc(100% - 40px);">
        <table style="width: calc(100% - 20px); margin: 10px">
          <tbody>
            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center"
                style="background-color: #F5A742; width: 20%; color: white;">제목</th>
              <td class="px-2 border-2 border-gray-300" style="width: 80%;">
                <input type="text" id="searchName" v-model="searchName"
                  class="w-full text-base outline-none hover:bg-gray-100 active:bg-gray-200">
              </td>
            </tr>
            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center"
                style="background-color: #F5A742; width: 20%; color: white;">시작일</th>
              <td class="px-2 border border-gray-300" style="width: 80%;">
                <div class="flex">
                  <input type="date" id="searchStartDate" v-model="searchStartDate"
                    class="m-1 p-1 rounded-md w-48 outline-none hover:bg-gray-100 active:bg-gray-200">
                </div>
              </td>
            </tr>
            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center"
                style="background-color: #F5A742; width: 20%; color: white;">마감일</th>
              <td class="px-2 border border-gray-300" style="width: 80%;">
                <div class="flex">
                  <input type="date" id="searchEndDate" v-model="searchEndDate"
                    class="m-1 p-1 rounded-md w-48 outline-none">
                </div>
              </td>
            </tr>

            <tr>
              <th class="p-2 border-2 border-orange-400 text-xl text-center" style="background-color: #F5A742; width: 20%; color: white;">상태</th>
              <td class="px-2 border border-gray-300" style="width: 80%;">
                  <select id="searchEventStauts" v-model="searchEventStauts" class="m-1 p-1 rounded-md w-48 outline-none">
                    <option value="발급">발급</option>
                    <option value="삭제">삭제</option>
                    <option value="발행">발행</option>
                    <option value="만료">만료</option>
                  </select>
              </td>
          </tr>

          </tbody>
        </table>
        <div class="flex justify-between">
          <div style="margin-left: 10px; margin-top: 30px">
            <span>페이지 크기:</span>
            <select v-model="pageSize" @change="changePageSize" class="outline-none">
              <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
          <div style="text-align: right; margin-bottom: 10px; margin-right: 10px;">
            <button @click="resetInputs"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-[120px] mr-3"> 입력값 초기화
            </button>
            <button @click="loadEvent"
              class="bg-custom-F5A742 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-[120px]"> 검색
            </button>
          </div>
        </div>
      </div>

      <div class="container mb-4 bg-white" style="width: calc(100% - 40px); margin: 10px; border-color: #CCCCCC;">
        <table class="divide-y divide-gray-200" style="width: calc(100% - 20px); margin: 10px">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input id="selectAllCheckbox" type="checkbox" @change="selectAllEvents"/>
          </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시작일
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종료일
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="event in eventList" :key="event.id">
              <td class="px-6 py-4 whitespace-nowrap" >
                <input type="checkbox" :checked="selectedEvents[event.id]" @change="updateSelectedEvents(event.id)" style="cursor: pointer;">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="!event.editing">{{ event.name }}</span>
                <input v-else type="text" v-model="event.name" @blur="cancelEdit(event)" @keyup.enter="saveEdit(event)">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.startDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.endDate }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.eventStatus }}</td>
              <td class="px-6 py-4 whitespace-nowrap"><button @click.stop="openEventDetailModal(event.id)" class="btn">수정</button></td>
            </tr>
          </tbody>
        </table>
        <div class="modal-content" @click.stop>
          <div class="modal-inner">
            <EventDetailModal :isEventModalOpen="isEventModalOpen" :selectedEventId="selectedEventId"
              @close-modal="isEventModalOpen = false" />
          </div>
        </div>
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPageCount" @page-change="changePage"
          style="margin-bottom: 25px;" />
        <div class="flex justify-between" style="width: calc(100% - 20px); margin: 10px;">
          <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: calc(100% - 400px);" @click="openSelectUserModal">발행</button>
            <SelectUserModal :isModalSelectUserOpen="isModalSelectUserOpen" :selectedEvents="selectedEvents" @close-modal="isModalSelectUserOpen = false"/>
          <button class="bg-custom-F5A742 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded" style="width: 200px; text-align: center; margin-left: 10px;" @click="deleteCoupon">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";
import PaginationComponent from '@/components/PaginationComponent.vue';
import EventDetailModal from '@/components/modal/EventDetailModal.vue';
import SelectUserModal from "@/components/modal/SelectEventUserModal.vue";

export default {
  components: {
    PaginationComponent,
    EventDetailModal,
    SelectUserModal,
  },
  data() {
    return {
      eventList: [],
      selectedEvents: {},
      selectedEventId: null,
      searchName: '',
      searchStartDate: '',
      searchEndDate: '',
      searchEventStauts: '',
      pageSizeOptions: [10, 25, 50, 100],
      pageSize: 10,
      currentPage: 0,
      searchValue: '',
      isLastPage: false,
      isLoading: false,
      totalPageCount: 0,
      isEventModalOpen: false,
      isModalSelectUserOpen: false,
      isAllSelected: false, // 전체 선택 체크박스 상태 추가
    }
  },
  created() {
    this.loadEvent();
  },
  methods: {
    async loadEvent() {
      try {
        const params = {
          page: this.currentPage,
          size: this.pageSize,
        }
        console.log("search 호출");
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const data = {
          name: this.searchName,
          startDate: this.searchStartDate,
          endDate: this.searchEndDate,
          eventStatus: this.searchEventStauts,
        };
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/eventList`, data, { headers, params });
        console.log(response);
        this.eventList = response.data.result.content;
        this.totalPageCount = response.data.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    searchEvent() {
      this.eventList = [];
      this.totalPageCount = '';
      this.loadEvent();
    },
    changePage(pageNum) {
      this.currentPage = pageNum;
      this.loadEvent();
    },
    changePageSize(event) {
      this.pageSize = parseInt(event.target.value);
      this.loadEvent();
    },
    openEventDetailModal(id) {
      this.selectedEventId = id;
      console.log(id);
      this.isEventModalOpen = true;
      console.log("List에서 클릭하면 열리는지 여부: ", this.isEventModalOpen);
    },
    closeEventModal() {
      this.isEventModalOpen = false;
      console.log(this.isEventModalOpen);
    },
    openSelectUserModal() {
        console.log(this.selectedEvents);
        if (Object.keys(this.selectedEvents).length === 0) {
            alert("이벤트을 선택하세요");
            return;
        }
        this.isModalSelectUserOpen = true;
        console.log("List에서 클릭하면 열리는지 여부: ",this.isModalSelectUserOpen);
    },
    closeSelectUserModal() {
        this.isModalSelectUserOpen = false;
        console.log(this.isModalSelectUserOpen);
    },

    // async publishCoupon() {
    //     console.log(this.selectedCoupons);
    //     if (Object.keys(this.selectedCoupons).length === 0) {
    //         alert("쿠폰을 선택하세요");
    //         return;
    //     }
    //     try {
    //         const access_token = localStorage.getItem('access_token');
    //         const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};

    //         for (const couponId of Object.keys(this.selectedCoupons)) {
    //             try {
    //                 await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/publish`, {}, { headers });
    //                 // 추후에는 쿠폰을 받을 사람들의 접속된 토큰을 가져와서 해당 기기에 알람 전송
    //                 // 일단은 
    //                 this.isModalOpen = false;
    //             } catch (error) {
    //                 console.error(`쿠폰 발행 중 오류 발생 (쿠폰 ID: ${couponId})`, error);
    //                 throw new Error('쿠폰 발행 중 오류 발생');
    //             }
    //         }
    //         console.log('선택한 쿠폰이 성공적으로 발행되었습니다.');
    //         alert("쿠폰 발행 성공")
    //         this.selectedEvent = {};
    //         window.location.reload();
    //     } catch (error) {
    //         this.selectedCoupons = {};
    //         console.error('쿠폰 발행 중 오류 발생', error);
    //         alert("발행 불가능한 쿠폰 입니다.")
    //     }
    // },
    // async deleteCoupon() {
    //     try {
    //         const access_token = localStorage.getItem('access_token');
    //         const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};

    //         for (const couponId of Object.keys(this.selectedCoupons)) {
    //             try {
    //                 await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/coupon/${couponId}/delete`, {}, { headers });
    //             } catch (error) {
    //                 console.error(`쿠폰 삭재 중 오류 발생 (쿠폰 ID: ${couponId})`, error);
    //                 alert(`쿠폰 삭재 중 오류 발생 (쿠폰 ID: ${couponId})`)
    //                 throw new Error('쿠폰 발행 중 오류 발생');
    //             }
    //         }

    //         console.log('선택한 쿠폰이 성공적으로 삭제되었습니다.');
    //         alert("쿠폰 삭제 성공")
    //         window.location.reload();
    //     } catch (error) {
    //         console.error('쿠폰 삭제 중 오류 발생', error);
    //         alert("삭제 불가능한 쿠폰 입니다.")
    //     }
    // },
    resetInputs() {
      this.searchName = null;
      this.searchStartDate = null;
      this.searchEndDate = null;
      this.searchEventStauts =null;
      this.searchEvent();
    },

    selectAllEvents() {
        this.isAllSelected = !this.isAllSelected;
        this.eventList.forEach(event => {
            this.selectedEvents[event.id] = this.isAllSelected;
        });
    },
    // 개별 쿠폰 체크박스 클릭 시 선택된 쿠폰 목록을 업데이트하는 메서드
    updateSelectedEvents(eventId) {
        this.selectedEvents[eventId] = !this.selectedEvents[eventId];
    },
  },
}
</script>

<style scoped>
.btn {
    cursor: pointer;
    background-color: #f5a742;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;

  }
  
  .btn:hover {
    background-color: #e69500;
  }


</style>