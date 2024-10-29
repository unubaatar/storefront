<script setup lang="ts">
import Footer from './Layouts/footer.vue';
import Header from './Layouts/header.vue';
</script>

<template>

  <NuxtLayout >
    <Header ></Header>
    <NuxtPage />
    <Footer></Footer>
  </NuxtLayout>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Commissioner', sans-serif; 
}

body {
  background-color: 	#f8f8f8;
}
</style>
