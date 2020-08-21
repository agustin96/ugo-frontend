<template>
  <div class="hello">
    <v-dialog :value="incrementModalDisplay" persistent>
        <!-- <p>{{$v.articulo}}</p> -->
        <div v-for="data in $v.articulo.specs_datos.$each.$iter">
            <p>{{data}}</p>
            <p>-------</p>
            <!-- <div class="row">
                <div class="form-group col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <label for="phoneNo">Name</label>
                <input
                    v-model="data.businessname.$model"
                    @blur="data.businessname.$touch()"
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                >
                <div v-if="data.businessname.$error" class="form-error">
                    <span v-if="!data.businessname.required" class="text-danger">name is required</span>
                </div>
                </div>
            </div> -->
        </div>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";

export default {
  name: "IncrementModal",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: ""
      },
    };
  },
  validations() {
    return {
        articulo: {
            specs_datos: {
                $each: {
                    id: { required },
                    data: { required }
                }
            }
        }
    }
  },
  computed: {
    ...mapState(["incrementModalDisplay", "articulo"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-danger {
  color: red;
}
</style>