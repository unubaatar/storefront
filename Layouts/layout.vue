<template>
  <v-layout>
    <v-card
      style="width: 100%; height: 80px; position: fixed; z-index: 10"
      elevation="0"
    >
      <div class="w-100 h-100 d-flex justify-space-between align-center px-16">
        <div class="d-flex align-center">
          <v-btn
            @click="goSearch()"
            elevation="0"
            style="background-color: #e5e4e2 !important"
            rounded="pill"
            ><v-icon>mdi-magnify</v-icon><span>Хайх</span></v-btn
          >
        </div>

        <div>
          <div style="font-size: 28px; cursor: pointer" @click="goHome()">
            Ecommerce
          </div>
        </div>

        <div class="d-flex align-center">
          <div>
            <v-btn
              v-if="!customerId"
              variant="text"
              @click="router.push('/auth')"
              >Нэвтрэх</v-btn
            >
          </div>
          <div v-if="customerId" class="mx-2">
            <v-icon style="font-size: 28px; cursor: pointer"
              >mdi-heart-outline</v-icon
            >
          </div>
          <div v-if="customerId" class="mx-2">
            <v-icon style="font-size: 28px; cursor: pointer"
              >mdi-cart-variant</v-icon
            >
          </div>
          <div v-if="customerId" class="mx-2">
            <v-icon style="font-size: 28px; cursor: pointer"
              >mdi-account</v-icon
            >
          </div>
          <div @click="logOut()" v-if="customerId" class="mx-2">
            <v-icon style="font-size: 28px; cursor: pointer">mdi-logout</v-icon>
          </div>
        </div>
      </div>
    </v-card>

    <v-main>
      <slot class="py-8" />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
definePageMeta({});
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const customerId = ref<any>({});
const router = useRouter();

const goHome = () => {
  router.push("/");
};

const goSearch = () => {
  router.push("/search");
};

const logOut = () => {
  localStorage.removeItem("customerId");
  window.location.reload();
  router.push("/");
};

onMounted(() => {
  customerId.value = localStorage.getItem("customerId");
});
</script>
