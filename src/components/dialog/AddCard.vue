<template>
  <v-dialog
    v-model="openDialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card
      style="flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
      "
    >
      <v-card-title class="headline grey lighten-2">
        卡片登錄
      </v-card-title>
      <v-container
        style="height: 100%;
          display: flex;
          overflow: hidden;"
      >
        <v-card-text
          style="display: flex;flex-direction: column;"
        >
          <div style="display: flex; align-items: center" class="mb-2">
            <v-text-field
              dense
              outlined
              hide-details
              label="品項命名"
              class="mr-4"
              v-model="newCard"
            ></v-text-field>
            <v-btn @click="addCardAction">新增</v-btn>
          </div>
          <v-subheader>
            卡片名稱
            <v-spacer></v-spacer>
            <v-text-field
              style="max-width: 300px"
              v-if="isSearch"
              dense
              hide-details
              v-model="searchPokemon"
              @keyup="queryPokemons"
              @blur="isSearch = false"
              ref="searchPokemon"
            ></v-text-field>
            <v-btn icon v-if="isSearch" @click="cancelSearchPokemonAction">
              <v-icon color="grey lighten-1">mdi-close</v-icon>
            </v-btn>
            <v-btn icon v-if="!isSearch" @click="isSearch = true">
              <v-icon color="grey lighten-1">mdi-magnify</v-icon>
            </v-btn>
          </v-subheader>

          <v-divider></v-divider>
          <v-list dense class="pa-0" style="overflow: auto">
            <v-list-item
              v-for="pokemon of pokemons"
              dense
              :key="pokemon.id"
              style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
            >
              <v-list-item-content>
                <v-list-item-title v-if="!pokemon.isEdit">
                  {{ pokemon.name }}
                </v-list-item-title>
                <v-text-field
                  v-else
                  dense
                  hide-details
                  class="mr-4"
                  v-model="pokemon.name"
                ></v-text-field>
              </v-list-item-content>

              <v-list-item-action>
                <div>
                  <v-btn
                    color="red"
                    icon
                    v-if="pokemon.isEdit"
                    @click="cancelEditPokemonAction(pokemon)"
                  >
                    <v-icon>mdi-close-thick</v-icon>
                  </v-btn>
                  <v-btn
                    color="green"
                    icon
                    v-if="pokemon.isEdit"
                    @click="updatePokemonAction(pokemon)"
                  >
                    <v-icon>mdi-check-bold</v-icon>
                  </v-btn>
                  <v-btn
                    color="blue"
                    icon
                    v-else
                    @click="editPokemonAction(pokemon)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions style="position: fixed; bottom: 0px; right: 0px;">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDialogAction">
            關閉
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    props: ["openDialog"],
    data: () => {
      return {
        newCard: "",
        tempPokemons: {},
        searchPokemon: "",
        isSearch: false,
      };
    },
    computed: {
      ...mapGetters({
        pokemons: "pokemons",
      }),
    },
    methods: {
      async addCardAction() {
        await this.$store.dispatch("createPokemon", { name: this.newCard });
        this.newCard = "";
      },
      closeDialogAction() {
        this.$emit("closeDialog");
      },
      editPokemonAction(pokemon) {
        this.tempPokemons[pokemon.id] = pokemon.name;
        pokemon.isEdit = true;
      },
      cancelEditPokemonAction(pokemon) {
        pokemon.name = this.tempPokemons[pokemon.id];
        delete this.tempPokemons[pokemon.id];

        pokemon.isEdit = false;
      },
      async updatePokemonAction(pokemon) {
        await this.$store.dispatch("updatePokemon", {
          id: pokemon.id,
          name: pokemon.name,
        });

        delete this.tempPokemons[pokemon.id];

        pokemon.isEdit = false;
      },
      async queryPokemons() {
        await this.$store.dispatch("queryPokemons", {
          name: this.searchPokemon,
        });
      },
      async cancelSearchPokemonAction() {
        this.isSearch = false;

        if (this.searchPokemon) {
          await this.$store.dispatch("queryPokemons");
          this.searchPokemon = "";
        }
      },
    },
    async mounted() {
      await this.$store.dispatch("queryPokemons");
    },
    updated() {
      if (this.isSearch) {
        this.$refs.searchPokemon.$el.querySelector("input").focus();
      }
    },
  };
</script>
