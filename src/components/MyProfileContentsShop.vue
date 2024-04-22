<template>
    <div class="mys_m_shop">
        <h3>쇼핑정보 <em>(최근1개월 기준)</em></h3>
        
        <div class="my_clm">
            <dl>
                <dt>취소</dt>
                <dd><a href="javascript:overpass.link('MYCLAIM', {ord_crt_divi_cd:'20'});" id="claim_cancel">0<em class="ir"></em></a></dd>
            </dl>
            <dl>
                <dt>교환</dt>
                <dd><a href="javascript:overpass.link('MYCLAIM', {ord_crt_divi_cd:'40'});" id="claim_exchng">0<em class="ir"></em></a></dd>
            </dl>
            <dl>
                <dt>반품</dt>
                <dd><a href="javascript:overpass.link('MYCLAIM', {ord_crt_divi_cd:'30'});" id="claim_return">0<em class="ir"></em></a></dd>
            </dl>
        </div>
        
        <!-- STEP -->
        <div class="my_step">
            <div class="m_step">
                <dl class="s1">
                    <dt>결제대기</dt>
                    <dd><a code="goOrderList" href="javascript:overpass.link('MYORDER');" id="pay_wait"></a></dd>
                </dl>
                <dl class="s2">
                    <dt>결제완료</dt>
                    <dd><a code="goOrderList" href="javascript:overpass.link('MYORDER');" id="pay_fini"></a></dd>
                </dl>
                <dl class="s3">
                    <dt>상품준비중</dt>
                    <dd><a code="goOrderList" href="javascript:overpass.link('MYORDER');" id="ship_indi"></a></dd>
                </dl>
                <dl class="s4">
                    <dt>물류센터이동중</dt>
                    <dd><a code="goOrderList" href="javascript:overpass.link('MYORDER');" id="ship_ing"></a></dd>
                </dl>
                <dl class="s5">
                    <dt>배송중</dt>
                    <dd><a code="goOrderList" href="javascript:overpass.link('MYORDER');" id="deli_ing"></a></dd>
                </dl>
                <dl class="s6">
                    <dt>배송완료</dt>
                    <dd><a code="goOrderList" href="javascript:overpass.link('MYORDER');" id="deli_fini"></a></dd>
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
                <dd><span class="dd">미작성 <a href="javascript:overpass.link('MYREV');">0</a></span></dd>
            </dl>
            <dl>
                <dt><span class="dt">상품문의</span></dt>
                <dd>
                    <span class="dd">작성<a href="javascript:overpass.link('MYQNA');">0</a></span>
                    <span class="dd">답변<a href="javascript:overpass.link('MYQNA');">0</a></span>
                </dd>
            </dl>
            <dl>
                <dt><span class="dt">1:1 문의내역</span></dt>
                <dd>
                    <span class="dd">작성 <a href="javascript:overpass.link('MYCONTACT');">0</a></span>
                    <span class="dd">답변 <a href="javascript:overpass.link('MYCONTACT');">0</a></span>
                </dd>
            </dl>
            <dl>
                <dt><span class="dt">이벤트참여내역</span></dt>
                <dd>
                    <span class="dd">응모<a href="javascript:overpass.link('MYEVENT');">0</a></span>
                    <span class="dd">당첨<a href="javascript:overpass.link('MYEVENT');">0</a></span>
                </dd>
            </dl>
        </div>

        <div class="mt-3 grid grid-cols-2 border border-[#D4D4D8]">
            <div class="border-r border-[#D4D4D8]">
                <div class="flex justify-between bg-gray-100">
                    <div class="font-bold text-xl px-2 pt-2 bg-gray-100">문의내역</div>
                    <div class="px-2 py-3 bg-gray-100 cursor-pointer" @click="MyComplaintList">전체 보기</div>
                </div>
                <div class="p-3">
                    <table class="w-full">
                        <tbody>
                            <tr v-for="(complaint) in complaintList" :key="complaint.title" class="">
                                <td>{{ complaint.title }}</td>
                                <td :class="getStatusColor(complaint.status)">{{ complaint.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div class="flex justify-between bg-gray-100">
                    <div class="font-bold text-xl px-2 pt-2 bg-gray-100"> Best FAQ </div>
                    <div class="px-2 py-3  bg-gray-100">상세 보기</div>
                </div>
                <div class="p-3">
                    <table class="w-full">
                        <tbody>
                            <tr v-for="(i) in people" :key="i.name">
                                <div class="p-1 flex justify-between">
                                    <td>{{ i.name }}</td>
                                    <a href="#">
                                        <td>{{ i.age }}</td>
                                    </a>
                                </div>
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
import axios from 'axios';
export default {
  data() {
    return {
        complaintList: {},
        people: [
            { name: '[로그인/정보] 아이디와 비밀번호가 기억나지 않아요.', age: '자세히 보기' },
            { name: '[배송 일반] 일반 배송 상품은 언제 배송 되나요?', age: '자세히 보기' },
            { name: '[결제수단] 결제하는 방법에 따라 할인 이벤트가 있나요?', age: '자세히 보기' },
            { name: '[주문] 상품을 받는 주소(배송지) 등록은 어떻게 하나요?', age: '자세히 보기' },
            { name: '[취소/반품(환불)] 반품접수는 어떻게 하나요?', age: '자세히 보기' },
        ]
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
.mys_m_shop .my_stat{overflow:hidden;clear:both;height:116px;border-left:1px solid #D4D4D8;border-right:1px solid #D4D4D8;}
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


</style>