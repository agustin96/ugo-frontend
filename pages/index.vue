<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-container>
        <h1>Bienvenido {{ user.displayName }}, necesitamos acceder a tu ubicacion</h1>
      </v-container>
      <v-container mt-5 text-center>
        <v-btn x-large>Compartir Ubicacion</v-btn>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { firebase } from "@/plugins/firebase.js";

export default {
  components: {},
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async observer() {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log("User is signed in");
            resolve(user);
          } else {
            location.href = "/login";
          }
        });
      });
    }
  },
  /* async fetch ({ store }) {
    await store.dispatch('getUser');
  },
  async asyncData ({ store }) {
    await store.dispatch('getUser');
  } */
  async mounted() {
    let user = firebase.auth().currentUser;
    let store = this.$store;
    let self = this;
    if (user) {
      await store.dispatch("saveUser", {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        emailVerified: user.emailVerified
      });
      console.log("currentUser", user);
    } else {
      user = await self.observer();
      if (!user) location.href = "/login";
      await store.dispatch("saveUser", {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        emailVerified: user.emailVerified
      });
      console.log('observer', user);
    }
  }
};
</script>