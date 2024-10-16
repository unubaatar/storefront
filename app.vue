<script setup lang="ts">
import Header from './Layouts/header.vue';
</script>

<template>
  <NuxtLayout>
  <Header></Header>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
