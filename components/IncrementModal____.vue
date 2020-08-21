<template>
  <div>
    <v-dialog :value="incrementModalDisplay" persistent>
      <v-form ref="form" v-model="valid" @submit.prevent="submit()">
        <v-card>
          <v-card-title class="headline">{{ articulo.detail }}</v-card-title>
          <v-card-text>Elegí las opciones para tu {{ articulo.detail }}</v-card-text>
          {{articulo}}
          <template v-if="articulo.specs">
            <template v-for="(item, index) in articulo.specs_datos">

              <v-card-text :key="index">
                <v-select
                  v-model="form.data[index]"
                  :items="item.datos"
                  item-text="nombre"
                  item-value="id"
                  :label="item.nombre"
                  :multiple="item.multiple"
                  :chips="item.multiple"
                  return-object
                ></v-select>
                <span v-if="form.error[index]">qwerty</span>
              </v-card-text>

            </template>
          </template>
          {{form}}
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialog()">Cerrar</v-btn>
            <v-btn color="primary" type="submit">Agregar</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    valid: true,
    form: {
      data: [],
      error: [],
      //error: ['campo requerido', 'campo requerido', '', ''],
    },
  }),
  computed: {
    ...mapState(["incrementModalDisplay", "articulo"]),
    validateData() {
      let data = this.form.data;
      let error = this.form.error;
      this.articulo.specs_datos.forEach((element, index) => {
        if (element.required) {
          if (!data[index]) {
            error[index] = 'field required';
          }
          else {
            error[index] = '';
          }
        }
      });

      // el problema de esta opcion es que no actualiza la vista
    },
  },
  created() {
    console.log("Increment Modal Component created");
  },
  mounted() {
    console.log("Increment Modal Component mounted");
  },
  beforeDestroy() {
    console.log("Increment Modal Component destroyed");
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
      /* const dataIsValid = true;

      const formIsValid = dataIsValid; */

      console.log('Form', this.form);

      console.log(!!this.form.data[0]);

      //console.log("articulo", this.articulo);

      /* let specsQuantity = this.articulo.specs_datos.length;

      let item = {
        avatar: this.articulo.avatar,
        cantidad: 1,
        comentario: this.articulo.comentario,
        descuento: this.articulo.descuento,
        detail: this.articulo.detail,
        id: this.articulo.id,
        price: this.articulo.price,
        specs: this.articulo.specs,
        specs_datos: []
      };
      //console.log("item", item);

      let data = this.form.data;
      let error = this.form.error;

      console.log('data', data);

      this.articulo.specs_datos.forEach((element, index) => {
        console.log('element', element);
        console.log('index', index);
        //console.log(data[index]);
        if (element.required && !data[index]) {
          console.log('error');
          error[index] = 'campo requerido'; // esto no esta funcionando
        }
        else {
          console.log('no error');
          error[index] = ''; // esto no esta funcionando
        }
      });

      console.log('error', error);

      return; */



      /* form.forEach((element, index) => {
        if (Array.isArray(element.data)) {
          if (element.data.length > 0)
            element.data.forEach((e, i) => {
              item.specs_datos.push(e);
            });
        }
        else if (element.data !== null) {
          item.specs_datos.push(element.data);
        }
      }); */

      //console.log("item", item);
      //this.incrementArticulo(item);

      //this.closeDialog();
    }
  }
};
</script>

<style>
.pb-0 {
  padding-bottom: 0;
}
</style>