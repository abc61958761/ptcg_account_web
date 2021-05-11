<template>
  <div style="overflow: scroll; padding: 8px">
    <div>{{ year }} / {{ month }} 結算紀錄</div>

    <div class="d-flex mt-4">
      <v-card class="d-flex flex-column mr-1" height="200px" style="flex:1">
        <v-card-title style="position: absolute;">
          本月營收
        </v-card-title>
        <v-card-text
          class="d-flex flex-grow-1 justify-center align-center pt-4"
        >
          <h1>${{ totalSold }}</h1>
        </v-card-text>
      </v-card>
      <v-card class="d-flex ml-1 flex-column" style="flex:1">
        <v-card-title style="position: absolute;">
          本月成本
        </v-card-title>
        <v-card-text
          class="d-flex flex-grow-1 justify-center align-center pt-4"
        >
          <h1>${{ totalPurchase }}</h1>
        </v-card-text>
      </v-card>
      <v-card class="d-flex ml-1 flex-column" style="flex:1">
        <v-card-title style="position: absolute;">
          本月總結
        </v-card-title>
        <v-card-text
          class="d-flex flex-grow-1 justify-center align-center pt-4"
        >
          <h1>$ {{ totalSold - totalPurchase }}</h1>
        </v-card-text>
      </v-card>
    </div>

    <div class="d-flex mt-4" v-if="settlementDetail.detail">
      <v-card class="d-flex flex-column mr-1" height="150px" style="flex:1">
        <v-card-title>
          Chad
        </v-card-title>
        <v-card-text class="d-flex flex-column flex-grow-1 justify-center">
          <div class="d-flex">
            本月付款
            <h2 class="ml-3">
              $ {{ settlementDetail.detail.chad_purchase_price }}
            </h2>
          </div>
          <div class="d-flex mt-2">
            本月付款
            <h2 class="ml-3">
              $ {{ settlementDetail.detail.chad_sold_price }}
            </h2>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="d-flex ml-1 flex-column" style="flex:1">
        <v-card-title>
          Carol
        </v-card-title>
        <v-card-text class="d-flex flex-column flex-grow-1 justify-center ">
          <div class="d-flex">
            本月付款
            <h2 class="ml-3">
              $ {{ settlementDetail.detail.carol_purchase_price }}
            </h2>
          </div>
          <div class="d-flex mt-2">
            本月收款
            <h2 class="ml-3">
              $ {{ settlementDetail.detail.carol_sold_price }}
            </h2>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="d-flex mt-4" v-if="settlementDetail.detail">
      <v-card class="d-flex flex-column mr-1" style="flex: 1">
        <v-card-title class="d-flex">
          買入未拆帳
          <v-spacer></v-spacer>
          <v-btn
            @click="splitPurchases()"
            :disabled="settlementDetail.unsplitPurchases.length === 0"
            >全部結算</v-btn
          >
        </v-card-title>
        <v-card-text class="d-flex flex-column flex-grow-1 justify-center ">
          <div class="d-flex">
            Carol
            <h2 class="ml-3">$ {{ unSplitPurchaseTotal.carol }}</h2>
          </div>
          <div class="d-flex mt-2">
            Chad
            <h2 class="ml-3">$ {{ unSplitPurchaseTotal.chad }}</h2>
          </div>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="showUnsplitPurchase = !showUnsplitPurchase"
              :disabled="settlementDetail.unsplitPurchases.length === 0"
            >
              <v-icon>{{
                showUnsplitPurchase ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>
        </v-card-text>
        <v-expand-transition>
          <div v-show="showUnsplitPurchase">
            <v-divider></v-divider>
            <v-list>
              <v-list-item
                v-for="unsplitPurchase in settlementDetail.unsplitPurchases"
                :key="unsplitPurchase.id"
              >
                <div class="mr-4">
                  <v-chip>{{ unsplitPurchase.purchaser }}</v-chip>
                </div>

                <v-list-item-content>
                  {{ unsplitPurchase.name }}</v-list-item-content
                >
                <v-list-item-content>
                  {{ new Date(unsplitPurchase.date).getFullYear() }} /
                  {{ new Date(unsplitPurchase.date).getMonth() + 1 }} /
                  {{
                    new Date(unsplitPurchase.date).getDate()
                  }}</v-list-item-content
                >
                <v-list-item-content>
                  {{ unsplitPurchase.total_price }}</v-list-item-content
                >

                <v-list-item-action>
                  <v-btn icon @click="splitPurchase(unsplitPurchase.id)">
                    <v-icon color="grey lighten-1">mdi-check</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </v-card>

      <v-card class="d-flex ml-1 flex-column" style="flex: 1">
        <v-card-title class="d-flex">
          賣出未拆帳
          <v-spacer></v-spacer>
          <v-btn
            @click="splitSolds()"
            :disabled="settlementDetail.unsplitSolds.length === 0"
            >全部結算</v-btn
          >
        </v-card-title>
        <v-card-text class="d-flex flex-column flex-grow-1 justify-center ">
          <div class="d-flex">
            Carol
            <h2 class="ml-3">$ {{ unSplitSoldTotal.carol }}</h2>
          </div>
          <div class="d-flex mt-2">
            Chad
            <h2 class="ml-3">$ {{ unSplitSoldTotal.chad }}</h2>
          </div>
          <div class="d-flex">
            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="showUnsplitSold = !showUnsplitSold"
              :disabled="settlementDetail.unsplitSolds.length === 0"
            >
              <v-icon>{{
                showUnsplitSold ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </div>
        </v-card-text>
        <v-expand-transition>
          <div v-show="showUnsplitSold">
            <v-divider></v-divider>
            <v-list>
              <v-list-item
                v-for="unsplitSold in settlementDetail.unsplitSolds"
                :key="unsplitSold.id"
              >
                <div class="mr-4">
                  <v-chip>{{ unsplitSold.payee }}</v-chip>
                </div>

                <v-list-item-content>
                  {{ unsplitSold.name }}</v-list-item-content
                >
                <v-list-item-content>
                  {{ new Date(unsplitSold.date).getFullYear() }} /
                  {{ new Date(unsplitSold.date).getMonth() + 1 }} /
                  {{
                    new Date(unsplitSold.date).getDate()
                  }}</v-list-item-content
                >
                <v-list-item-content>
                  {{ unsplitSold.total_price }}</v-list-item-content
                >

                <v-list-item-action>
                  <v-btn icon @click="splitSold(unsplitSold.id)">
                    <v-icon color="grey lighten-1">mdi-check</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        year: null,
        month: null,
        showUnsplitPurchase: false,
        showUnsplitSold: false,
      };
    },
    methods: {
      async splitPurchase(id) {
        await this.$store.dispatch("splitPurchase", {
          id,
          year: this.year,
          month: this.month,
        });
      },
      async splitSold(id) {
        await this.$store.dispatch("splitSold", {
          id,
          year: this.year,
          month: this.month,
        });
      },
      async splitPurchases() {
        await this.$store.dispatch("splitPurchases", {
          year: this.year,
          month: this.month,
        });
      },
      async splitSolds() {
        await this.$store.dispatch("splitSolds", {
          year: this.year,
          month: this.month,
        });
      },
    },
    computed: {
      ...mapGetters({
        settlementDetail: "settlementDetail",
      }),
      totalSold() {
        if (!this.settlementDetail.detail) return 0;
        return (
          this.settlementDetail.detail.carol_sold_price +
          this.settlementDetail.detail.chad_sold_price
        );
      },
      totalPurchase() {
        if (!this.settlementDetail.detail) return 0;
        return (
          this.settlementDetail.detail.chad_purchase_price +
          this.settlementDetail.detail.carol_purchase_price
        );
      },
      unSplitSoldTotal() {
        const result = {
          carol: 0,
          chad: 0,
        };
        for (const sold of this.settlementDetail.unsplitSolds) {
          switch (sold.payee) {
            case "Chad":
              result.chad += sold.total_price;
              break;
            case "Carol":
              result.carol += sold.total_price;
              break;
            default:
              break;
          }
        }

        return result;
      },
      unSplitPurchaseTotal() {
        const result = {
          carol: 0,
          chad: 0,
        };

        for (const purchase of this.settlementDetail.unsplitPurchases) {
          switch (purchase.purchaser) {
            case "Chad":
              result.chad += purchase.total_price;
              break;
            case "Carol":
              result.carol += purchase.total_price;
              break;
            default:
              break;
          }
        }

        return result;
      },
    },
    async mounted() {
      this.year = this.$route.query.year;
      this.month = this.$route.query.month;
      this.status = this.$route.query.status;

      await this.$store.dispatch("getSettlementDetail", {
        year: this.year,
        month: this.month,
        status: this.status,
      });
    },
  };
</script>
