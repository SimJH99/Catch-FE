<template>
    <header class="bg-white py-4 text-base md:text-xl" v-if="showHeader">
      <div class="container mx-auto flex justify-end items-center">
        <nav class="space-x-4">

        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true
    }
  }
}
  </script>
  
  <style scoped>
  /* Tailwind CSS 클래스를 여기에 직접 작성하거나 추가할 수 있습니다. */
  </style>
  