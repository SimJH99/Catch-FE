<template>
    <div class="mys_doc">
        <div class="mys_top">
            <div class="my_grd">
                <dl>
                    <dt>
                        <span class="grd" id="staff_yn">
                            <img src="@/assets/mys/vvip.png" id="grade_img" alt="vvip등급">
                        </span>
                    </dt>
                    <dd class="grd" id="grade_nm">VVIP
                        <!-- TIP LAYER -->
                        <div class="lyr_tip_wrap">
                        </div>
                        <!-- //TIP LAYER -->
                    </dd>
                    <dd class="mb">김선국님의 CATCH입니다</dd>
                    <dd class="lnk"><a href="#">이벤트 보러가기 ></a></dd>
                </dl>
            </div>

            <div class="my_itm"> 
                <dl class="cpn">
                    <dt><a href="javascript:overpass.link('MYCPNLIST');" class="dt">쿠폰 <em class="ir">페이지 이동</em></a> <em class="arm" id="cpn_date"><!-- 7일내 만료예정 1장 --></em></dt>
                    <dd><a href="javascript:overpass.link('MYCPNLIST');"><span class="num"><em id="cpn_cnt">5<!-- 5 --></em>장</span><em class="ir">쿠폰 페이지 이동</em></a></dd>
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
export default {
    setup () {
        

        return {}
    },
}
</script>

<style >


</style>