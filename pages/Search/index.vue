<template>
  <div style="padding-top: 80px">
    <v-navigation-drawer
      floating
      style="margin-top: 80px"
      location="left"
      :width="400"
    >
      <div style="background-color: white">
        <div class="d-flex w-100 justify-center align-center mt-4">
          <div>
            <v-icon @click="goBack" style="font-size: 48px; cursor: pointer"
              >mdi-chevron-left</v-icon
            >
          </div>
          <v-text-field
            max-width="250"
            variant="outlined"
            label="Хайх"
            hide-details
            v-model="filter.search"
            @keyup.enter="fetchProducts()"
          >
          </v-text-field>
          <v-btn @click="fetchProducts()" elevation="0" style="height: 56px"
            ><v-icon style="font-size: 28px">mdi-magnify</v-icon></v-btn
          >
        </div>
        <hr class="my-8 mx-8" />

        <div class="mx-8" style="padding-bottom: 100px">
          <div
            class="d-flex align-center"
            style="cursor: pointer"
            v-for="category in categories"
          >
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <div
                  class="d-flex align-center w-100"
                  :style="isHovering ? 'background-color: #C0C2C9' : ''"
                  v-bind="props"
                >
                  <v-checkbox
                    @change="addFilter(category._id)"
                    hide-details
                  ></v-checkbox>
                  <img
                    class="ml-2"
                    style="height: 32px; width: 32px"
                    :src="category.image"
                    alt=""
                  />
                  <span class="ml-2" style="font-size: 16px">{{
                    category.name
                  }}</span>

                  <span></span>
                </div>
              </template>
            </v-hover>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
    <v-row style="height: 100%" class="pa-0 ma-0">
      <v-col cols="12" class="pa-8 ma-0 h-100" style="min-height: 80vh">
        <div style="font-weight: bold; font-size: 24px">
          Нийт {{ count }} бүтээгдхүүн олдлоо
        </div>
        <v-row class="mt-4">
          <v-col cols="12" sm="6" md="3" xl="2" v-for="product in products">
            <v-card
              @click="moveToProduct(product._id)"
              rounded="xl"
              elevation="0"
              class="pa-4"
              style="cursor: pointer"
            >
              <div
                style="height: 32px"
                class="w-100 d-flex justify-space-between"
              >
                <v-chip
                  size="small"
                  v-if="product?.sellPrice"
                  color="green"
                  variant="flat"
                  >{{
                    (100 - (product?.sellPrice / product?.price) * 100).toFixed(
                      1
                    )
                  }}
                  %</v-chip
                >
                <div>
                  <img
                    v-if="product.brand"
                    style="height: 24px; border-radius: 50%"
                    :src="product.brand.image"
                    alt=""
                  />
                </div>
              </div>
              <img
                :src="
                  product.thumbnails
                    ? product.thumbnails[0]
                    : 'https://www.bell.ca/Styles/wireless/iphone_16_pro_max/iPhone_16_Pro_Max_Desert_Titanium_lrg3.png'
                "
                alt=""
                style="width: 100%; height: 240px; object-fit: cover"
              />
              <div>{{ product?.name }}</div>
              <div>
                <v-chip color="red" size="small" class="mt-1">{{
                  product.category.name
                }}</v-chip>
              </div>
              <div class="d-flex justify-space-between w-100 mt-1">
                <span
                  :style="
                    product?.sellPrice
                      ? 'text-decoration: line-through; color: gray'
                      : 'font-weight: 500; font-size: 20px;'
                  "
                  >{{ product?.price?.toLocaleString() }}₮</span
                >
                <span
                  v-if="product?.sellPrice"
                  style="font-weight: 500; font-size: 20px"
                  >{{ product?.sellPrice?.toLocaleString() }}₮</span
                >
              </div>
            </v-card></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "layout",
});

const router = useRouter();

const baseUrl = useRuntimeConfig().public.baseURL;

const categories = ref<any>([]);
const products = ref<any>([]);
const count = ref<any>(0);
const selectedCategories = ref<any>([]);
const filter = ref<any>({
  category: [],
  search: "",
});

const moveToProduct = (_id: any) => {
  router.push(`/product/${_id}`);
};
const goBack = () => {
  router.back();
};

const addFilter = async (_id: any) => {
  if (filter.value.category.includes(_id)) {
    filter.value.category = filter.value.category.filter(
      (id: any) => id !== _id
    );
  } else {
    filter.value.category.push(_id);
  }
  await fetchProducts();
};

const fetchCategories = async () => {
  try {
    const response = await axios.post(`${baseUrl}/categories/list`, {
      isActive: true,
    });
    if (response.status === 200) {
      categories.value = response.data.rows;
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchProducts = async () => {
  try {
    const query = {
      filter: filter.value,
    };
    const response = await axios.post(`${baseUrl}/products/getAll`, query);
    if (response.status === 200) {
      products.value = response.data.rows;
      count.value = response.data.count;
    } else {
      console.log("jiiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
});
</script>

<style scoped></style>
