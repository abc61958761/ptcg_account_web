<template>
  <div>
    <div class="d-flex">
      <h3>結算紀錄</h3>
      <v-spacer></v-spacer>
      <v-btn @click="updateSettlement">更新結算</v-btn>
    </div>
    <div class="d-flex mt-4">
      <v-card class="d-flex flex-grow-1 flex-column mr-1" height="150px">
        <v-card-text style="position: absolute;">
          <h2>總成本</h2>
        </v-card-text>
        <v-card-text class="d-flex flex-grow-1 justify-center align-center">
          <h1>$ {{ totalPurchase }}</h1>
        </v-card-text>
      </v-card>
      <v-card class="d-flex flex-grow-1 ml-1 flex-column">
        <v-card-text style="position: absolute;">
          <h2>總利潤</h2>
        </v-card-text>
        <v-card-text class="d-flex flex-grow-1 justify-center align-center">
          <h1>$ {{ totalSold }}</h1>
        </v-card-text>
      </v-card>
    </div>
    <v-list>
      <v-list-item
        @click="detailSettlement(item.year, item.month, item.status)"
        class="pr-10 pl-10 mb-2"
        style="box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);height: 96px;"
        v-for="(item, index) of settlements"
        :key="index"
      >
        <v-list-item-content>
          <v-list-item-title
            >{{ item.year }} / {{ item.month }}
            <v-chip class="ml-2" small color="#565656" text-color="white">
              <span v-if="item.status === 'unsettlement'">未結算</span>
              <span v-else>已結算</span>
            </v-chip>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>利潤 {{ item.sold }} </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>成本 {{ item.purchase }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    methods: {
      updateSettlement() {
        const params = [];
        for (const item of this.settlements) {
          if (item.status === "unsettlement") {
            params.push({ year: item.year, month: item.month });
          }
        }
        if (params.length == 0) return;

        this.$store.dispatch("updateSettlement", params);
      },
      detailSettlement(year, month, status) {
        this.$router.push({
          path: "settlement-detail",
          query: { year, month, status },
        });
      },
    },
    computed: {
      ...mapGetters({
        settlements: "settlements",
      }),
      totalSold() {
        let result = 0;
        for (const settlement of this.settlements) {
          result += settlement.sold;
        }
        return result;
      },
      totalPurchase() {
        let result = 0;
        for (const settlement of this.settlements) {
          result += settlement.purchase;
        }
        return result;
      },
    },
    async mounted() {
      await this.$store.dispatch("querySettlements");
    },
  };
</script>
