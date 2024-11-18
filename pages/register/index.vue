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
        v-model="customerToCreate.lastname"
        label="Овог"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        v-model="customerToCreate.firstname"
        label="Нэр"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Утасны дугаар"
        v-model="customerToCreate.phone"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Email"
        v-model="customerToCreate.email"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        label="Нууц үг"
        v-model="customerToCreate.password"
      ></v-text-field>
      <v-text-field
        v-model="customerToCreate.rePassword"
        variant="outlined"
        label="Нууц үг давтана уу"
      ></v-text-field>
      <v-btn @click="registerUser()" color="#ec2a45" height="48" elevation="0" block
        >Шинээр бүртгүүлэх</v-btn
      >
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const baseUrl = useRuntimeConfig().public.baseURL;
const router = useRouter();
const customerToCreate = ref<any>({});

const registerUser = async() => {
    try {
        if(customerToCreate.value.password !== customerToCreate.value.rePassword) {
            toast.error("Нууц үг таарахгүй байна.")
            return;
        }
        const response = await axios.post(`${baseUrl}/customers/create` , customerToCreate.value);
        if(response.status === 201) {
            toast.success("Амжилттай бүртгэгдлээ");
            await login();
        } else {
            console.log("jiijii");
        }
    } catch(err) {
        console.log(err);
    }
}

const login = async() => {
  try {
    const response = await axios.post(`${baseUrl}/customers/login` , customerToCreate.value);
    if(response.status === 200) {
      toast.success("Амжилттай");
      localStorage.setItem("customerId" , response.data);
      router.push("/");
    } else {  
      console.log("jiijii");
    }
  } catch(err) {
    console.log(err);
  }
}
</script>
