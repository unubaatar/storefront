<template>
  <div style="padding-top: 80px" class="w-100 d-flex justify-center">
    <v-card
      rounded="lg"
      elevation="0"
      style="max-width: 1440px; background-color: #e8e8e8; min-height: 80vh"
      class="w-100 pa-8 pb-16 my-6"
    >
      <section class="w-100 d-flex justify-center">
        <div class="d-flex align-center mb-4">
          <v-btn
            :variant="stepCounter > 0 ? 'flat' : 'outlined'"
            elevation="0"
            style="
              width: 48px;
              height: 48px;
              border: 2px solid #ec2a45;
              font-size: 20px;
            "
            rounded="pill"
            color="#ec2a45"
          >
            1</v-btn
          >
          <div
            style="height: 2px; width: 72px; background-color: #ec2a45"
          ></div>
          <v-btn
            :variant="stepCounter > 1 ? 'flat' : 'outlined'"
            elevation="0"
            style="
              width: 48px;
              height: 48px;
              border: 2px solid #ec2a45;
              font-size: 20px;
            "
            rounded="pill"
            color="#ec2a45"
            >2</v-btn
          >
          <div
            style="height: 2px; width: 72px; background-color: #ec2a45"
          ></div>
          <v-btn
            :variant="stepCounter > 2 ? 'flat' : 'outlined'"
            elevation="0"
            style="
              width: 48px;
              height: 48px;
              border: 2px solid #ec2a45;
              font-size: 20px;
            "
            rounded="pill"
            color="#ec2a45"
            >3</v-btn
          >
        </div>
      </section>

      <div v-if="stepCounter === 1" style="font-size: 24px; font-weight: 500">
        Сагс
      </div>
      <div v-if="stepCounter === 1" class="mb-4">
        Нийт {{ count }} бүтээгдхүүн
      </div>
      <v-row>
        <v-col cols="8">
          <v-card
            v-if="stepCounter === 1"
            v-for="item in cartItems"
            class="pa-4 mb-4"
            rounded="lg"
            elevation="0"
          >
            <section class="d-flex justify-space-between align-center">
              <article class="d-flex">
                <div>
                  <img
                    style="width: 100px; height: 100px"
                    :src="item.product.thumbnails[0]"
                    alt=""
                  />
                </div>
                <div class="text-start ml-6">
                  <p style="font-size: 18px; font-weight: 550">
                    {{ item?.product?.name }}
                  </p>
                  <p style="font-size: 14px; color: gray">
                    {{ item?.variant?.name }}
                  </p>
                  <p
                    :style="
                      item?.salePrice
                        ? 'color: gray; text-decoration: line-through; font-size: 13px;'
                        : 'font-size: 20px'
                    "
                    class="pt-4"
                  >
                    {{ item?.price?.toLocaleString() }}₮
                  </p>
                  <p v-if="item?.salePrice" style="font-size: 20px">
                    {{ item?.salePrice?.toLocaleString() }}₮
                  </p>
                </div>
              </article>
              <div
                class="d-flex flex-column justify-space-between align-center"
              >
                <v-btn
                  icon="mdi-close"
                  style="height: 32px; width: 32px; font-size: 12px"
                  variant="flat"
                  color="#f2f2f2"
                  class="mb-8"
                  @click="deleteCartItem(item._id)"
                ></v-btn>

                <div>
                  <div
                    class="pa-1"
                    style="background-color: #f2f2f2; border-radius: 16px"
                  >
                    <v-btn
                      elevation="0"
                      style="height: 24px; width: 24px"
                      size="small"
                      icon="mdi-minus"
                      variant="text"
                      @click="minusCount(item)"
                    ></v-btn>
                    <span class="px-5">
                      {{ item.qty }}
                    </span>
                    <v-btn
                      elevation="0"
                      style="height: 24px; width: 24px"
                      size="small"
                      icon="mdi-plus"
                      color="#ec2a45"
                      @click="addCount(item)"
                    ></v-btn>
                  </div>
                </div>
              </div>
            </section>
          </v-card>

          <v-card
            v-if="stepCounter === 2"
            class="pa-6"
            rounded="lg"
            elevation="0"
          >
            <div style="font-size: 20px" class="w-100 text-center">
              Захиалагчийн мэдээлэл
            </div>
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <v-text-field
                  :disabled="customer.lastname"
                  v-model="customer.lastname"
                  label="Овог"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  :disabled="customer.firstname"
                  v-model="customer.firstname"
                  label="Нэр"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  :disabled="customer.phone"
                  v-model="customer.phone"
                  label="Утасны дугаар"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  :disabled="customer.email"
                  v-model="customer.email"
                  label="Email"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-4 px-8" rounded="lg" elevation="0">
            <div style="font-weight: bolder; font-size: 20px; color: #ec2a45">
              Захиалга
            </div>
            <hr class="my-6" />
            <article class="py-4" v-for="item in cartItems">
              <div class="d-flex justify-space-between">
                <div>
                  <p style="font-size: 18px; font-weight: 500">
                    {{ item.product.name }}
                  </p>
                  <p style="font-size: 14px; color: gray">
                    {{ item?.variant?.name }}
                  </p>
                  <p style="font-size: 14px; color: gray">
                    Тоо ширхэг: <span class="ml-2"></span>{{ item.qty }}
                  </p>
                </div>
                <div>
                  <div class="d-flex align-center">
                    <p
                      :style="
                        item?.salePrice
                          ? 'font-size: 13px; color: gray; text-decoration: line-through;'
                          : 'font-size: 18px; font-weight: 500'
                      "
                    >
                      {{ item?.price?.toLocaleString() }}₮
                    </p>
                    <span
                      style="font-size: 13px; color: #ec2a45"
                      class="ml-2"
                      v-if="item?.salePrice"
                      >-{{
                        (100 - (item?.salePrice / item?.price) * 100).toFixed(
                          1
                        )
                      }}%</span
                    >
                  </div>

                  <p
                    v-if="item?.salePrice"
                    style="font-size: 18px; font-weight: 500"
                  >
                    {{ item?.salePrice?.toLocaleString() }}₮
                  </p>
                </div>
              </div>
              <hr class="mt-8" />
            </article>
            <div class="mt-2">
              <div
                style="font-weight: 450"
                class="my-2 w-100 d-flex justify-space-between"
              >
                Нийт үнийн дүн:
                <span class="ml-2">{{ totalPrice.toLocaleString() }}₮</span>
              </div>
              <div
                style="font-weight: 450"
                class="my-2 w-100 d-flex justify-space-between"
              >
                Хямдрал:
                <span style="color: #ec2a45" class="ml-2"
                  >-{{ (totalPrice - sum).toLocaleString() }}₮</span
                >
              </div>
              <div
                style="font-weight: 450"
                class="my-2 w-100 d-flex justify-space-between"
              >
                Нийт төлөх дүн:
                <span style="font-size: 20px" class="ml-2"
                  >{{ sum.toLocaleString() }}₮</span
                >
              </div>
            </div>
          </v-card>
          <div class="mt-6 w-100 d-flex justify-end">
            <v-btn
              v-if="stepCounter !== 1"
              @click="goPrevStep()"
              color="#ec2a45"
              class="mr-4"
              variant="outlined"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <v-btn
              v-if="stepCounter !== 2"
              @click="goNextStep()"
              rounded="lg"
              color="#ec2a45"
              elevation="0"
              >Үргэлжүүлэх</v-btn
            >
            <v-btn
              rounded="lg"
              color="#ec2a45"
              elevation="0"
              v-if="stepCounter == 2"
              @click="createOrder()"
            >
              Үүсгэх
            </v-btn>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const route = useRoute();
const cartItems = ref<any>([]);
const count = ref<any>();
const stepCounter = ref<any>(1);
const customer = ref<any>({});

const baseUrl = useRuntimeConfig().public.baseURL;

const sum = computed(() => {
  let total = 0;
  for (let item of cartItems.value) {
    if (item.salePrice) {
      total += item?.salePrice * item?.qty;
    } else {
      total += item?.price * item?.qty;
    }
  }
  return total;
});

const totalPrice = computed(() => {
  let total = 0;
  for (let item of cartItems.value) {
    total += item.price * item.qty;
  }
  return total;
});

const fetchCartItems = async () => {
  try {
    const query = {
      customer: localStorage.getItem("customerId"),
    };
    const response = await axios.post(
      `${baseUrl}/cartItems/getByCustomer`,
      query
    );
    if (response.status === 200) {
      cartItems.value = response.data.rows;
      count.value = response.data.count;
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const getCostumerData = async () => {
  try {
    const query = { customerId: localStorage.getItem("customerId") };
    const response = await axios.post(`${baseUrl}/customers/getById`, query);
    if (response.status === 200) {
      customer.value = response.data;
    } else {
    }
    console.log("jiijii");
  } catch (err) {
    console.log(err);
  }
};

const createOrder = async () => {
  try {
    const query = {
      items: cartItems.value,
      customer: customer.value,
    };
    const response = await axios.post(`${baseUrl}/orders/create`, query);
    if (response.status === 201) {
      toast.success("Амжилттай үүслээ");
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteCartItem = async (_id: any) => {
  try {
    const query = {
      _id: _id,
    };
    const response = await axios.post(`${baseUrl}/cartItems/delete`, query);
    if (response.status == 200) {
      console.log("boljiinnn");
      await fetchCartItems();
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const addCount = async (item: any) => {
  try {
    if (item.qty < 10) {
      item.qty += 1;
    }
    const response = await axios.post(`${baseUrl}/cartItems/update`, item);
    if (response.status === 200) {
      console.log("boljiin");
    } else {
      console.log("jiji");
    }
  } catch (err) {
    console.log(err);
  }
};

const minusCount = async (item: any) => {
  try {
    if (item.qty > 0) {
      item.qty -= 1;
    }
    const response = await axios.post(`${baseUrl}/cartItems/update`, item);
    if (response.status === 200) {
      console.log("boljiin");
    } else {
      console.log("jiji");
    }
  } catch (err) {
    console.log(err);
  }
};

const goNextStep = () => {
  stepCounter.value++;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const goPrevStep = () => {
  stepCounter.value--;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(async () => {
  await fetchCartItems();
  await getCostumerData();
});
</script>

<style scoped></style>
