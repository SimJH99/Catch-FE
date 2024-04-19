<template>
    <div class="body">
        <div class="content">
            <MyProfileTop/>
            <MyProfileSideVue class="inb"/>
        </div>
    </div>

</template>

<script>
import MyProfileTop from "@/components/MyProfileTop.vue";
import MyProfileSideVue from '@/components/MyProfileSide.vue';

export default {
    components: {
        MyProfileTop,
        MyProfileSideVue
    },
    setup () {
        

        return {}
    }
}
</script>

<style>

.body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
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
    font-family: 'Noto Sans KR', 'Roboto Condensed', '돋음', Dotum, 'Apple SD Gothic Neo', sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #191919;
    letter-spacing: 0;
}

header, footer, section, article, aside, nav, hgroup, details, menu, figure, figcaption, canvas, summary {
    display: block;
}

.inb{
    overflow: hidden;
    width: 170px;
    padding: 0 19px 20px 19px;
    padding-top: 0px;
    padding-right: 19px;
    padding-bottom: 20px;
    padding-left: 19px;
    border: 1px solid #D4D4D8;
    border-top: 2px solid #191919;
}


</style>