<template>
    <div>
      <v-card
        style="
          width: 100%;
          height: 80px;
          border-bottom-left-radius: 36px;
          border-bottom-right-radius: 36px;
          position: fixed;
          z-index: 10;
        "
        elevation="0"
      >
        <div
          class="w-100 h-100 d-flex justify-space-between align-center px-16"
        >
          <div class="d-flex align-center">
            <v-btn
              elevation="0"
              style="background-color: #e5e4e2 !important"
              rounded="pill"
              class="mr-2"
              ><v-icon>mdi-shape-outline</v-icon><span>Category</span></v-btn
            >
            <v-btn
              elevation="0"
              style="background-color: #e5e4e2 !important"
              rounded="pill"
              ><v-icon>mdi-magnify</v-icon><span>Search</span></v-btn
            >
          </div>

          <div>
            <div style="font-size: 28px">Ecommerce</div>
          </div>

          <div class="d-flex align-center">
            <div class="mx-2">
              <v-icon style="font-size: 28px; cursor: pointer"
                >mdi-heart-outline</v-icon
              >
            </div>
            <div class="mx-2">
              <v-icon style="font-size: 28px; cursor: pointer"
                >mdi-cart-variant</v-icon
              >
            </div>
            <div class="mx-2">
              <v-icon style="font-size: 28px; cursor: pointer"
                >mdi-account</v-icon
              >
            </div>
            <div class="mx-2">
              <v-icon style="font-size: 28px; cursor: pointer"
                >mdi-logout</v-icon
              >
            </div>
          </div>
        </div>
      </v-card>
    </div>
</template>

<script lang="ts" setup></script>
