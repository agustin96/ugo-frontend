<template>
  <div>
    <v-list two-line>
      <template v-for="(item, index) in carrito">
        <v-divider
          v-if="index != 0 && item.id_rubro == $route.params.rubro && item.id_subrubro == $route.params.subrubro"
          :key="index"
        ></v-divider>

        <v-list-item :key="item.index">
          <v-list-item-avatar v-if="item.avatar">
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.detail"></v-list-item-title>
            <v-list-item-subtitle v-html="`<span class='text--primary'>${item.cantidad}x</span>`"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-title>${{getPrice(item)}}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-html="'Subtotal'"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-title v-html="`$${getCarritoAmount}`"></v-list-item-title>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-container>
      <v-btn outlined block large nuxt to="/carta">agregar más al carrito</v-btn>
    </v-container>

    <v-container style="position: fixed; display: fixed; bottom: 15px">
      <nuxt-link to="/carrito/checkout">
        <v-alert color="primary" prominent dense>
          <v-row align="center">
            <v-col class="shrink" align="center" style="padding: 0 12px;">
              <v-btn x-small fab depressed color="primaryDark" style="border-radius: 4px; font-size: 16px">{{getCarritoQuantity}}</v-btn>
            </v-col>
            <v-col class="grow" align="center">
              CONTINUAR
            </v-col>
            <v-col class="shrink">
              ${{getCarritoAmount}}
            </v-col>
          </v-row>
        </v-alert>
      </nuxt-link>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState(["carrito"]),
    ...mapGetters(["getCarritoAmount", "getCarritoQuantity"]),
  },
  methods: {
    getPrice(item) {
      let total = 0;

      total += item.price;
      if (item.specs && item.specs_datos.length > 0) {
        item.specs_datos.forEach((j) => {
          if (Array.isArray(j)) {
            if (j.length > 0) {
              j.forEach((k, i) => {
                total += k.precio;
              });
            }
          } else if (j.precio) {
            total += j.precio;
          }
        });
      }
      return total;
    },
  },
};
</script>

<style>
</style>