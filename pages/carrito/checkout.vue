<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>Dirección de entrega</v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <v-card>
        <v-card-title>Forma de pago</v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <v-card>
        <v-card-title>Cupon</v-card-title>
        <v-card-subtitle>Ingresá un cupon</v-card-subtitle>
      </v-card>
    </v-container>

    <v-container>
      <v-card>
        <v-card-title>Resumen</v-card-title>
        <v-card-text>
          <p>Productos</p>
          <p>Envio</p>
          <p>Propina</p>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container style="position: fixed; display: fixed; bottom: 15px">
      <nuxt-link to="/carrito/checkout">
        <v-alert color="primary" prominent dense>
          <v-row align="center">
            <v-col class="shrink" align="center" style="padding: 0 12px;">
            </v-col>
            <v-col class="grow" align="center">
              PEDIR
            </v-col>
            <v-col class="shrink">
            </v-col>
          </v-row>
        </v-alert>
      </nuxt-link>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>