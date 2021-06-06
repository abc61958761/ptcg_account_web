<template>
  <div style="height: 100%; overflow: hidden;">
    <div class="d-flex">
      <h3>庫存紀錄</h3>
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
    </div>
    <v-list style="height: 100%; overflow: hidden;">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>卡片名稱</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>庫存張數</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>全部金額</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>單張成本</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content  style="max-width:100px">
          <v-list-item-title>編輯</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div style="height: 100%; overflow: auto; padding-bottom: 80px">
        <v-list-item
          v-for="item of inventories"
          :key="item.id"
          style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
        >
          <v-list-item-content>
            <v-list-item-title v-if="!item.pokemon.isEdit">
              {{ item.pokemon.name }}
            </v-list-item-title>
            <v-text-field
              v-else
              dense
              hide-details
              class="mr-4"
              v-model="item.pokemon.name"
            ></v-text-field>
          </v-list-item-content>
          <v-list-item-content>
            {{ item.count }}
          </v-list-item-content>
          <v-list-item-content>
            {{ item.total_price }}
          </v-list-item-content>
          <v-list-item-content>
            {{ item.total_price / item.count || 0 }}
          </v-list-item-content>
          <v-list-item-content style="max-width:100px">
            <div>
              <v-btn
                color="red"
                icon
                v-if="item.pokemon.isEdit"
                @click="cancelEditPokemonAction(item.pokemon)"
              >
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
              <v-btn
                color="green"
                icon
                v-if="item.pokemon.isEdit"
                @click="updatePokemonAction(item.pokemon)"
              >
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
              <v-btn
                color="blue"
                icon
                v-else
                @click="editPokemonAction(item.pokemon)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
    <v-btn color="primary" fab fixed bottom right @click="triggerUpload"
      ><v-icon>mdi-plus</v-icon></v-btn
    >
    <input
      v-show="false"
      type="file"
      ref="uploadPokemon"
      @change="uploadPokemon"
    />
  </div>
</template>
<script>
  import XLSX from "xlsx";
  import PokemonMapping from "../assets/pokemon-mapping";

  import { mapGetters } from "vuex";

  export default {
    data: () => {
      return {
        isSearch: false,
        searchPokemon: "",
        tempPokemons: {},
      };
    },
    computed: {
      ...mapGetters({
        inventories: "inventories",
      }),
    },
    async mounted() {
      await this.$store.dispatch("queryInventories");
    },
    methods: {
      triggerUpload() {
        this.$refs.uploadPokemon.click();
      },
      uploadPokemon(event) {
        const reader = new FileReader();
        const filename = event.target.files[0].name.split(".")[0];
        reader.onload = async (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

          const pokemons = [];
          for (let i = 1; i < data.length; i++) {
            pokemons.push({
              name: `${data[i][0]} - ${data[i][1]} - ${PokemonMapping[filename]}`,
            });
          }
          await this.$store.dispatch("createPokemons", pokemons);
        };
        reader.readAsBinaryString(event.target.files[0]);
      },
      async cancelSearchPokemonAction() {
        this.isSearch = false;

        if (this.searchPokemon) {
          await this.$store.dispatch("queryInventories");
          this.searchPokemon = "";
        }
      },
      async queryPokemons() {
        await this.$store.dispatch("queryInventories", {
          name: this.searchPokemon,
        });
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
    },
    updated() {
      if (this.isSearch) {
        this.$refs.searchPokemon.$el.querySelector("input").focus();
      }
    },
  };
</script>
