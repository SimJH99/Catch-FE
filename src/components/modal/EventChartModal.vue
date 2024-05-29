<template>
  <div v-if="isEventChartModalOpen" class="modal">
    <div class="modal-content-large" @click.stop>
      <div class="modal-header">
        <h2 style="font-size: 24px; font-weight: bold; color:#EFEFEF">캠페인 통계</h2>
        <span class="close" @click="closeDetailModal">&times;</span>
      </div>
      <div class="modal-body">
        <div v-if="loading">
          로딩 중...
        </div>
        <div v-else>
          <div v-if="!isEditing">
            <div class="user-info">
              <div class="m-2 text-xl font-bold">제목 : {{ this.eventInfo.name }}</div>
              <div class="grid grid-cols-2">
                <div class="m-2 text-md text-[16px]">시작일 : {{this.eventInfo.startDate}}</div>
                <div class="m-2 text-md text-[16px]">종료일 : {{this.eventInfo.endDate}}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="m-2 text-md text-[16px]">캠페인 배포 건수 : {{this.sendInfo}}건</div>
                <div class="m-2 text-md text-[16px]">캠페인 확인 건수 : {{this.receiveInfo}}건</div>
              </div>
              <div class="bg-white m-2 p-2 rounded-md shadow-md border h-[400px]">
                <div class="m-2 text-2xl font-bold">캠페인 유입 현황</div>
                <div class="m-2 p-4" style="height: 350px; overflow-y: auto;">
                  <canvas id="gradeChart" ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import axios from "@/axios/index";
import Chart from 'chart.js/auto';
export default {
  props: ['selectedEventId', 'isEventChartModalOpen'],
  data() {
    return {
      accountDetails: {},
      loading: false,
      isEditing: false,
      gradeInfo: {},
      grades: [],
      gradeCount: [],
      eventInfo: {},
      sendInfo: {},
      receiveInfo: {},
    };
  },
  watch: {
    selectedEventId: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.isEventChartModalOpen) {
          this.loadAccountDetails(newVal);
        }
      }
    },
    isEventChartModalOpen: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          setTimeout(() => {
            this.gradeChart(this.sendInfo, this.receiveInfo);
        }, 500);
        }
      }
    },
  },
  methods: {
    async loadAccountDetails(selectedEventId) {
      try {
        this.loading = true;
        const access_token = localStorage.getItem('access_token');
        const headers = access_token ? { Authorization: `Bearer ${access_token}` } : {};
        const eventResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/event/${selectedEventId}/detail`, { headers });
        const eventSendResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/event/${selectedEventId}/send/count`, { headers });
        const eventReceiveResponse = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/log/event/${selectedEventId}/receive/count`, { headers });

        this.eventInfo = eventResponse.data.result;
        this.sendInfo = eventSendResponse.data.result.data;
        this.receiveInfo = eventReceiveResponse.data.result.data;
        
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        this.loading = false;
      }
    },
    closeDetailModal() {
      this.isEditing = false;
      this.$emit('close-modal');
    },
    async resetData() {
    // 데이터 초기화
    this.accountDetails = {};
    this.loading = false;
    this.isEditing = false;
    this.gradeInfo = {};
    this.grades = [];
    this.gradeCount = [];
    // 차트 파괴
    const canvas = document.getElementById('gradeChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx && Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
      }
    }
  },
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    gradeChart(sendInfo, receiveInfo) {
      if (sendInfo !== null && receiveInfo!== null) {
        const canvas = document.getElementById('gradeChart');
        if (canvas && canvas.getContext) {
          const ctx = canvas.getContext('2d');
          const value = sendInfo;
          // 이전 차트 파괴
          if (Chart.getChart(ctx)) {
            Chart.getChart(ctx)?.destroy();
          }
          // 새로운 차트 생성
          new Chart(ctx, {
            type: 'doughnut',

            data: {
              labels: ['미확인 메일 수', '확인된 메일 수'],
              datasets: [{
                label: ' ',
                data: [value - receiveInfo, receiveInfo],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
                circumference: 180, // 도넛 반 자르기
                rotation: 270, // 도넛 돌리기
              }]
            },
            options: {
              maintainAspectRatio: false,
              aspectRatio: 1,
              cutout: '78%',
              hover: { mode: null },
              scales: {
                x: {
                  display: false // x축의 선을 숨김
                },
                y: {
                  beginAtZero: true,
                  display: false // y축의 선을 숨김
                },
              },
              plugins: {
            legend: {
                    position: 'bottom',
                  },
              }
            }
          });
        }
      }
    },
  }
};
</script>

<style scoped>
.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-large {
  width: 600px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 100vh;
  overflow-y: auto;
}

.close {
  cursor: pointer;
  border: none;
  background: none;
  font-size: 24px;
  color: #000000;
}

.modal-header {
  background-color: #f5a742;
  color: white;
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
}

.modal-body-large {
  padding: 40px;
}

.rounded-table {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eae8e8;
  background-color: #f5f5f5;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #d9d8d8;
  background-color: #ffffff;
  height: 40px;
}

.table-iframe {
  display: flex;
  border-bottom: 1px solid #d9d8d8;
  background-color: #ffffff;
  max-width: max-content;
  height: 350px;
}

.preview {
  margin-top: 10px;
  width: 100%;
  height: 300px;
}

.fix_preview{
  width: 100%;
  height: 300px; /* 수정: 내용 입력창의 높이에 따라 조정하세요 */
}

.table-label,
.table-value {
  padding: 12px;
}

.table-label {
  background-color: #efefef;
  color: black;
  font-weight: bold;
  flex: 1;
}

.table-value {
  flex: 3;
}

.btn-container {
  text-align: right;
}

.btn {
  cursor: pointer;
  background-color: #f5a742;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 10px;
  margin-left: 10px;
}

.btn:hover {
  background-color: #e69500;
}
</style>
