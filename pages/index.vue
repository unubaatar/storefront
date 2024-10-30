<template>
  <div class="d-flex justify-center" style="padding-top: 100px;">
    <div style="min-height: 100vh; width: 100%; max-width: 1440px">
      <v-row>
        <v-col cols="6" sm="4" md="2" v-for="item in total">
          <v-card
            @click="goToProductDetail()"
            rounded="xl"
            elevation="0"
            class="pa-4"
            style="cursor: pointer"
          >
            <div
              style="height: 32px"
              class="w-100 d-flex justify-space-between"
            >
              <v-chip size="small">20%</v-chip>
              <div>
                <img
                  style="height: 24px"
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt=""
                />
              </div>
            </div>
            <img
              src="https://www.bell.ca/Styles/wireless/iphone_16_pro_max/iPhone_16_Pro_Max_Desert_Titanium_lrg3.png"
              alt=""
              style="width: 100%; height: 180px; object-fit: cover"
            />
            <div>Product Name</div>
            <div>
              <v-chip color="red" size="small" class="mt-1">Tag</v-chip>
            </div>
            <div class="d-flex justify-space-between w-100 mt-1">
              <span style="text-decoration: line-through; color: gray"
                >1,999,000₮</span
              >
              <span>1,599,000₮</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "layout",
});

import { useRuntimeConfig } from "#app";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const baseUrl = useRuntimeConfig().public.baseURL;
const total = ref<any>(10);

const goToProductDetail = () => {
  router.push("/product/id");
}
</script>
