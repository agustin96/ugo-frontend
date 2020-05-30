<template>
  <div>
    <v-dialog :value="dialog" persistent>
      <v-card>
        <v-card-title class="headline">{{ articulo.detalle }}</v-card-title>
        <v-card-text>Elegí las opciones para tu {{ articulo.detalle }}</v-card-text>
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
          <v-btn color="primary" @click="add()">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    specs_datos: [
      {checkbox: [], radio: null},
      {checkbox: [], radio: null},
      {checkbox: [], radio: null},
      {checkbox: [], radio: null},
      {checkbox: [], radio: null},
    ]
  }),
  computed: {
    ...mapState(["dialog", "articulo"])
  },
  beforeDestroy() {
    console.log('Increment Modal Component destroyed');
  },
  methods: {
    ...mapActions(["incrementArticulo"]),
    closeDialog() {
      this.$store.commit("SET_DIALOG", !this.dialog);
    },
    add() {
      //console.log("articulo", this.articulo);

      let item = {
        avatar: this.articulo.avatar,
        cantidad: 1,
        comentario: this.articulo.comentario,
        descuento: this.articulo.descuento,
        detalle: this.articulo.detalle,
        id: this.articulo.id,
        precio: this.articulo.precio,
        specs: this.articulo.specs,
        specs_datos: []
      };
      //console.log("item", item);

      let specs_datos = this.specs_datos;
      let spec = this.spec;

      specs_datos.forEach((element, index) => {
        //console.log("checkbox", element.checkbox);
        //console.log("radio", element.radio);
        if (element.checkbox.length > 0) {
          element.checkbox.forEach((e, i) => {
            item.specs_datos.push(e);
          });
        } else if (element.radio !== null) {
          item.specs_datos.push(element.radio);
        }
      });

      //console.log("item", item);
      this.incrementArticulo(item);

      this.closeDialog();
    }
  },
};
</script>

<style>
.pb-0 {
  padding-bottom: 0;
}
</style>