<template>
  <div>
    <v-dialog :value="dialog" persistent>
      <v-card>
        <v-card-title class="headline">{{ articulo.detalle }}</v-card-title>
        <v-card-text>Elegí las opciones para tu {{ articulo.detalle }}</v-card-text>
        <template v-if="articulo.specs == 1">
          <template v-if="articulo.spec1_estado != 0">
            <v-card-text>{{ articulo.spec1_nombre }}</v-card-text>

            <v-card-text v-if="articulo.spec1_estado == 1">
              <v-checkbox
                v-model="model[0].checkbox"
                v-for="(item, index) in articulo.spec1_datos"
                :label="item"
                :value="item"
                hide-details
                :key="index"
              ></v-checkbox>
            </v-card-text>

            <v-card-text v-if="articulo.spec1_estado == 2">
              <v-radio-group v-model="model[0].radio">
                <v-radio
                  v-for="(item, index) in articulo.spec1_datos"
                  :key="index"
                  :label="item"
                  :value="item"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
          </template>

          <template v-if="articulo.spec2_estado != 0">
            <v-card-text>{{ articulo.spec2_nombre }}</v-card-text>

            <v-card-text v-if="articulo.spec2_estado == 1">
              <v-checkbox
                v-for="(item, index) in articulo.spec2_datos"
                :label="item"
                :value="item"
                hide-details
                :key="index"
              ></v-checkbox>
            </v-card-text>

            <v-card-text v-if="articulo.spec2_estado == 2">
              <v-radio-group>
                <v-radio
                  v-for="(item, index) in articulo.spec2_datos"
                  :key="index"
                  :label="item"
                  :value="item"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
          </template>

          <template v-if="articulo.spec3_estado != 0">
            <v-card-text>{{ articulo.spec3_nombre }}</v-card-text>

            <v-card-text v-if="articulo.spec3_estado == 1">
              <v-checkbox
                v-for="(item, index) in articulo.spec3_datos"
                :label="item"
                :value="item"
                hide-details
                :key="index"
              ></v-checkbox>
            </v-card-text>

            <v-card-text v-if="articulo.spec3_estado == 2">
              <v-radio-group>
                <v-radio
                  v-for="(item, index) in articulo.spec3_datos"
                  :key="index"
                  :label="item"
                  :value="item"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
          </template>
        </template>

        {{model}}

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
    model: [
      {checkbox: [], radio: null},
      {checkbox: [], radio: null},
      {checkbox: [], radio: null},
    ],
  }),
  computed: {
    ...mapState(["dialog", "articulo"])
  },
  methods: {
    ...mapActions(["incrementArticulo"]),
    closeDialog() {
      this.$store.commit("SET_DIALOG", !this.dialog);
    },
    add() {
      console.log("articulo", this.articulo)

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
      }
      console.log("item", item)

      let model = this.model
      let spec = this.spec

      model.forEach((element, index) => {
        console.log("checkbox", element.checkbox)
        console.log("radio", element.radio)
        if (element.checkbox.length > 0) {
          item.specs_datos.push(element.checkbox)
        }
        else if (element.radio !== null) {
          item.specs_datos.push(element.radio)
        }
      });

      console.log("item", item)
      this.incrementArticulo(item)

      this.closeDialog()
    }
  }
};
</script>

<style>
.pb-0 {
  padding-bottom: 0;
}
</style>