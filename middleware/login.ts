export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.client) {
      if (localStorage.getItem("customerId")) {
        return navigateTo("/");
      }
    }
  });
  