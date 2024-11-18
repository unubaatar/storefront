<template>
  <div style="height: 100vh" class="d-flex w-100 justify-center align-center">
    <v-card width="500" class="pa-8" rounded="lg" elevation="0">
      <div
        class="d-flex justify-center mb-4"
        style="font-weight: 500; font-size: 24px"
      >
        Нэвтрэх
      </div>
      <v-text-field
        variant="outlined"
        label="Утасны дугаар"
        v-model="customer.phone"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Нууц үг"
        v-model="customer.password"
      ></v-text-field>
      <v-btn @click="login()" color="#ec2a45" height="48" elevation="0" block>Нэвтрэх</v-btn>
      <div class="d-flex justify-center">
        <v-btn @click="goToRegister()" class="mt-4" elevation="0" variant="text"
          >Шинээр бүртгүүлэх</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

definePageMeta({
  middleware: "login"
})

const baseUrl = useRuntimeConfig().public.baseURL;

const customer = ref<any>({});

const router = useRouter();

const login = async() => {
  try {
    const response = await axios.post(`${baseUrl}/customers/login` , customer.value);
    if(response.status === 200) {
      toast.success("Амжилттай");
      localStorage.setItem("customerId" , response.data.customer);
      router.push("/");
    } else {  
      console.log("jiijii");
    }
  } catch(err) {
    console.log(err);
  }
}

const goToRegister = () => {
  router.push("/register");
};
</script>
