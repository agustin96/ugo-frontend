<template>
  <div>
    <v-dialog :value="decrementModalDisplay" persistent>
      <v-card>
        <v-card-title class="headline">{{ articulo.detail }}</v-card-title>
        <v-card-text>Elegí las opciones para tu {{ articulo.detail }}</v-card-text>
        <template v-if="articulo.specs == 1">
          <template v-for="(item, index) in articulo.specs_datos">
            <v-card-text :key="index" class="pb-0">{{ item.nombre }}</v-card-text>
            <v-card-text :key="index" v-if="item.estado == 1">
              <v-checkbox
                v-model="specs_datos[index].checkbox"
                v-for="(elem, i) in item.datos"
                :label="elem"
                :value="elem"
                hide-details
                :key="i"
              ></v-checkbox>
            </v-card-text>

            <v-card-text :key="index" v-if="item.estado == 2">
              <v-radio-group v-model="specs_datos[index].radio">
                <v-radio
                  v-for="(elem, i) in item.datos"
                  :key="i"
                  :label="elem"
                  :value="elem"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
          </template>
        </template>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog()">Cerrar</v-btn>
          <v-btn color="primary" @click="remove()">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState(["decrementModalDisplay", "articulo"])
  },
  beforeDestroy() {
    console.log('Decrement Modal Component destroyed');
  },
  methods: {
    ...mapActions(["decrementArticulo"]),
    closeDialog() {
      this.$store.commit("SET_DECREMENT_MODAL_DISPLAY", !this.decrementModalDisplay);
    },
    remove() {

    }
  },
};
</script>

<style>
.pb-0 {
  padding-bottom: 0;
}
</style>