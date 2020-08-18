<template>
  <div class="hello">
    <v-dialog :value="incrementModalDisplay" persistent>
      <v-card>
        <v-card-title class="headline">{{ articulo.detail }}</v-card-title>
        <v-card-text>Elegí las opciones para tu {{ articulo.detail }}</v-card-text>
        <div v-for="(data, index) in articulo.specs_datos">
          <div>
            <select-validation :item="data" @changeData="form.parentData[index] = $event" />
          </div>
        </div>
        <v-card-text>
          <v-alert type="error" v-if="!form.valid">Completá todos los campos requeridos para continuar</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog()">Cerrar</v-btn>
          <v-btn color="primary" @click="submit()">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import SelectValidation from "@/components/SelectValidation.vue";

export default {
  name: "IncrementModal",
  components: {
    SelectValidation,
  },
  data() {
    return {
      appDebug: process.env.APP_DEBUG,
      form: {
        valid: true,
        parentData: [],
      },
    };
  },
  computed: {
    ...mapState(["incrementModalDisplay", "articulo"]),
  },
  methods: {
    ...mapActions(["incrementArticulo"]),
    closeDialog() {
      this.$store.commit(
        "SET_INCREMENT_MODAL_DISPLAY",
        !this.incrementModalDisplay
      );
    },
    submit() {
      let invalid = this.form.parentData.some((e) => e.$invalid);

      if (invalid) {
        this.form.valid = false;
        return;
      }
      else {
        this.form.valid = true;
      }

      let item = {
        ...this.articulo,
        specs_datos: [],
        cantidad: 1,
      }

      this.form.parentData.forEach((element, index) => {
        /* if (Array.isArray(element.$model)) {
          if (element.$model.length > 0)
            element.$model.forEach((e, i) => {
              item.specs_datos.push(e);
            });
        }
        else if (element.$model !== null) {
          item.specs_datos.push(element.$model);
        } */

        // Mantengo la estructura para que despues sea mas facil editar el articulo (ver pedidosya)
        if (element.$model !== null) {
          item.specs_datos.push(element.$model);
        }
      });

      this.incrementArticulo(item);

      this.closeDialog();
    },
  },
};
</script>