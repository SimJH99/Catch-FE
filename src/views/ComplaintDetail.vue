<template>
    <div class="my_body">
        <div class="content">
            <div class="wrap mys">
                <MyProfileTop/>
                <MyProfileSideVue class="mys_lnb"/>
                <MyProfileContents class="mys_cont"/>
            </div>
        </div>
    </div>
</template>

<script>
import MyProfileContents from "@/components/ComplaintDetailComponent.vue";
import MyProfileTop from "@/components/MyProfileTop.vue";
import MyProfileSideVue from '@/components/MyProfileSide.vue';


export default {
    components: {
        MyProfileTop,
        MyProfileContents,
        MyProfileSideVue
    },
    setup () {
        

        return {}
    }
}
</script>

<style>
.my_body
    {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    background-color: white;
}


.wrap.mys {
    position: relative;
    width: 1280px;
    margin: 30px auto 0 auto;
}

.mys_cont {
    outline: none;
    display: table-cell;
    width: 1016px;
    padding-left: 54px;
    vertical-align: top;
}

.content {
    position: relative;
    width: 100%;
    min-width: 1280px;
    margin: 0 auto;
    padding-bottom: 100px;
}


div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td, legend, img, button {
    margin: 0;
    padding: 0;
    font-family: 'NanumSquare_acR';
    font-weight: 400;
    font-size: 13px;
    color: #191919;
    letter-spacing: 0;
}


header, footer, section, article, aside, nav, hgroup, details, menu, figure, figcaption, canvas, summary {
    display: block;
}

.wrap.mys {
    position: relative;
    width: 1280px;
    margin: 30px auto 0 auto;
}

.mys_lnb {
    display: table-cell;
    overflow: hidden;
    width: 208px;
    border-top: 0;
    vertical-align: top;
}



</style>