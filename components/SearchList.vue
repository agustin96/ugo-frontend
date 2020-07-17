<template>
  <div>
    <v-list two-line v-if="articulosFiltered">
      <template v-for="(item, index) in articulosFiltered">
        <v-divider v-if="index != 0" :key="item.id"></v-divider>

        <v-list-item :key="item.detail">
          <v-list-item-avatar v-if="item.avatar">
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.detail"></v-list-item-title>
            <v-list-item-subtitle v-html="`<span class='text--primary'>$${item.price}</span>`"></v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.description" v-html="item.description"></v-list-item-subtitle>
          </v-list-item-content>

          <!-- <v-list-item-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-home</v-icon>
            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-home</v-icon>
          </v-list-item-icon>-->

          <v-list-item-action>
            <v-icon
              large
              @click="decrementArticulo(item)"
              color="grey lighten-1"
            >mdi-minus-circle</v-icon>
            <v-list-item-action-text v-text="item.cantidad"></v-list-item-action-text>
            <v-icon large @click="incrementArticulo(item)" color="yellow">mdi-plus-circle</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <!-- {{$route.params}} -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions(["incrementArticulo"]),
    ...mapActions(["decrementArticulo"])
  },
  computed: {
    ...mapState(["articulosFiltered"])
  }
};
</script>

<style>
.v-list-item__action {
  align-items: center;
}
.v-list-item__action-text {
  padding: 0 1rem;
}
.v-list-item__action--stack {
  flex-direction: row;
}
</style>