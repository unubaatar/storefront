<script setup lang="ts">
const layout = "layout";
import Footer from './Layouts/footer.vue';

</script>

<template>

<NuxtLayout>
      <NuxtPage />
</NuxtLayout>
<Footer></Footer>

</template>

<script lang="ts" setup>
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'Commissioner', sans-serif; 
}

body {
  background-color:#E8E8E8;
}

::-webkit-scrollbar {
  width: 12px;  
  height: 12px; 
}

::-webkit-scrollbar-thumb {
  background-color: #888; 
  border-radius: 8px; 
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px; 
}

::-webkit-scrollbar {
  border-radius: 8px; 
}

</style>
