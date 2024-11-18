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
              elevation="0"
              rounded="xl"
              v-if="!customerId"
              variant="text"
              @click="router.push('/auth')"
              >Нэвтрэх</v-btn
            >
          </div>
          <v-btn elevation="0" rounded="xl" v-if="customerId" class="mx-2">
            <v-icon style="font-size: 28px; cursor: pointer"
              >mdi-heart-outline</v-icon
            >
          </v-btn>
          <v-btn
            elevation="0"
            rounded="xl"
            @click="showCartDetails()"
            v-if="customerId"
            class="mx-2"
          >
            <v-icon style="font-size: 28px; cursor: pointer"
              >mdi-cart-variant</v-icon
            >
          </v-btn>
          <v-btn elevation="0" rounded="xl" v-if="customerId" class="mx-2">
            <v-icon style="font-size: 28px; cursor: pointer"
              >mdi-account</v-icon
            >
          </v-btn>
          <v-btn
            elevation="0"
            rounded="xl"
            @click="logOut()"
            v-if="customerId"
            class="mx-2"
          >
            <v-icon style="font-size: 28px; cursor: pointer">mdi-logout</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-navigation-drawer
      width="550"
      v-model="showCart"
      location="right"
      temporary
    >
      <v-container class="pa-8">
        <div style="font-size: 24px; font-weight: 500">Сагс</div>
        <div>Нийт {{ count }} бүтээгдхүүн</div>
        <hr class="my-3" />
        <div v-for="item in cartItems" class>
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
            <div class="d-flex flex-column justify-space-between align-center">
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

          <hr class="my-4" />
        </div>
        <section class="mt-12 d-flex justify-space-between align-center">
          <div>
            Нийт үнийн дүн :
            <span class="ml-2" style="font-size: 20px; font-weight: 550"
              >{{ sum.toLocaleString() }} ₮</span
            >
          </div>
          <v-btn color="#ec2a45" @click="router.push('/order')"
            >Үргэлжлүүлэх</v-btn
          >
        </section>
      </v-container>
    </v-navigation-drawer>

    <v-main>
      <slot class="py-8" />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
definePageMeta({});
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const baseUrl = useRuntimeConfig().public.baseURL;
const customerId = ref<any>({});
const router = useRouter();
const showCart = ref<any>(false);
const cartItems = ref<any>([]);
const count = ref<any>();

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

const goHome = () => {
  router.push("/");
};

const goSearch = () => {
  router.push("/search");
};

const showCartDetails = async () => {
  try {
    await fetchCartItems();
    showCart.value = true;
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

const logOut = () => {
  localStorage.removeItem("customerId");
  window.location.reload();
  router.push("/");
};

onMounted(() => {
  customerId.value = localStorage.getItem("customerId");
});
</script>
