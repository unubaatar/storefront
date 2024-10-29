<template>
  <div style="padding-top: 80px">
    <v-row style="height: 100%" class="pa-0 ma-0">
      <v-col style="position: fixed; z-index: 2 !important;" cols="3" class="pa-0 ma-0 h-100">
        <div class="h-100" style="background-color: white">
          <div class="d-flex w-100 justify-center pt-8">
            <v-text-field
              max-width="300"
              variant="outlined"
              label="Search"
              hide-details
            >
            </v-text-field>
            <v-btn elevation="0" style="height: 56px"
              ><v-icon style="font-size: 28px">mdi-magnify</v-icon></v-btn
            >
          </div>
          <hr class="my-8 mx-8" />
          <div>
            <div class="mx-8">
              <div
                class="d-flex align-center"
                style="cursor: pointer"
                v-for="item in count"
              >
                <v-hover>
                  <template v-slot:default="{ isHovering, props }">
                    <div
                      class="d-flex align-center w-100"
                      :style="isHovering ? 'background-color: #C0C2C9' : ''"
                      v-bind="props"
                    >
                      <v-checkbox hide-details></v-checkbox>
                      <span class="ml-2" style="font-size: 20px"
                        >Category name</span
                      >
                    </div>
                  </template>
                </v-hover>
              </div>
            </div>
          </div>
        </div>
      </v-col>



      <v-col cols="3"></v-col>
      <v-col  cols="9" class="pa-8 ma-0 h-100">

        <div style="font-weight: bold; font-size: 32px;"  >Ухаалаг цаг</div>
        <div style="font-size: 16px;"  >Нийт 32 бүтээгдхүүн олдлоо</div>
        <v-row class="mt-4">
          <v-col cols="2" v-for="item in items" >
            <v-card
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
            </v-card></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

definePageMeta({
  title: "test",
});

const count = ref<any>(10);
  const items = ref<any>(32);
</script>
