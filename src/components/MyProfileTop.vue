<template>
    <div class="mys_doc">
        <div class="mys_top">
            <div class="my_grd">
                <dl>
                    <dt>
                        <span class="grd" id="staff_yn">
                            <img src="@/assets/images/common/vvip.png" id="grade_img" alt="vvip등급">
                        </span>
                    </dt>
                    <dd class="grd" id="grade_nm">VVIP
                        <!-- TIP LAYER -->
                        <div class="lyr_tip_wrap">
                        </div>
                        <!-- //TIP LAYER -->
                    </dd>
                    <dd class="mb">김선국님</dd>
                    <dd class="lnk"><a href="#">이벤트 보러가기 ></a></dd>
                </dl>
            </div>

            <div class="my_itm"> 
                <dl class="cpn">
                    <dt><a href="javascript:overpass.link('MYCPNLIST');" class="dt">쿠폰 <em class="ir">페이지 이동</em></a> <em class="arm" id="cpn_date"><!-- 7일내 만료예정 1장 --></em></dt>
                    <dd><a href="javascript:overpass.link('MYCPNLIST');"><span class="num"><em id="cpn_cnt">{{ couponCount }}</em>장</span><em class="ir">쿠폰 페이지 이동</em></a></dd>
                </dl>
                <dl class="rsv">
                    <dt><a href="javascript:overpass.link('MYSAVEMONEY');" class="dt">적립금 <em class="ir">페이지 이동</em></a> <em class="arm" id="save_money_date"></em></dt>
                    <dd><a href="javascript:overpass.link('MYSAVEMONEY');"><span class="num"><em id="save_cnt">3500<!-- 100 --></em>원</span><em class="ir">적립금 페이지 이동</em></a></dd>
                </dl>
            </div>  

        </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
    data () {
        return {
            couponCount: '',
        }
    },    
    created(){
        this.loadMyCouponCount();
    },
    methods: {
        async loadMyCouponCount() {
        try{
            const access_token = localStorage.getItem('access_token');
            const headers = access_token ? {Authorization: `Bearer ${access_token}`} : {};
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/coupon/myCouponCount`, { headers });
            this.couponCount = response.data.result.data;
            console.log("couponConut : " + this.couponCount);
        }catch(error){
            console.log(error);
        }
      },
    }
}
</script>

<style >



.mys_doc{min-height:165px;margin-bottom:50px;}

.mys_top{min-height:165px;background:-moz-linear-gradient(45deg,rgb(251 146 60),#FDD4A0);background:-webkit-linear-gradient(45deg,rgb(251 146 60),#FDD4A0);background:-o-linear-gradient(45deg,rgb(251 146 60),#FDD4A0);background:-ms-linear-gradient(45deg,rgb(251 146 60),#FDD4A0);background: linear-gradient(45deg,rgb(251 146 60),#FDD4A0);filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1,startColorstr='rgb(251 146 60)',endColorstr='#FDD4A0');zoom:1;}


.mys_top .my_grd {
    float: left;
    height: 75px;
    padding-left: 90px;
    margin: 37px 30px 0 40px;
    max-width: 260px;
}

.dl {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
}

.dt{
    display: block;
    unicode-bidi: isolate;
}

.mys_top .my_grd dt {
    position: absolute;
    top: 11px;
    left: 0;
    padding: 15px 0px 0px 25px;
}

.mys_top .my_grd dt span.grd {
    display: block;
    width: 70px;
    height: 70px;
    background: url(@/assets/images/common/ico_grd.png) no-repeat 0 0;
}

.mys_top .my_grd dt span.grd img {
    width: 60px;
    margin: 18.5px 0 0 7.5px;
}

.mys_top .my_grd dt span.ico{position:absolute;bottom:-17px;left:9px;display:inline-block;width:52px;height:26px;font-size:13px;line-height:26px;color:#fff;text-align:center;border-radius:13px;-webkit-border-radius:13px;background:-moz-linear-gradient(45deg,#EC72D3,#F5B527);background:-webkit-linear-gradient(45deg,#EC72D3,#F5B527);background:-o-linear-gradient(45deg,#EC72D3,#F5B527);background:-ms-linear-gradient(45deg,#EC72D3,#F5B527);background: linear-gradient(45deg,#EC72D3,#F5B527);filter: progid:DXImageTransform.Microsoft.gradient(GradientType=1,startColorstr='#EC72D3',endColorstr='#F5B527');zoom:1;}
.mys_top .my_grd dd{position:relative;}
.mys_top .my_grd dd.grd{font-size:20px;line-height:29px;color:#fff;}
.mys_top .my_grd dd.mb{margin-top:2px;font-size:15px;line-height:22px;color:#fff;font-weight:400;}
.mys_top .my_grd dd.mb a{color:#fff}
.mys_top .my_grd dd.nmb{margin-top:22px;font-size:18px;line-height:22px;color:#fff;font-weight:400;}
.mys_top .my_grd dd.lnk{margin-top:9px; color:#fff}

.mys_top .my_itm{display:table;table-layout:fixed;overflow:hidden;}
.mys_top .my_itm dl{position:relative;overflow:hidden;display:table-cell;width:286px;height:135px;vertical-align:top;}
.mys_top .my_itm dl:after{content:'';display:block;position:absolute;left:0;top:0;width:1px;height:165px;background-color:#FFF;opacity:0.15;filter:alpha(opacity=15);z-index:1}
.mys_top .my_itm dl dt{position:absolute;left:30px;top:27px;height:29px;font-size:20px;line-height:29px;color:#fff;font-weight:500;}
.mys_top .my_itm dl dt a{display:inline-block;color:#fff;vertical-align:top;}

.mys_top .my_itm dl dt .arm{display:block;margin:2px 0 0 5px;font-size:13px;line-height:19px;font-weight:400;} 
.mys_top .my_itm dl.gcs dt a{margin:2px 0 0 5px;}
.mys_top .my_itm dl.gcs dt .arm{position:relative;display:block;height:26px;padding:0 24px 0 10px;margin:0;border-radius:13px;-webkit-border-radius:13px;font-size:11px;line-height:26px;font-weight:500;color:#5232D9;background:#fff;}

.mys_top .my_itm dl.gcs dt a.dtb{display:block;margin-top:6px;}
.mys_top .my_itm dl.gcs dt a.dtb .arm{width:auto;}

.mys_top .my_itm dl dd{overflow:hidden;padding:0 30px;font-size:15px;line-height:32px;color:#fff;letter-spacing:0;text-align:right;background:no-repeat 30px 73px;}
.mys_top .my_itm dl dd a{display:inline-block;margin-top:74px;color:#fff;}
.mys_top .my_itm dl dd > .num{display:inline-block;margin-top:74px;color:#fff;}
.mys_top .my_itm dl dd .num{display:block;}
.mys_top .my_itm dl dd .num em{overflow:hidden;margin-right:2px;font-family:'Roboto Condensed';font-size:26px;font-weight:normal;vertical-align:-1px;}
.mys_top .my_itm dl dd .reg{display:block;padding:14px 0 20px 77px;font-size:13px;line-height:19px;text-align:center;}
.mys_top .my_itm dl dd .reg .tx{display:block;margin-bottom:10px;}
.mys_top .my_itm dl dd span a{width:70px;color:#191919;text-align:center;}
.mys_top .my_itm dl dd .sch{display:block;padding-top:5px;text-align:right;}
.mys_top .my_nmb{overflow:hidden;float:right;padding-top:52px;width:500px;padding-right:30px;}
.mys_top .my_nmb .m_nmb{overflow:hidden;}
.mys_top .my_nmb .m_nmb dt{margin-bottom:6px;font-size:15px;line-height:22px;color:#fff;font-weight:500;}
.mys_top .my_nmb .m_nmb dd{font-size:13px;line-height:19px;color:#d9c9ff;}
.mys_top .my_nmb .m_nmb dd + dd{margin-top:4px;}

</style>