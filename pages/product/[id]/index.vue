<template>
  <div style="padding-top: 80px" class="w-100 d-flex justify-center">
    <v-card
      rounded="xl"
      elevation="0"
      style="max-width: 1440px; background-color: white"
      class="w-100 pa-8 pb-16 my-6"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="w-100 d-flex justify-center flex-column align-center"
        >
          <div
            style="width: 75%"
            class="d-flex align-center justify-space-between"
          >
            <div class="d-flex align-center">
              <v-icon @click="goBack" style="font-size: 56px; cursor: pointer"
                >mdi-chevron-left</v-icon
              >
            </div>
            <div>
              <div style="font-size: 24px; font-weight: bold">
                {{ product.name }}
              </div>
              <div style="font-size: 14px; line-height: 1">
                {{ selectedVariant?.name }}
              </div>
            </div>
          </div>
          <img
            class="mt-8"
            style="width: 75%; object-fit: cover; max-height: 500px"
            :src="
              selectedVariant.images
                ? selectedVariant.images[0]
                : selectedVariant.thumbnails
            "
            alt=""
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="pa-8">
            <div class="d-flex align-center justify-space-between w-100">
              <!-- <v-card
                style="width: 50%; min-width: 300px; border: 1px #e8e8e8 solid"
                class="pa-2 px-4"
                rounded="lg"
                variant="outlined"
              >
                <div class="px-2">Хямдрал дуусахад</div>
                <Countdown
                  with-years
                  :date="new Date('Oct 19, 2026 16:50:30')"
                  v-slot="{ days, hours, minutes, seconds }"
                >
                  <div class="d-flex align-center">
                    <div
                      class="px-2 d-flex justfiy-center align-center flex-column"
                    >
                      <div style="font-size: 20px; font-weight: 500">
                        {{ days }}
                      </div>

                      <p style="font-size: 12px">Өдөр</p>
                    </div>
                    <div>:</div>
                    <div
                      class="px-2 d-flex justfiy-center align-center flex-column"
                    >
                      <div style="font-size: 20px; font-weight: 500">
                        {{ hours }}
                      </div>
                      <p style="font-size: 12px">Цаг</p>
                    </div>
                    <div>:</div>
                    <div
                      class="px-2 d-flex justfiy-center align-center flex-column"
                    >
                      <div style="font-size: 20px; font-weight: 500">
                        {{ minutes }}
                      </div>
                      <p style="font-size: 12px">Минут</p>
                    </div>
                    <div>:</div>
                    <div
                      class="px-2 d-flex justfiy-center align-center flex-column"
                    >
                      <div style="font-size: 20px; font-weight: 500">
                        {{ seconds }}
                      </div>
                      <p style="font-size: 12px">Секунд</p>
                    </div>
                  </div>
                </Countdown>
              </v-card> -->
              <img
                v-if="product.brand"
                style="height: 32px; border-radius: 50%"
                :src="product.brand.image"
                alt=""
              />
            </div>

            <div class="mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Praesentium esse maiores est iure laborum harum aperiam incidunt
              doloribus. Odio id ratione mollitia modi pariatur voluptates
              velit, ut sed impedit, doloribus harum ipsum.
            </div>

            <div class="d-flex justify-space-between mt-6">
              <section>
                <div style="font-weight: 500">
                  {{
                    selectedVariant.sellPrice ? "Хямдарсан үнэ" : "Үндсэн үнэ"
                  }}
                </div>
                <div class="d-flex align-center">
                  <span style="font-size: 32px; font-weight: 600"
                    >{{ selectedVariant?.sellPrice?.toLocaleString() }} ₮ </span
                  ><v-chip
                    v-if="selectedVariant.sellPrice"
                    color="#ff6166"
                    style="border: 2px solid #ff6166; font-weight: bold"
                    class="ml-4"
                    rounded="lg"
                    variant="outlined"
                    size="small"
                  >
                    {{
                      (
                        100 -
                        (selectedVariant.sellPrice / selectedVariant.price) *
                          100
                      ).toFixed(1)
                    }}
                    %</v-chip
                  >
                </div>
                <div
                  v-if="selectedVariant.sellPrice"
                  style="font-size: 14px; color: gray"
                >
                  Хэмнэлт:
                  <span class="ml-4">
                    {{
                      (
                        selectedVariant?.price - selectedVariant?.sellPrice
                      )?.toLocaleString()
                    }}
                    ₮</span
                  >
                </div>
              </section>

              <section>
                <div style="font-weight: 500">
                  {{ selectedVariant.sellPrice ? " Анхны үнэ" : "" }}
                </div>
                <div
                  style="
                    font-size: 24px;
                    color: gray;
                    text-decoration: line-through;
                  "
                >
                  {{ selectedVariant?.price?.toLocaleString() }} ₮
                </div>
              </section>
            </div>

            <v-row class="mt-2">
              <v-btn-toggle
              v-if="product?.variants?.length > 0"
                selected-class="selectedClass"
                v-model="defaultIndex"
                mandatory
                class="px-4 h-auto"
                style="flex-wrap: wrap"
              >
                <v-btn
                  class="mr-4 my-2"
                  v-for="variant in product.variants"
                  @click="selectedVariant = variant"
                  style="
                    height: 32px;
                    border: 2px solid gray;
                    border-radius: 8px !important;
                  "
                  variant="outlined"
                  >{{ variant?.name }}</v-btn
                >
              </v-btn-toggle>
            </v-row>

            <v-row class="mt-8" align="center">
              <v-col cols="4">
                <v-select
                  label="Тоо ширхэг"
                  variant="outlined"
                  hide-details
                  :items="counts"
                ></v-select
              ></v-col>
              <v-col cols="4">Нийт <span>12</span> ширхэг байна. </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="6">
                <v-btn
                  style="font-size: 18px"
                  color="#757575"
                  block
                  variant="outlined"
                  elevation="0"
                  hide-details
                  height="60"
                  >Сагсанд нэмэх</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  style="font-size: 18px"
                  hide-details
                  block
                  elevation="0"
                  color="#ff6166"
                  height="60"
                  >Захиалах</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "layout",
});

import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const baseUrl = useRuntimeConfig().public.baseURL;
const product = ref<any>({});
const defaultIndex = ref<any>(0);
const selectedVariant = ref<any>({});

const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const buttons = [
  {
    name: "btn1",
  },
  { name: "btn2" },
  { name: "btn3" },
  { name: "btn4" },
  { name: "btn2" },
  { name: "btn3" },
  { name: "btn4" },
  { name: "btn2" },
  { name: "btn3" },
  { name: "btn4" },
];

const goBack = () => {
  router.back();
};

const fetchProduct = async () => {
  try {
    const _id = route.params.id;
    const query = {
      _id: _id,
    };
    const response = await axios.post(`${baseUrl}/products/getById`, query);
    if (response.status === 200) {
      product.value = response.data;
      if(product.value.variants?.length > 0) {
        selectedVariant.value = product.value.variants[0];
      } else {
        selectedVariant.value = product.value;
      }

    } else {
      console.log("jiiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await fetchProduct();
});
</script>

<style scoped>
.selectedClass {
  background-color: #ff6166 !important;
  color: white !important;
  border: 2px solid #ff6166 !important;
}
</style>
