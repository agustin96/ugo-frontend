<template>
  <v-container>
    <v-row>
      <v-col cols="6" v-for="(item, index) in items" :key="index">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <!-- <div class="overline mb-4">OVERLINE</div> -->
              <v-list-item-title class="headline mb-1">{{item.title}}</v-list-item-title>
              <v-list-item-subtitle>{{item.subtitle}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="30">
              <v-icon large>{{item.icon}}</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text nuxt :to="item.to" color="primary">{{item.btnText}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "Carta",
        subtitle: "Nuestros Productos",
        icon: "mdi-map",
        btnText: "Ver",
        to: "/carta"
      },
      {
        title: "Pedidos",
        subtitle: "Tu historial de pedidos",
        icon: "mdi-cart",
        btnText: "Consultar",
        to: "#"
      },
      {
        title: "Mozo",
        subtitle: "Comunicate",
        icon: "mdi-account",
        btnText: "LLamar",
        to: "#"
      },
      {
        title: "Cupones",
        subtitle: "Usá tus cupones",
        icon: "mdi-receipt",
        btnText: "Ver",
        to: "#"
      }
    ]
  }),
  asyncData({store, redirect}) {
    if (!store.state.data) {
      redirect("/")
    }
  },
};
</script>