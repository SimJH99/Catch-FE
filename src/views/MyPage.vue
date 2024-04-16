<template>
    <div class="content">
        <div class="wrap mys">
            <MyProfileTop/>
        </div>
    </div>
</template>

<script>
import MyProfileTop from "@/components/MyProfileTop.vue";

export default {
    components: {
        MyProfileTop,
    },
    setup () {
        

        return {}
    }
}
</script>

<style>

.content {
    position: relative;
    width: 100%;
    min-width: 1280px;
    margin: 0 auto;
    padding-bottom: 100px;
}

.wrap.mys {
    position: relative;
    width: 1280px;
    margin: 30px auto 0 auto;
}

.div {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', 'Roboto Condensed', '돋음', Dotum, 'Apple SD Gothic Neo', sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #191919;
    letter-spacing: 0;
}
.body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
}

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
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', 'Roboto Condensed', '돋음', Dotum, 'Apple SD Gothic Neo', sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #191919;
    letter-spacing: 0;
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
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', 'Roboto Condensed', '돋음', Dotum, 'Apple SD Gothic Neo', sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #191919;
    letter-spacing: 0;
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
    background: url(@/assets/mys/ico_grd.png) no-repeat 0 0;
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