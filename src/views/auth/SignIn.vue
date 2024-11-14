<script setup lang="ts">
import type { CallbackTypes } from "vue3-google-login";
import { GoogleLogin } from 'vue3-google-login'
const callback: CallbackTypes.CredentialCallback = (response) => {
  console.log(response)
  // console.log("Handle the userData", userData)
}
</script>

<template>
  <div class="flex-1 flex flex-col items-center">
    <p class="py-4">Start a game!</p>
    <div>
      <GoogleLogin :callback="callback" prompt auto-login popup-type="TOKEN">
        <Button label="Login with Google" />
      </GoogleLogin>
    </div>
  </div>
</template>

<style scoped></style>
