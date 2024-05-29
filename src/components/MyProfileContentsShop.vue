<template>
    <div class="mys_m_shop">
        <h3>쇼핑정보 <em>(최근1개월 기준)</em></h3>
        
        <div class="my_clm">
            <dl>
                <dt>취소</dt>
                <dd><a href="#" id="claim_cancel">0<em class="ir"></em></a></dd>
            </dl>
            <dl>
                <dt>교환</dt>
                <dd><a href="#" id="claim_exchng">0<em class="ir"></em></a></dd>
            </dl>
            <dl>
                <dt>반품</dt>
                <dd><a href="#" id="claim_return">0<em class="ir"></em></a></dd>
            </dl>
        </div>
        
        <!-- STEP -->
        <div class="my_step">
            <div class="m_step">
                <dl class="s1">
                    <dt>결제대기</dt>
                    <dd><a code="goOrderList" href="#" id="pay_wait"></a></dd>
                </dl>
                <dl class="s2">
                    <dt>결제완료</dt>
                    <dd><a code="goOrderList" href="#" id="pay_fini"></a></dd>
                </dl>
                <dl class="s3">
                    <dt>상품준비중</dt>
                    <dd><a code="goOrderList" href="#" id="ship_indi"></a></dd>
                </dl>
                <dl class="s4">
                    <dt>물류센터이동중</dt>
                    <dd><a code="goOrderList" href="#" id="ship_ing"></a></dd>
                </dl>
                <dl class="s5">
                    <dt>배송중</dt>
                    <dd><a code="goOrderList" href="#" id="deli_ing"></a></dd>
                </dl>
                <dl class="s6">
                    <dt>배송완료</dt>
                    <dd><a code="goOrderList" href="#" id="deli_fini"></a></dd>
                </dl>
            </div>
            <div class="m_clm">
            </div>
        </div>
        <!-- STEP -->
        
        <!-- STATE -->
        <div class="my_stat">
            <dl>
                <dt><span class="dt">상품리뷰</span></dt>
                <dd><span class="dd">미작성 <a href="#">0</a></span></dd>
            </dl>
            <dl>
                <dt><span class="dt">상품문의</span></dt>
                <dd>
                    <span class="dd">작성<a href="#">0</a></span>
                    <span class="dd">답변<a href="#">0</a></span>
                </dd>
            </dl>
            <dl>
                <dt><span class="dt">1:1 문의내역</span></dt>
                <dd>
                    <span class="dd">작성 <a href="#">0</a></span>
                    <span class="dd">답변 <a href="#">0</a></span>
                </dd>
            </dl>
            <dl>
                <dt><span class="dt">캠페인 참여내역</span></dt>
                <dd>
                    <span class="dd">응모<a href="#">0</a></span>
                    <span class="dd">당첨<a href="#">0</a></span>
                </dd>
            </dl>
        </div>

        <MyProfileContentsCoupon class="mt-10"/>


        <div class="mt-3 grid grid-cols-2 border-t border-[#D4D4D8]">
            <div class="border-r border-[#D4D4D8]">
                <div class="flex justify-between bg-gray-100">
                    <div class="font-bold text-xl px-2 pt-2 bg-gray-100">문의내역</div>
                    <div class="px-2 py-3 bg-gray-100 cursor-pointer" @click="MyComplaintList">전체 보기</div>
                </div>
                <div class="p-3">
                    <table class="w-full">
                        <tbody>
                            <tr v-for="(complaint) in complaintList" :key="complaint.id" @click="detailComplaint(complaint.id)">
                                <td class="cursor-pointer">{{ complaint.title }}</td>
                                <td :class="getStatusColor(complaint.status)" class="cursor-pointer">{{ complaint.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div class="bg-gray-100">
                    <div class="font-bold text-xl px-2 pt-2 bg-gray-100"> Best FAQ </div>
                </div>
                <div class="p-3">
                    <table class="w-full">
                        <tbody>
                          <tr>
                            <td @click="toggleDisplay1(index)" class="p-1 flex justify-between cursor-pointer border-b border-gray-300">
                                [로그인/정보] 아이디와 비밀번호가 기억나지 않아요.
                            </td>
                            <transition name="fade">
                                <p v-if="displayIndex1 !== -1" class="w-full p-1 bg-gray-100 outline-none resize-none" readonly>
                                    로그인 화면에서  아이디 찾기/비밀번호 찾기를 통해 확인 가능합니다.<br>아이디 찾기는 아래 3가지 방법 중 하나로 진행해 주세요.<br><br><br>■ 휴대전화<br>회원 정보에 등록된 본인의 휴대전화 번호를 인증하는 방법입니다.<br><br><br>■ 이메일<br>회원 정보에 등록된 본인의 이메일 주소를 인증하는 방법입니다.<br><br><br>■ 본인인증<br>이용 중인 통신사와 휴대전화 번호를 인증하는 방법입니다.<br><br><br>※ 비밀번호 재설정을 완료한 휴면 회원은 휴면 해제 및 탈퇴 신청이 취소됩니다.<br>※ 비밀번호 찾기는 휴대전화 본인 인증으로만 가능합니다.
                                </p>
                            </transition>
                          </tr>
                          <tr>
                            <td @click="toggleDisplay2(index)" class="mt-2 p-1 flex justify-between cursor-pointer border-b border-gray-300">
                                [상품 문의] 재고가 없어요. 언제쯤 구입할 수 있을까요?
                            </td>
                            <transition name="fade">
                                <p v-if="displayIndex2 !== -1" class="w-full p-1 bg-gray-100 outline-none resize-none" readonly>
                                    품절 상품 재입고 여부 및 일정은 정확한 확인이 가능하지 않지만 재입고 알림을 등록하면 알림톡으로 확인 할 수 있습니다.  <br>알림 신청 방법은 아래내용을 확인해 주세요.<br><br><br>■ 재입고 알림 신청 <br>모바일(앱) : 상품 선택 > 구매하기 > 재입고 알림 받기 선택<br><br><br>※ 재입고 알림 신청은 APP에서만 신청이 가능합니다.<br>※ 재고 입고 수량에서 요청순서에 따라 순차적으로 발송 됩니다.<br>※ 재입고 알림 버튼이 보이지 않거나 재입고 관련 상세확인은 상품 페이지의 상품문의를 이용해 주세요.    
                                </p>
                            </transition>
                          </tr>
                          <tr>
                            <td @click="toggleDisplay3(index)" class="mt-2 p-1 flex justify-between cursor-pointer border-b border-gray-300">
                                [배송 일반] 일반 배송 상품은 언제 배송 되나요?
                            </td>
                            <transition name="fade">
                                <p v-if="displayIndex3 !== -1" class="w-full p-1 bg-gray-100 outline-none resize-none" readonly>
                                    일반배송은 브랜드마다 일정이 다르고 평일 기준으로 출고 됩니다. <br>출고 일정은 상품의 상세페이지 출고 정보에서 확인 가능합니다.<br><br><br>※ 평일 기준 출고로 연휴 및 공휴일은 배송일에서 제외됩니다.<br>※ 캐치스토어는 전 상품 100% 무료 배송입니다. <br>※ 배송 지연 상품의 경우 상품명에 지연으로 아이콘이 표시됩니다. <br>※ 출고 지연 발생 시에는 알림톡 또는 문자를 통해 안내해 드립니다.<br>※ 주문 시 배송 메모에 배송 희망 일자를 작성하셔도 해당일에 지정 배송은 어렵습니다.
                                </p>
                            </transition>
                          </tr>
                          <tr>
                            <td @click="toggleDisplay4(index)" class="mt-2 p-1 flex justify-between cursor-pointer border-b border-gray-300">
                                [기타] 주문한 상품이 일부만 도착했어요.
                            </td>
                            <transition name="fade">
                                <p v-if="displayIndex4 !== -1" class="w-full p-1 bg-gray-100 outline-none resize-none" readonly>
                                    브랜드 및 상품에 따라 출고지가 다르기 때문에 여러 개 상품을 주문한 경우에는 각각 배송이 됩니다. <br>브랜드가 달라도 상품 주문 시 한 번에 결제할 수 있습니다. <br><br><br>아직 도착하지 않는 상품은 아래 경로에서 배송진행 상황을 확인해 주세요. 
                                </p>
                            </transition>
                          </tr>
                          <tr>
                            <td @click="toggleDisplay5(index)" class="mt-2 p-1 flex justify-between cursor-pointer">
                                [취소/반품(환불)] 반품접수는 어떻게 하나요?
                            </td>
                            <transition name="fade">
                                <p v-if="displayIndex5 !== -1" class="w-full p-1 bg-gray-100 outline-none resize-none" readonly>
                                    교환(환불) 접수 시 선택했던 방법으로 반품 접수해 주세요.<br><br><br>■ 회수해 주세요<br>캐치 자동회수 서비스로 택배기사가 요청한 회수지로 평일 기준 1일 ~ 3일 이내 방문합니다. <br>※ 방문 전 택배 기사분이 연락 후 방문 예정이며, 비대면으로 상품을 전달할 때는 반품 상자를 구분할 수 있도록 표시 후 회수 장소에 보관해 주세요.<br><br><br>■ 직접 보냈어요<br>상품을 받은 택배사와 같은 택배사로 고객님께서 직접 반품 예약을 해주셔야 합니다.<br>상품 회수 완료 시 반송장 정보를 입력해 주세요.<br><br><br>※ 계약된 택배사가 아닌 다른 택배사 이용 시 추가 비용 발생할 수 있고 2개 이상의 브랜드 반송 시, 각각 반송지로 보내주세요.<br>※ 안내서에 배송비 동봉 등에 대한 내용이 있더라도, 동봉하면 안 됩니다.
                                </p>
                            </transition>
                          </tr>
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
        <!-- //STATE -->
    </div>
</template>

<script>
import axios from "@/axios/index";
import MyProfileContentsCoupon from "@/components/MyProfileContentsCoupon.vue";
export default {
  components: {
    MyProfileContentsCoupon,
  },
  data() {
    return {
        complaintList: {},
        displayIndex1: -1,
        displayIndex2: -1,
        displayIndex3: -1,
        displayIndex4: -1,
        displayIndex5: -1,
    };
  },
  created() {
    this.myComplaintList();
  },
  methods: {
    MyComplaintList(){
        this.$router.push({ name: 'MyComplaintList' });
    },
    async myComplaintList(){
        const token = localStorage.getItem('access_token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/complaints/myPage`, { headers});
        this.complaintList = response.data.result.data.map((account) => ({
            ...account,
            status: this.formatRole(account.status),
        }));
    },
    detailComplaint(id){
        this.$router.push(`/${id}/complaintDetail`)
    },
    formatRole(status) {
      switch (status) {
        case "BEFORE":
          return "답변 없음";
        case "REPLY":
          return "답변 완료";
        default:
          return status;
      }
    },
    getStatusColor(status) {
      return {
        'p-1 whitespace-nowrap text-right text-red-400': status === '답변 없음', // BEFORE 상태일 때 글자색을 빨간색으로 설정
        'p-1 whitespace-nowrap text-right text-green-400': status === '답변 완료' // REPLY 상태일 때 글자색을 초록색으로 설정
      };
    },
    toggleDisplay1(index) {
        this.displayIndex1 = this.displayIndex1 === index ? -1 : index;
    },
    toggleDisplay2(index) {
        this.displayIndex2 = this.displayIndex2 === index ? -1 : index;
    },
    toggleDisplay3(index) {
        this.displayIndex3 = this.displayIndex3 === index ? -1 : index;
    },
    toggleDisplay4(index) {
        this.displayIndex4 = this.displayIndex4 === index ? -1 : index;
    },
    toggleDisplay5(index) {
        this.displayIndex5 = this.displayIndex5 === index ? -1 : index;
    },
  }
};
</script>

<style>
.mys_m_shop{position:relative;clear:both;overflow:hidden;margin-bottom:70px;border-bottom:1px solid #D4D4D8;}
.mys_cont h3 {
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
    line-height: 38px;
}
.mys_m_shop h3 em{font-size:13px;line-height:38px;color:#505050;}

.mys_m_shop .my_clm{position:absolute;right:9px;top:23px;}
.mys_m_shop .my_clm dl{float:left;height:22px;}
.mys_m_shop .my_clm dt{float:left;margin-left:39px;font-size:14px;line-height:22px;color:#505050;}
.mys_m_shop .my_clm dd{float:left;margin-left:20px;}
.mys_m_shop .my_clm dd a{display:block;font-family:'Roboto Condensed';font-size:18px;line-height:22px;color:#191919;text-decoration:underline;}

.mys_m_shop .my_step{height:168px;border:1px solid #D4D4D8;border-bottom:1px solid #E9E9ED;background:#F8F8FA;}
.mys_m_shop .my_step .m_step{height:168px;padding-right:28px;}



.mys_m_shop .my_step .m_step dl{position:relative;overflow:hidden;float:left;width:133px;height:120px;padding:48px 0 0 28px;}
.mys_m_shop .my_step .m_step dl.s4{width:149px;}
.mys_m_shop .my_step .m_step dl.s4 dd{width:149px}
.mys_m_shop .my_step .m_step dl.s4 dd a{width:149px}
.mys_m_shop .my_step .m_step dl.s4 dt{width:149px;}
.mys_m_shop .my_step .m_step dl dt{width:133px;margin-bottom:14px;font-size:14px;line-height:20px;color:#505050;text-align:center;}
.mys_m_shop .my_step .m_step dl dd{width:133px;height:48px;text-align:center;background:url("@/assets/images/mys/ico_step_01.png") no-repeat 50% 0;}


.mys_m_shop .my_step .m_step dl.s2 dd{background-image:url("@/assets/images/mys/ico_step_02.png")}
.mys_m_shop .my_step .m_step dl.s3 dd{background-image:url("@/assets/images/mys/ico_step_03.png")}
.mys_m_shop .my_step .m_step dl.s4 dd{background-image:url("@/assets/images/mys/ico_step_04.png")}
.mys_m_shop .my_step .m_step dl.s5 dd{background-image:url("@/assets/images/mys/ico_step_05.png")}
.mys_m_shop .my_step .m_step dl.s6 dd{background-image:url("@/assets/images/mys/ico_step_06.png")}
.mys_m_shop .my_step .m_step dl dd a{display:block;position:absolute;left:27px;top:48px;width:133px;height:100px;}
.mys_m_shop .my_step .m_step dl dd a em{display:inline-block;min-width:10px;height:32px;padding:0 11px;margin:26px 0 0 40px;border-radius:16px;-webkit-border-radius:16px;font-family:'Roboto Condensed';font-size:18px;line-height:32px;color:#fff;text-align:center;background:#191919}
.mys_m_shop .my_stat{overflow:hidden;clear:both;height:116px;border-left:1px solid #D4D4D8;border-right:1px solid #D4D4D8; border-bottom:1px solid #D4D4D8;}
.mys_m_shop .my_stat dl{position:relative;float:left;width:225px;height:98px;padding:18px 0 0 28px}
.mys_m_shop .my_stat dl + dl:after{content:'';display:block;position:absolute;left:0;top:0;width:1px;height:116px;background-color:#E9E9ED;z-index:1}
.mys_m_shop .my_stat dt{height:58px;}
.mys_m_shop .my_stat dt .dt{display:block;margin-bottom:2px;font-size:16px;line-height:24px;color:#191919;}
.mys_m_shop .my_stat dt .tx{display:block;font-size:13px;line-height:19px;color:#767676;}
.mys_m_shop .my_stat dt .tx em{color:#E22757}
.mys_m_shop .my_stat dd{text-align:right;padding-right:28px;}
.mys_m_shop .my_stat dd span{display:inline-block;}
.mys_m_shop .my_stat dd span + span{margin-left:20px;}
.mys_m_shop .my_stat dd span a{display:inline-block;margin-left:6px;vertical-align:middle;}
.mys_m_shop .my_stat dd span.dd{font-size:13px;line-height:22px;color:#767676;}
.mys_m_shop .my_stat dd span.dd a{font-family:'Roboto Condensed';font-size:18px;line-height:22px;color:#191919;}

table {
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }

  .fade-enter-active, .fade-leave-active {
      transition: opacity 0.2s ease;
  }  
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0;
  }


</style>