<template>
  <v-dialog
    persistent
    v-model="openDialog"
    transition="dialog-bottom-transition"
    max-width="600px"
  >
    <v-card>
      <v-card-title class="headline">
        新增商品名稱
      </v-card-title>
      <v-divider class="mb-4"></v-divider>
      <v-card-text>
        <div class="mb-4">
          <v-text-field
            v-model="pokemonName"
            label="品項名稱"
            hide-details
            outlined
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field
            v-model="series"
            label="彈數"
            hide-details
            outlined
            class="mr-2"
          ></v-text-field>
          <v-text-field
            v-model="number"
            label="彈數編號"
            hide-details
            outlined
            class="mr-2"
          ></v-text-field>
          <v-text-field
            label="標號"
            v-model="grade"
            hide-details
            outlined
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined @click="close">取消</v-btn>
        <v-btn depressed @click="addCardAction">新增</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: ["openDialog"],
    data: () => {
      return {
        pokemonName: "",
        grade: "",
        number: "",
        series: "",
      };
    },
    methods: {
      async addCardAction() {
        await this.$store.dispatch("createPokemon", {
          name: `${this.series}_${this.number} - ${this.pokemonName} - ${this.grade}`,
        });
        this.close();
      },
      close() {
        this.clean();
        this.$emit("closeDialog");
      },
      clean() {
        this.pokemonName = "";
        this.grade = "";
        this.number = "";
        this.series = "";
      },
    },
  };
</script>
