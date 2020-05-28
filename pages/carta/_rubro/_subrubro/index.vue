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
              v-if="item.specs == 0 && item.comentario == 0"
              large
              @click="decrementArticulo(item)"
              color="grey lighten-1"
            >mdi-minus-circle</v-icon>
            <v-icon
              v-else
              large
              @click="displayDecrementModal(item.id)"
              color="grey lighten-1"
            >mdi-minus-circle</v-icon>
            <v-list-item-action-text v-text="item.cantidad"></v-list-item-action-text>
            <v-icon
              v-if="item.specs == 0 && item.comentario == 0"
              large
              @click="incrementArticulo(item)"
              color="yellow"
            >mdi-plus-circle</v-icon>
            <v-icon
              v-else
              large
              @click.stop="displayIncrementModal(item)"
              color="yellow"
            >mdi-plus-circle</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>

    <IncrementModal/>

    <!-- {{$route.params}} -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import IncrementModal from '@/components/IncrementModal';

export default {
  layout: "carta",
  components: {
    IncrementModal,
  },
  data: () => ({}),
  computed: {
    ...mapState(["articulos", "dialog"])
  },
  methods: {
    ...mapActions(["incrementArticulo", 'decrementArticulo']),
    displayDecrementModal(item) {
      console.log(item)
    },
    displayIncrementModal(item) {
      console.log(item)
      this.$store.commit('SET_ARTICULO', item)
      this.$store.commit('SET_DIALOG', true)
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