<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in rubros" :key="index" class="pt-0">
        <nuxt-link :to="`carta/${item.id}`">
          <v-card>
            <v-img
              :src="item.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
              height="128px"
            >
              <v-card-title v-text="item.title"></v-card-title>
            </v-img>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'carta',
  data() {
    return {
      rubros: null
    };
  },
  async asyncData({ $axios, store }) {
    if (store.state.rubros) return { rubros: store.state.rubros };
    try {
      const res = await $axios.$get(
        `${location.protocol}//${location.hostname}:${location.port}/json/rubros.json`
      );
      await store.dispatch("saveRubros", res);
      console.log(res);

      const articulos = await $axios.$get(
        `${location.protocol}//${location.hostname}:${location.port}/json/articulos.json`
      );
      await store.dispatch("saveArticulos", articulos);
      console.log("Axios Articulos", articulos);

      return {
        rubros: res
      };
    } catch (error) {
      console.log("Error:", error);
    }
  }
};
</script>

<style>
.pt-0 {
  padding-top: 0;
}
</style>