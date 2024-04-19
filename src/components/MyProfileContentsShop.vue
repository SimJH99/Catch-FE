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
        <!-- //STATE -->
    </div>
</template>

<script>

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


</style>