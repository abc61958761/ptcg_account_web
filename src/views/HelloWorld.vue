<template>
  <v-container>
    <v-btn @click="increment">Count</v-btn>
    {{ count }}
    <v-btn @click="goFaceMask">Go To Face Mask</v-btn>
  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "HelloWorld",
    data: () => ({}),
    computed: {
      ...mapState({
        count: state => state.count
      }),
    },
    mounted() {
      console.log(this.$store);
    },
    methods: {
      increment() {
        this.$store.commit("increment");
      },
      queryFaceMasks() {
        this.$store.dispatch("queryFaceMasks");
      },
      goFaceMask() {
        this.$router.push("face-mask");
      },
    },
  };
</script>
