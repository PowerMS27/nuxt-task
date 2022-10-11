<template>
   <main class="main">
      <div class="container">
         <Nuxt />
      </div>
   </main>
</template>
<script>
export default {
   layout: 'layout',
}
</script>
<style scoped>
   .main {
      padding: 35px 0;
      background: #FBFBFB;
   }
   .container {
      margin: 0 auto;
      max-width: 1060px;
   }
</style>