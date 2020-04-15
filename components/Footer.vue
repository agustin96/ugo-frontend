<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <div class="container">
          <p class="caption text-center">© {{ new Date().getFullYear() }} {{ appName }}</p>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="container">
          <p class="caption text-center">powered by Visualbar</p>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="container">
          <p class="caption text-center">developed by Agustin Amato</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      appName: process.env.APP_NAME
    };
  }
};
</script>

<style>
.v-application p {
  margin-bottom: 0;
}
</style>