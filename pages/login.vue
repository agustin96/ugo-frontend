<template>
  <v-row class="container">
    <v-col cols="12">
      <div>
        <h1>
          <span class="font-weight-bold">Bienvenido</span>, sé el primero en ser atendido
        </h1>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div class="text-center">
        <p>ACCEDE CON</p>
        <v-row>
          <v-col cols="4" class="text-center">
            <a class="btn-social waves-effect" @click="loginWithProvider('google')">
              <img src="~/assets/img/google-icon.png" width="64" height="64" alt="google" />
            </a>
          </v-col>
          <v-col cols="4">
            <a class="btn-social waves-effect" @click="loginWithProvider('facebook')">
              <img src="~/assets/img/facebook-icon.png" width="64" height="64" alt="google" />
            </a>
          </v-col>
          <v-col cols="4">
            <a class="btn-social waves-effect" @click="loginWithProvider('twitter')">
              <img src="~/assets/img/twitter-icon.png" width="64" height="64" alt="google" />
            </a>
          </v-col>
          <v-col class="d-md-none d-lg-flex">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div class="text-center">
        <p>O BIEN</p>
        <form class="container" @submit.prevent="loginWithEmail()">
          <v-text-field
            v-model.lazy="$v.email.$model"
            label="Ingresá tu email"
            :error-messages="emailErrors"
            prepend-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            v-model.lazy="$v.password.$model"
            :error-messages="passwordErrors"
            label="Ingresá tu contraseña"
            :type="show ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            hint="Minimo 6 caracteres"
          ></v-text-field>

          <v-row class="mt-3">
            <v-col cols="6">
              <v-btn text class="mr-4">registrarse</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn id="acceder" type="submit" class="mr-4">acceder</v-btn>
            </v-col>
          </v-row>
        </form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import { firebase } from "@/plugins/firebase.js";

export default {
  name: "login",
  layout: "login",
  middleware: 'guest',
  data() {
    return {
      appName: process.env.APP_NAME,
      baseUrl: process.env.BASE_URL,
      email: "",
      password: "",
      show: false
    };
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  computed: {
    ...mapState(["user"]),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push("Debe escribir un email valido");
      if (!this.$v.email.required)
        errors.push("El email es un campo obligatorio");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required)
        errors.push("La contraseña es un campo obligatorio");
      if (!this.$v.password.minLength)
        errors.push("Debe escribir una contraseña de más de 6 digitos");
      return errors;
    }
  },
  methods: {
    ...mapActions(["saveUser"]),
    async loginWithProvider(providerID) {
      console.log(providerID);
      let provider;

      switch (providerID) {
        case "facebook":
          console.log("Iniciando sesion con facebook");
          provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope("email");
          break;
        case "google":
          console.log("Iniciando sesion con google");
          provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope("email");
          provider.addScope("profile");
          break;
        case "twitter":
          console.log("Iniciando sesion con twitter");
          provider = new firebase.auth.TwitterAuthProvider();
      }

      try {
        const result = await firebase.auth().signInWithPopup(provider);
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          //var credential = result.credential;
          var user = result.user;
          //var token = result.credential.accessToken;
          //console.log(token);
          // ...
        }
        // The signed-in user info.
        var user = result.user;

        console.log(user);

        this.saveUserAndRedirect(user);
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        /* M.toast({
            html: errorMessage
          }); */

        if (error.code === "auth/account-exists-with-different-credential") {
          try {
            const providers = await firebase
              .auth()
              .fetchSignInMethodsForEmail(email);
            // The returned 'providers' is a list of the available providers
            // linked to the email address. Please refer to the guide for a more
            // complete explanation on how to recover from this error.
            console.log(providers);

            let html =
              "Ya existe una cuenta con ese email. Deberás iniciar sesion con ";

            providers.forEach(provider => {
              html += provider + " / ";
            });
            /* M.toast({
                    html: html
                  }); */
            console.log(html);

            // TODO: Resolver este tema
            //sessionStorage.setItem("providerID", providerID);
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    async loginWithEmail() {
      console.log("Submit: ", this.$v);
      if (this.$v.$invalid) return;

      console.log("email:", this.$v.email.$model);
      console.log("password:", this.$v.password.$model);

      let buttonAcceder = document.querySelector("#acceder");
      buttonAcceder.classList.add("disabled");

      try {
        const result = await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.$v.email.$model,
            this.$v.password.$model
          );
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        switch (errorCode) {
          case "auth/user-not-found":
            console.log("No existe usuario registrado con ese email");
            /* M.toast({
              html: "No existe usuario registrado con ese email"
            }); */
            /* respuesta.innerHTML = `
              <div id="chip_pass" class="chip">
                  No existe usuario registrado con ese email
                  <i class="close material-icons">close</i>
              </div>
              `; */
            break;
          case "auth/wrong-password":
            console.log("Contraseña incorrecta");
            /* M.toast({
              html: "Contraseña incorrecta"
            });
            respuesta.innerHTML = `
              <div id="chip_pass" class="chip">
                  Contraseña incorrecta
                  <i class="close material-icons">close</i>
              </div>
              `; */
            break;
          default:
            console.log("Ocurrió un error");
          /* M.toast({
              html: "Ocurrió un error"
            });
            respuesta.innerHTML = `
              <div id="chip_pass" class="chip">
                  Ocurrió un error
                  <i class="close material-icons">close</i>
              </div>
              `; */
        }

        buttonAcceder.classList.remove("disabled");
      }
    },
    async saveUserAndRedirect(user) {

      // Save user in the store
      this.saveUser({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        emailVerified: user.emailVerified
      });

      this.$router.push("/");
    }
  },
  /* async mounted() {
    firebase.auth().onAuthStateChanged(function(userAuth) {
      console.log(userAuth);
    });
  } */
};
</script>