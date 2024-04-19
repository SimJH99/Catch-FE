<template>
    <div class="mys_cont">
        <MyProfileContentsShop/>
    </div>
</template>

<script>
import MyProfileContentsShop from "@/components/MyProfileContentsShop.vue";

export default {
    components: {
        MyProfileContentsShop
    },
    setup () {
        

        return {}
    }
}
</script>


<style>
.mys_cont {
    outline: none;
    display: table-cell;
    width: 1016px;
    padding-left: 54px;
    vertical-align: top;
}


</style>