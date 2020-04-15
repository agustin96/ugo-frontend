<template>
    <div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { auth } from "@/plugins/firebase.js";

export default {
  methods: {
    async observer() {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(function(user) {
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
  async mounted() {
    let user = auth.currentUser;
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
      console.log("observer", user);
    }
  }
};
</script>