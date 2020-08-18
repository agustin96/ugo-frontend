<template>
  <div>
    <v-list two-line>
      <template v-for="(item, index) in carrito">
        <v-divider
          v-if="index != 0 && item.id_rubro == $route.params.rubro && item.id_subrubro == $route.params.subrubro"
          :key="index"
        ></v-divider>

        <v-list-item :key="item.detail">
          <v-list-item-avatar v-if="item.avatar">
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.detail"></v-list-item-title>
            <v-list-item-subtitle v-html="`<span class='text--primary'>${item.cantidad}x</span>`"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-title v-html="`$${item.price}`"></v-list-item-title>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-html="'Subtotal'"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-title v-html="`$${subtotal}`"></v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
  }),
  computed: {
    ...mapState(["carrito"]),
    subtotal() {
      return this.$store.state.carrito.reduce((acc, val) => {
        return acc + val.price;
      }, 0);
    },
  },
};
</script>

<style>
</style>