<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="faceMasks"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-container>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    data: () => {
      return {
        search: "",
        headers: [
          { text: "ID", value: "properties.id" },
          { text: "Name", value: "properties.name" },
        ],
      };
    },
    computed: {
      ...mapGetters({
        faceMasks: "faceMasks",
      }),
    },
    async mounted() {
      await this.$store.dispatch("queryFaceMasks");
    },
  };
</script>
