<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1>Bienvenido {{ user.displayName }}, necesitamos acceder a tu ubicacion</h1>
      </v-container>
      <v-container mt-5 text-center>
        <v-btn :disabled="disabled" x-large @click="ubicate()">Compartir Ubicacion</v-btn>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import geolocator from "geolocator";

export default {
  components: {},
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async verifyLocation() {
      this.disabled = true;

      let rsp = await this.locate();
      console.log(rsp);

      let lat, lon;
      let nombreLocal = process.env.SHORT_NAME.toLowerCase();

      console.log(this.latitudes);

      if (!this.latitudes) return;

      this.latitudes.locales.forEach(element => {
        if (element.nombre == nombreLocal) {
          lat = element.ubicacion.latitud;
          lon = element.ubicacion.longitud;
        }
      });

      var result = geolocator.calcDistance({
        from: {
          latitude: rsp.latitude,
          longitude: rsp.longitude
        },
        to: {
          latitude: lat,
          longitude: lon
        },
        formula: geolocator.DistanceFormula.HAVERSINE,
        unitSystem: geolocator.UnitSystem.METRIC
      });

      console.log(result);

      if (process.env.DELIVERY && result < 1.2) {
        return true;
      } else {
        if (result < 0.2) {
          return true;
        } else {
          return false;
        }
      }
    },
    async locate() {
      return new Promise(async (resolve, reject) => {
        let options = {
          enableHighAccuracy: true,
          desiredAccuracy: 30,
          timeout: 5000,
          maximumWait: 10000,
          maximumAge: 0
        };

        geolocator.locate(options, function(err, location) {
          console.log(err || location);
          if (location) {
            resolve({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            });
          } else {
            reject(err);
          }
        });
      });
    },
    async ubicate() {
      let inRange =
        process.env.DEPLOYMENT == 1 && process.env.UBICACION == 1
          ? await this.verifyLocation()
          : true;

      console.log("Rango:", inRange);
      if (!inRange) return;

      if (process.env.CASINO == 1) {
        this.$router.push('/sector')
      }
      else if (process.env.DELIVERY == 1) {
        this.$router.push('/sucursal')
      }
      else {
        this.$router.push('/numero')
      }
    }
  },
  async asyncData({ $axios, store }) {
    if (store.state.latitudes) return { latitudes: store.state.latitudes };
    try {
      const res = await $axios.$get(`${location.protocol}//${location.hostname}:${location.port}/json/latitudes.json`);
      console.log(res);
      await store.dispatch("saveLatitudes", res);
      return {
        latitudes: res
      };
    } catch (error) {
      console.log("Error:", error);
    }
  }
};
</script>