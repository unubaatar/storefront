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
          <div @click="showCartDetails()" v-if="customerId" class="mx-2">
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

    <v-navigation-drawer
      width="500"
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
                  :src="item.image"
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
                  style="
                    color: gray;
                    text-decoration: line-through;
                    font-size: 13px;
                  "
                  class="pt-4"
                >
                  {{ item?.price?.toLocaleString() }}₮
                </p>
                <p style="font-size: 20px">
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
                  ></v-btn>
                </div>
              </div>
            </div>
          </section>

          <hr class="my-4" />
        </div>
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

const deleteCartItem = async(_id: any) => {
  try {
    const query = {
      _id: _id
    };
    const response = await axios.post(`${baseUrl}/cartItems/delete` , query);
    if(response.status == 200) {
      console.log("boljiinnn");
      await fetchCartItems();
    } else {
      console.log("jiijii");
    }
  } catch(err) {
    console.log(err);
  }
}

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

const logOut = () => {
  localStorage.removeItem("customerId");
  window.location.reload();
  router.push("/");
};

onMounted(() => {
  customerId.value = localStorage.getItem("customerId");
});
</script>
