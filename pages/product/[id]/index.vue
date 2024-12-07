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
                    >{{
                      selectedVariant.sellPrice
                        ? selectedVariant?.sellPrice?.toLocaleString()
                        : selectedVariant?.price?.toLocaleString()
                    }}
                    ₮ </span
                  ><v-chip
                    v-if="selectedVariant.sellPrice"
                    color="#ec2a45"
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

              <section v-if="selectedVariant.sellPrice">
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
                  v-model="count"
                  hide-details
                  :items="counts"
                ></v-select
              ></v-col>
              <v-col cols="4">Нийт <span>12</span> ширхэг байна. </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="3">
                <v-btn
                  style="font-size: 18px"
                  block
                  variant="outlined"
                  color="#ec2a45"
                  elevation="0"
                  hide-details
                  height="60"
                  @click="addItemToProduct()"
                  ><v-icon>mdi-cart</v-icon></v-btn
                >
              </v-col>
              <v-col cols="3">
                <v-btn
                  style="font-size: 18px"
                  color="#ec2a45"
                  block
                  variant="outlined"
                  elevation="0"
                  hide-details
                  height="60"
                  ><v-icon>mdi-heart-outline</v-icon></v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  style="font-size: 18px"
                  hide-details
                  block
                  elevation="0"
                  color="#ec2a45"
                  height="60"
                  @click="orderItems()"
                  >Захиалах</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <div
        class="mt-12 d-flex justify-center w-100"
        style="font-size: 24px; font-weight: 500"
      >
        Төстэй бүтээгдхүүнүүд
      </div>

      <v-row class="pt-6">
        <v-col v-for="product in similiarProducts" md="3" cols="12">
          <v-card
            @click="moveToProduct(product._id)"
            rounded="xl"
            elevation="2"
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
                  (100 - (product?.sellPrice / product?.price) * 100).toFixed(1)
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
          </v-card>
        </v-col>
      </v-row>

      <div
        class="mt-12 d-flex justify-center w-100"
        style="font-size: 24px; font-weight: 500"
      >
        Сэтгэгдэлүүд
      </div>
      <v-row>
        <v-col class="mt-4">
          <v-card class="pa-6" elevation="0" rounded="lg">
            <div>
              <div class="mb-2 ml-2">
                <v-chip> {{ customer.email }}</v-chip>
              </div>

              <article class="d-flex align-center">
                <v-text-field
                  v-model="comment"
                  style="max-width: 400px"
                  label="Сэтгэгдэл нэмэх"
                  hide-details
                  variant="outlined"
                ></v-text-field>

                <div class="my-4 pl-12">
                  <span class="mr-4" style="font-size: 24px">Үнэлгээ:</span>
                  <v-btn-toggle v-model="rating" selected-class="selectedClass">
                    <v-btn
                      v-for="item in ratingValues"
                      class="mx-2"
                      icon=""
                      style="border: 1px solid gray; border-radius: 50%"
                      variant="outlined"
                    >
                      {{ item }}</v-btn
                    ></v-btn-toggle
                  >
                </div>

                <v-btn
                  @click="addReview()"
                  :disabled="checkDisable()"
                  class="ml-8"
                  color="#ec2a45"
                  >Илгээх <v-icon class="ml-4"> mdi-send</v-icon>
                </v-btn>
              </article>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="review in reviews" md="6" cols="12">
          <v-card class="pa-4" rounded="lg" variant="outlined">
            <div class="mb-2 d-flex justify-space-between" style="font-size: 20px; font-weight: 500;">
              <p style="font-size: 16px; color: gray; font-weight: 400;">{{ review?.customer?.email }}</p>
              <p style="color: black;"> <span style="color: #ec2a45;"> {{ review?.rating }}</span> / 5</p>
            </div>
            <div>{{ review?.comment }}</div>
          </v-card>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const route = useRoute();

const baseUrl = useRuntimeConfig().public.baseURL;
const product = ref<any>({});
const defaultIndex = ref<any>(0);
const count = ref<any>(1);
const selectedVariant = ref<any>({});
const similiarProducts = ref<any>([]);
const customer = ref<any>({});
const comment = ref<any>("");
const rating = ref<any>(-1);
const reviews = ref<any>([]);

const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ratingValues = [1, 2, 3, 4, 5];
const goBack = () => {
  router.back();
};

const orderItems = async () => {
  try {
    await addItemToProduct();
    router.push("/order");
  } catch (err) {
    console.log(err);
  }
};

const fetchSimiliarProducts = async () => {
  try {
    const query = {
      productId: product.value._id,
    };
    const response = await axios.post(
      `${baseUrl}/products/getSimiliarProducts`,
      query
    );
    if (response.status === 200) {
      similiarProducts.value = response.data;
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const addItemToProduct = async () => {
  try {
    if (!localStorage.getItem("customerId")) {
      router.push("/auth");
      return;
    }
    const query = {
      customer: localStorage.getItem("customerId"),
      product: product.value._id,
      variant: selectedVariant.value._id,
      qty: count.value,
      salePrice: selectedVariant.value.sellPrice,
      price: selectedVariant.value.price,
    };
    const response = await axios.post(`${baseUrl}/cartItems/create`, query);
    if (response.status === 201) {
      toast.success("Амжилттай нэмлээ");
    } else {
      console.log("jiji");
    }
  } catch (err) {
    console.log(err);
  }
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
      if (product.value.variants?.length > 0) {
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

const addReview = async () => {
  try {
    const query = {
      comment: comment.value,
      rating: rating.value + 1,
      product: product.value._id,
      customer: localStorage.getItem("customerId"),
    };

    const response = await axios.post(`${baseUrl}/reviews/create`, query);
    if (response.status === 201) {
      toast("Амжилттай нэмэгдлээ");
      comment.value = "";
      rating.value = -1;
      await fetchReviews();
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchReviews = async () => {
  try {
    const query = {
      productId: route.params.id,
    };
    const response = await axios.post(`${baseUrl}/reviews/getByProduct`, query);
    if (response.status === 200) {
      reviews.value = response.data;
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserData = async () => {
  try {
    const query = {
      customerId: localStorage.getItem("customerId"),
    };
    const response = await axios.post(`${baseUrl}/customers/getById`, query);
    if (response.status === 200) {
      customer.value = response.data;
    } else {
      console.log("jiijiii");
    }
  } catch (err) {
    console.log(err);
  }
};

const checkDisable = () => {
  if (!comment.value || rating.value === -1) {
    return true;
  }
  return false;
};

const moveToProduct = (_id: any) => {
  router.push(`/product/${_id}`);
};

onMounted(async () => {
  await fetchProduct();
  await fetchSimiliarProducts();
  await getUserData();
  await fetchReviews();
});
</script>

<style scoped>
.selectedClass {
  background-color: #ff6166 !important;
  color: white !important;
  border: 2px solid #ff6166 !important;
}
</style>
