<template>
  <v-container> 
    <v-btn @click="increment">Count</v-btn>
    {{count}}
    <v-btn @click="goFaceMask">Go To Face Mask</v-btn>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: "HelloWorld",
    data: () => ({}),
    computed: {
      ...mapState({
        count: 'count'
      })
    },
    methods: {
      increment() {
        this.$store.commit("increment");
        console.log(this.$store.state.count);
      },
      queryFaceMasks () {
        this.$store.dispatch('queryFaceMasks');
      },
      goFaceMask() {
        this.$router.push('face-mask')
      }
    },
  };
</script>
