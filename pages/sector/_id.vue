<template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6 mt-5>
        <v-container>
          <h1 v-if="this.$route.params.id == 1">Por ultimo, indicanos en que mesa estás</h1>
          <h1 v-if="this.$route.params.id == 2">Por ultimo, ingresá el numero de slot</h1>
        </v-container>
        <v-container mt-5 justify-center align-center class="text-center">
          <v-form @submit.prevent="submit()">
            <v-select
              v-if="this.$route.params.id == 1"
              required
              name="select"
              :items="mesas"
              label="Elegí una opcion"
              v-model="select"
              outlined
            ></v-select>
            <v-text-field
              v-if="this.$route.params.id == 2"
              required
              v-model="slot"
              label="Ingresá el numero de slot"
              prepend-icon="mdi-pencil"
              hint="Minimo 6 caracteres"
            ></v-text-field>
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
    select: null,
    slot: null,
    mesas: null
  }),
  methods: {
    submit() {
      this.$store.dispatch("saveData", {
        sector: this.$route.params.id,
        codigo: this.select || this.slot,
        alta: Date.now()
      });
      this.$router.push("/home");
    }
  },
  async asyncData({ $axios, store, params }) {
    if (process.env.CASINO == 1 && params.id == 1) {
      if (store.state.mesas) return { mesas: store.state.mesas };
      try {
        const res = await $axios.$get(`${location.protocol}//${location.hostname}:${location.port}/json/mesas.json`);
        await store.dispatch("saveMesas", res);
        console.log(res);
        return {
          mesas: res
        };
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }
};
</script>