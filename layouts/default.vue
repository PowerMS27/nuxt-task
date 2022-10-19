<template>
  <main class="main">
    <div class="container">
      <Nuxt />
    </div>
  </main>
</template>
<style>
html {
  background: #fbfbfb;
}
.main {
  padding: 15px 0 40px 0;
}
.container {
  margin: 0 auto;
  max-width: 1060px;
  padding: 0 20px;
}
@media (max-width: 340px) {
  .container {
    padding: 0 15px;
  }
}
</style>
