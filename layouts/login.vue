<template>
  <v-app>
    <!-- Logo -->
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-img src="https://picsum.photos/510/300?random" width="64" height="64"></v-img>
        </v-col>
        <v-col cols="10">
          <h2 class="d-inline">{{appName}}</h2>
        </v-col>
      </v-row>
    </v-container>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-container>
      <v-row>
        <v-col cols="4">
          <div class="container">
            <p class="caption text-center">© 2019 CASINO CLUB</p>
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
  </v-app>
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