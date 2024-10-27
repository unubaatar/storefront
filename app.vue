<script setup lang="ts">
import Footer from './Layouts/footer.vue';
import Header from './Layouts/header.vue';
</script>

<template>

  <NuxtLayout >
    <Header ></Header>
    <NuxtPage style="padding-top: 100px;" />
    <Footer></Footer>
  </NuxtLayout>

</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: 	#f8f8f8;
}
</style>
