<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />

      <v-spacer />

      <v-text-field
        @keyup="searchArticulos()"
        v-model="searchInput"
        v-if="searchText"
        placeholder="Busca un producto..."
      ></v-text-field>
      <v-btn icon @click="searchText = !searchText">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt v-if="!searchText" />
      <SearchList v-else />
    </v-content>

    <v-container style="position: fixed; display: fixed; bottom: 15px">
      <nuxt-link to="/carrito">
        <v-alert icon="mdi-cart" color="primary" prominent dense>
          <v-row align="center">
            <v-col class="grow" align="center">VER PEDIDO</v-col>
            <v-col class="shrink">${{getCarritoAmount}}</v-col>
          </v-row>
        </v-alert>
      </nuxt-link>
    </v-container>

    <Footer />

    <!-- <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>-->
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { auth } from "@/plugins/firebase.js";
import Footer from "@/components/Footer";
import SearchList from "@/components/SearchList";

export default {
  components: {
    Footer,
    SearchList,
  },
  data() {
    return {
      appName: process.env.APP_NAME,
      drawer: false,
      searchText: false,
      searchInput: "",
      //enabledCart: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-home",
          title: "Home",
          to: "/home",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      title: process.env.APP_NAME,
    };
  },
  computed: {
    ...mapState(["user", "articulos", "enabledCart"]),
    ...mapGetters(['getCarritoAmount']),
  },
  methods: {
    ...mapActions(["logout", "isCartEnabled"]),
    async observer() {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("User is signed in");
            resolve(user);
          } else {
            location.href = "/login";
          }
        });
      });
    },
    searchArticulos() {
      console.log(this.searchInput);
      const articulos = this.articulos.filter((element) =>
        element.detail.toLowerCase().includes(this.searchInput)
      );
      /* const articulos = store.state.articulos.filter(
        element =>
          element.id_rubro == params.rubro &&
          element.id_subrubro == params.subrubro
      ); */
      console.log(articulos);
      this.$store.dispatch("saveArticulosFiltered", articulos);
    },
  },
  async mounted() {
    let store = this.$store;
    let self = this;
    if (auth.currentUser) {
      await store.dispatch("saveUser", {
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
      });
      console.log("currentUser", auth.currentUser);
    } else {
      let user = await self.observer();
      if (!user) location.href = "/login";
      await store.dispatch("saveUser", {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        emailVerified: user.emailVerified,
      });
      console.log("observer", user);
    }

    this.isCartEnabled();
  },
};
</script>

<style>
.v-toolbar__content .v-text-field__details {
  display: none;
}
.v-btn--fab.v-size--default.v-btn--absolute.v-btn--bottom {
  bottom: 16px;
}
</style>