<template>
  <div>
    <v-card-text>
      <p v-if="appDebug">{{item}}</p>
      <p v-if="appDebug" class="secondary--text">{{$v.data}}</p>
      <v-select
        v-model="$v.data.$model"
        :items="item.datos"
        item-text="displayName"
        item-value="id"
        :label="item.nombre"
        :multiple="item.multiple"
        :chips="item.multiple"
        return-object
        :error="$v.data.$error"
        :error-messages="$v.data.$error ? 'Campo requerido' : []"
        @change="changeData"
      ></v-select>
    </v-card-text>
    <p></p>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: ["item"],
  data: () => ({
    appDebug: process.env.APP_DEBUG,
    data: []
  }),
  validations() {
    if (this.item.required) {
      return {
        data: { required }
      }
    }
    else {
      return {
        data: {}
      }
    }
  },
  methods: {
    changeData() {
      this.$emit('changeData', this.$v.data);
    }
  },
  created() {
    console.log("Select Component created");
  },
  mounted() {
    console.log("Select Component mounted");
    this.$emit('changeData', this.$v.data);
  },
  beforeDestroy() {
    console.log("Select Component destroyed");
  },
};
</script>