<template>
  <v-container>
    <v-layout column>
      <v-flex xs12 sm8 md6 mt-5>
        <v-container>
          <h1>Decinos a donde te llevamos tu pedido</h1>
        </v-container>
        <v-container mt-5 justify-center align-center class="text-center">
          <v-form @submit.prevent="submit()">
            <v-select v-model="sector" required :items="sectores" label="Elegí un sector" outlined></v-select>
            <v-btn x-large class="mt-5" type="submit">Ingresar</v-btn>
          </v-form>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    sector: "",
    sectores: null
  }),
  methods: {
    submit() {
      this.$router.push(`/sector/${this.sector}`);
    }
  },
  async asyncData({ $axios, store }) {
    if (store.state.sectores) return { sectores: store.state.sectores };
    try {
      const res = await $axios.$get(`${location.protocol}//${location.hostname}:${location.port}/json/sectores.json`);
      await store.dispatch("saveSectores", res);
      console.log(res);
      return {
        sectores: res
      };
    } catch (error) {
      console.log("Error:", error);
    }
  }
};
</script>