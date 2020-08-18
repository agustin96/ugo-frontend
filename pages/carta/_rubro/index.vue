<template>
  <v-container>
    <v-row>
      <v-col cols="6" v-for="(item, index) in subrubros" :key="index" class="pt-0">
        <nuxt-link :to="`/carta/${$route.params.rubro}/${item.id}`">
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
//import { mapState } from "vuex";

export default {
  layout: 'carta',
  data() {
    return {
      rubros: null,
      subrubros: null
    };
  },
  computed: {
    //...mapState(["rubros"])
  },
  methods: {
    getSubrubros(rubros) {
      let index = rubros.findIndex(element => {
        return element.id == params.rubro;
      });
      if (index === -1) return null;
      return {
        subrubros: store.state.rubros[index].subrubros
      };
    }
  },
  async asyncData({ $axios, store, params, redirect }) {
    if (store.state.rubros) {
      let index = store.state.rubros.findIndex(element => {
        return element.id == params.rubro;
      });
      if (index === -1) return;
      let subrubros = store.state.rubros[index].subrubros;

      return {
        rubros: store.state.rubros,
        subrubros: subrubros
      };
    }

    try {
      const rubros = await $axios.$get(
        `${location.protocol}//${location.hostname}:${location.port}/json/rubros.json`
      );
      await store.dispatch("saveRubros", rubros);
      console.log("Axios rubros", rubros);

      //let subrubros = getSubrubros(rubros);

      let index = rubros.findIndex(element => {
        return element.id == params.rubro;
      });
      if (index === -1) return;
      let subrubros = rubros[index].subrubros;

      return {
        rubros,
        subrubros
      };
    } catch (error) {
      console.log("Error:", error);
    }
  },
  mounted() {
    if (
      !JSON.parse(localStorage.getItem("vuex")) ||
      !JSON.parse(localStorage.getItem("vuex")).data
    )
      location.assign("/");
    if (!JSON.parse(localStorage.getItem("vuex")).articulos)
      location.assign("/home");
  }
};
</script>