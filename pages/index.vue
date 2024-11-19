<template>
  <div class="d-flex justify-center" style="padding-top: 100px;">
    <div style="min-height: 100vh; width: 100%; max-width: 1440px">
      <v-row>
        <v-col cols="6" sm="4" md="2" v-for="product in products">
          <v-card
            @click="goToProductDetail(product._id)"
            rounded="xl"
            elevation="0"
            class="pa-4"
            style="cursor: pointer"
          >
            <div
              style="height: 32px"
              class="w-100 d-flex justify-space-between"
            >
              <v-chip size="small" color="green" variant="flat"> {{  (100 - (product.sellPrice / product.price * 100)).toFixed(1) }} %</v-chip>
              <div>
                <img
                  style="height: 24px; border-radius: 50%;"
                  :src="product.brand.image"
                  alt=""
                />
              </div>
            </div>
            <img
              :src="product.thumbnails[0]"
              alt=""
              style="width: 100%; height: 180px; object-fit: cover"
            />
            <div>{{ product.name }}</div>
            <div>
              <v-chip color="red" size="small" class="mt-1">{{ product.category.name }}</v-chip>
            </div>
            <div class="d-flex justify-space-between w-100 mt-1">
              <span style="text-decoration: line-through; color: gray"
                >{{ product?.price?.toLocaleString()   }}₮</span
              >
              <span>{{ product?.sellPrice?.toLocaleString()  }}₮</span>
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

import { onMounted } from "vue";
import { useRuntimeConfig } from "#app";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const baseUrl = useRuntimeConfig().public.baseURL;
const products = ref<any>({});
const productsCount = ref<any>(0);

const getProducts = async() => {
  try {
    const response = await axios.post(`${baseUrl}/products/list` , {});
    if(response.status === 200) {
      productsCount.value = response.data.count;
      products.value = response.data.rows;
    } else {
      console.log("jiijii");
    }
  } catch(err) {
    console.log(err);
  }
}

onMounted(async() => {
  await getProducts();
})
const goToProductDetail = (_id: any) => {
  router.push(`/product/${_id}`);
}
</script>
