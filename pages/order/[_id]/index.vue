<template>
  <div style="padding-top: 80px; height: 80vh;" class="w-100 d-flex justify-center " >
    <div style="width: 100%; max-width: 1440px">
      <v-row class="my-16">
        <v-col cols="3">
          <v-card elevation="0" class="pa-8" rounded="lg">
            <v-row class="mb-4" v-for="orderItem in order.items">
              <v-col cols="6"
                ><img
                  style="width: 80px; height: 80px"
                  :src="
                    orderItem.variant
                      ? orderItem.variant.images[0]
                      : orderItem.product.thumbnails[0]
                  "
                  alt=""
              /></v-col>
              <v-col cols="6" align="end">
                <div>
                  <p style="font-size: 20px; font-weight: 500">
                    {{ orderItem.product.name }}
                  </p>
                  <p v-if="orderItem?.variant" style="font-size: 14px">
                    {{ orderItem?.variant?.name }}
                  </p>
                </div>
              </v-col>

              <v-col cols="6"> Тоо ширхэг:</v-col>
              <v-col style="font-weight: 500" cols="6" align="end">
                {{ orderItem.qty }}</v-col
              >

              <v-col cols="6">Үнийн дүн:</v-col>
              <v-col cols="6" align="end"
                >{{ orderItem?.price?.toLocaleString() }}₮</v-col
              >
              <hr class="w-100 mt-2" />
            </v-row>
            <v-row>
              <v-col cols="6">Нийт үнийн дүн: </v-col>
              <v-col cols="6" align="end" style="font-weight: 500"
                >{{ order?.totalAmount?.toLocaleString() }}₮</v-col
              ></v-row
            >
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card rounded="lg" class="pa-8" elevation="0">
            <div
              class="w-100 text-center"
              style="font-weight: 500; font-size: 24px; color: #ec2a45"
            >
              {{ order.orderNumber }}
            </div>

            <v-row class="mt-4" style="font-size: 20px;" >
                <v-col cols="3">Захиалагч:</v-col>
                <v-col cols="9">{{ order?.customer?.firstname }} {{ order?.customer?.lastname }}</v-col>
                <v-col cols="3">Аймаг/Хот:</v-col>
                <v-col cols="3" >{{ order?.address?.state }}</v-col>
                <v-col cols="3">Сум/Дүүрэг:</v-col>
                <v-col cols="3" >{{ order?.address?.district }}</v-col>
                <v-col cols="3">Гудамж:</v-col>
                <v-col cols="9" >{{ order?.address?.street }}</v-col>
                
                <v-col cols="3">Захиалгын төлөв:</v-col>
                <v-col cols="9">{{ order?.orderStatus }}</v-col>
                <v-col cols="3">Огноо: </v-col>
                <v-col cols="9"  style="font-size: 16px; color: gray;">{{ moment(order.createdAt).format("YYYY-MM-DD HH:mm:SS") }}</v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "layout",
});

import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import moment from "moment";

const baseUrl = useRuntimeConfig().public.baseURL;
const router = useRouter();
const route = useRoute();

const order = ref<any>({});

const fetchOrderData = async () => {
  const query = {
    _id: route.params._id,
  };
  const response = await axios.post(`${baseUrl}/orders/getById`, query);
  if (response.status === 200) {
    order.value = response.data;
  } else {
    console.log("jiijii");
  }
};
onMounted(async () => {
  await fetchOrderData();
});
</script>

<style scoped></style>
