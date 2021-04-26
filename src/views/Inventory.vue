<template>
  <div>
    <h3>庫存紀錄</h3>
    <v-list>
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
      </v-list-item>
      <div>
        <v-list-item
          v-for="item of inventories"
          :key="item.id"
          style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
        >
          <v-list-item-content>
            {{ item.pokemon.name }}
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
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    computed: {
      ...mapGetters({
        inventories: "inventories",
      }),
    },
    async mounted() {
      await this.$store.dispatch("queryInventories");
    },
  };
</script>
