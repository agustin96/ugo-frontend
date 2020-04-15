<template>
  <div>
    <v-list two-line>
      <template v-for="(item, index) in articulos">
        <v-divider
          v-if="index != 0 && item.id_rubro == $route.params.rubro && item.id_subrubro == $route.params.subrubro"
          :key="index"
        ></v-divider>

        <v-list-item
          v-if="item.id_rubro == $route.params.rubro && item.id_subrubro == $route.params.subrubro"
          :key="item.detalle"
        >
          <v-list-item-avatar v-if="item.avatar">
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.detalle"></v-list-item-title>
            <v-list-item-subtitle v-html="`<span class='text--primary'>$${item.precio}</span>`"></v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.descripcion" v-html="item.descripcion"></v-list-item-subtitle>
          </v-list-item-content>

          <!-- <v-list-item-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-home</v-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-home</v-icon>
          </v-list-item-icon>-->

          <v-list-item-action>
            <v-icon
              large
              @click="decrementArticulo(item.id)"
              color="grey lighten-1"
            >mdi-minus-circle</v-icon>
            <v-list-item-action-text v-text="item.cantidad"></v-list-item-action-text>
            <v-icon large @click="incrementArticulo(item.id)" color="yellow">mdi-plus-circle</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <!-- {{$route.params}} -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({}),
  methods: {
    ...mapActions(["incrementArticulo"]),
    ...mapActions(["decrementArticulo"])
  },
  computed: {
    ...mapState(["articulos"])
  },
  /* async asyncData({ $axios, store, params, redirect }) {
    if (!JSON.parse(localStorage.getItem("vuex")).data)
      redirect("/")

    // Moved to v-if in template

    if (store.state.articulos) {
      const articulos = store.state.articulos.filter(
        element =>
          element.id_rubro == params.rubro &&
          element.id_subrubro == params.subrubro
      );
      console.log("Articulos a pintar", articulos);

      return { articulos };
    } else {
      //redirect("/carta")
      console.log("redirect to carta");
    }
  }, */
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

<style>
.v-list-item__action {
  align-items: center;
}
.v-list-item__action-text {
  padding: 0 1rem;
}
.v-list-item__action--stack {
  flex-direction: row;
}
</style>