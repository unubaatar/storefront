<template>
  <div style="padding-top: 80px" class="w-100 d-flex justify-center">
    <div
      style="max-width: 1440px; min-height: 80vh"
      class="w-100 pa-8 pb-16 my-6"
    >
      <div class="mb-4" style="font-size: 24px; font-weight: 500">
        Хэрэглэгчийн профайл
      </div>
      <v-row>
        <v-col cols="12">
          <v-card elevation="0" class="pa-4" rounded="lg">
            <v-row>
              <v-col cols="3"
                ><div class="ml-1 mb-1">Овог</div>
                <v-text-field
                  v-model="customer.lastname"
                  variant="outlined"
                ></v-text-field
              ></v-col>
              <v-col cols="3"
                ><div class="ml-1 mb-1">Нэр</div>
                <v-text-field
                  v-model="customer.firstname"
                  variant="outlined"
                ></v-text-field
              ></v-col>
              <v-col cols="3"
                ><div class="ml-1 mb-1">Утасны дугаар</div>
                <v-text-field
                  v-model="customer.phone"
                  variant="outlined"
                ></v-text-field
              ></v-col>
              <v-col cols="3"
                ><div class="ml-1 mb-1">Email</div>
                <v-text-field
                  v-model="customer.email"
                  variant="outlined"
                ></v-text-field
              ></v-col>
            </v-row>

            <div class="w-100 d-flex justify-end">
              <v-btn color="#ec2a45" @click="updateCustomerInfo()">
                Засах</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="mt-2" style="font-size: 28px; font-weight: 500">
        Хэрэглэгчийн захиалгууд
      </div>
      <div style="font-size: 20px">Нийт захиалгын тоо: {{ orders.length }}</div>
      <section class="mt-4">
        <v-row>
          <v-col v-for="order in orders" cols="6">
            <v-card
              @click="router.push(`/order/${order._id}`)"
              style="cursor: pointer"
              class="pa-4"
              rounded="lg"
            >
              <div
                class="w-100 text-center"
                style="font-weight: 500; font-size: 20px"
              >
                {{ order.orderNumber }}
              </div>
              <section>
                <article class="pa-4 d-flex" v-for="item in order.items">
                  <img
                    style="height: 50px; width: 50px"
                    :src="
                      item?.variant
                        ? item?.variant?.images[0]
                        : item?.product?.thumbnails[0]
                    "
                    alt=""
                  />
                  <div class="ml-4">
                    <div>
                      {{ item.product.name }}
                    </div>

                    <div style="color: gray; font-size: 12px">
                      {{ item.variant?.name }}
                    </div>
                  </div>
                </article>
              </section>

              <article class="d-flex justify-space-between">
                <div>
                  Үүссэн огноо :
                  <span>{{
                    moment(order.createdAt).format("YYYY-MM-DD HH:mm:SS")
                  }}</span>
                </div>
                <div>
                  Төлөв:
                  <v-chip
                    variant="flat"
                    :color="formatStatesColor(order?.orderStatus)"
                    class="ml-3"
                    size="small"
                    >{{ formatStates(order?.orderStatus) }}</v-chip
                  >
                </div>
              </article>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "layout",
  middleware: "auth",
});

import axios from "axios";
import moment from "moment";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const route = useRoute();
const baseUrl = useRuntimeConfig().public.baseURL;

const orders = ref<any>([]);
const customer = ref<any>({});

const fetchOrders = async () => {
  try {
    const query = {
      customer: localStorage.getItem("customerId"),
    };
    const response = await axios.post(`${baseUrl}/orders/getByCustomer`, query);
    if (response.status === 200) {
      orders.value = response.data;
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchCustomerData = async () => {
  try {
    const query = {
      customerId: localStorage.getItem("customerId"),
    };
    const response = await axios.post(`${baseUrl}/customers/getById`, query);
    if (response.status === 200) {
      customer.value = response.data;
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const updateCustomerInfo = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/customers/update`,
      customer.value
    );
    if (response.status === 200) {
      toast.success("Амжилттай");
      await fetchCustomerData();
    } else {
      console.log("jiijii");
    }
  } catch (err) {
    console.log(err);
  }
};

const formatStates = (item: any) => {
  switch (item) {
    case "pending":
      return "Хүлээгдэж буй";
    case "shipped":
      return "Хүрэгэлтэнд";
    case "complete":
      return "Дууссан";
    case "cancelled":
      return "Цуцалсан";
  }
};

const formatStatesColor = (item: any) => {
  switch (item) {
    case "pending":
      return "yellow";
    case "shipped":
      return "blue";
    case "complete":
      return "green";
    case "cancelled":
      return "red";
  }
};

onMounted(async () => {
  await fetchCustomerData();
  await fetchOrders();
});
</script>

<style scoped></style>
