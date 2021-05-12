<template>
  <div
    class="d-flex flex-column flex-grow-1"
    style="height: 100%;
        overflow: hidden;"
  >
    <h3>買入紀錄</h3>
    <v-data-table
      :headers="dessertHeaders"
      :items="purchaseRecords"
      :expanded.sync="expanded"
      hide-default-header
      item-key="purchase.id"
      show-expand
      class="d-flex flex-column flex-grow-1"
      style="height: 100%;
        overflow: hidden;"
    >
      <template v-slot:item.delete="{ item }">
        <v-checkbox
          hide-details
          v-model="item.isDelete"
          @change="deleteItem(item.purchase.id, item.isDelete)"
        ></v-checkbox>
      </template>
      <template v-slot:item.purchase.date="{ item }">
        {{ new Date(item.purchase.date).getFullYear() }} /
        {{ new Date(item.purchase.date).getMonth() + 1 }} /
        {{ new Date(item.purchase.date).getDate() }}
      </template>
      <template v-slot:item.purchase.total_price="{ item }">
        ＄{{ item.purchase.total_price }}
      </template>
      <template v-slot:item.purchase.purchaser="{ item }">
        <v-chip small dark class="mr-2">
          {{ item.purchase.purchaser }}
        </v-chip>
        <v-chip small dark>
          <span v-if="item.purchase.split === 'true'">已拆帳</span>
          <span v-else>未拆帳</span>
        </v-chip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-list-item
            v-for="(purchase_record, index) of item.purchase_records"
            :key="index"
            ><v-list-item-content> </v-list-item-content>
            <v-list-item-content>
              <div>{{ purchase_record.pokemon.name }}</div>
            </v-list-item-content>
            <v-list-item-content>
              <div>
                <span class="mr-10">{{ purchase_record.record.count }} 張</span>
                <span
                  >{{
                    purchase_record.record.total_price /
                      purchase_record.record.count
                  }}
                  / 張
                </span>
              </div>
            </v-list-item-content>
            <v-list-item-content>
              <div>＄{{ purchase_record.record.total_price }}</div>
            </v-list-item-content>
          </v-list-item>
        </td>
      </template>
    </v-data-table>
    <div class="mb-1 d-flex">
      <v-btn @click="deleteItemsAction" :disabled="tempDeleteItems.size == 0"
        >刪除</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn class="mr-4" @click="cardDialogAction">新增名稱</v-btn>
      <v-btn @click="itemDialogAction">新增品項</v-btn>
    </div>
    <add-card-dialog
      :openDialog="openCardDialog"
      @closeDialog="openCardDialog = false"
    ></add-card-dialog>
    <add-item-dialog
      :openDialog="openItemDialog"
      @closeDialog="openItemDialog = false"
    ></add-item-dialog>
  </div>
</template>
<script>
  import AddCard from "../components/dialog/AddCard";
  import AddPurchaseItem from "../components/dialog/AddPurchaseItem";
  import { mapGetters } from "vuex";

  export default {
    data: () => {
      return {
        openCardDialog: false,
        openItemDialog: false,
        expanded: [],
        dessertHeaders: [
          { text: "刪除", value: "delete" },
          { text: "購入者", value: "purchase.purchaser" },
          { text: "品項名稱", value: "purchase.name" },
          { text: "購入時間", value: "purchase.date" },
          { text: "購入金額", value: "purchase.total_price" },
          { text: "", value: "data-table-expand" },
        ],
        tempDeleteItems: new Set(),
      };
    },
    components: {
      "add-card-dialog": AddCard,
      "add-item-dialog": AddPurchaseItem,
    },
    computed: {
      ...mapGetters({
        purchaseRecords: "purchaseRecords",
      }),
    },
    methods: {
      itemDialogAction() {
        this.openItemDialog = true;
      },
      cardDialogAction() {
        this.openCardDialog = true;
      },
      deleteItem(id, value) {
        if (value) {
          this.tempDeleteItems.add(id);
        } else {
          this.tempDeleteItems.delete(id);
        }
        this.$forceUpdate();
      },
      async deleteItemsAction() {
        await this.$store.dispatch("deletePurchaseRecords", {
          ids: Array.from(this.tempDeleteItems),
        });
      },
    },
    async mounted() {
      await this.$store.dispatch("queryPurchaseRecords");
    },
  };
</script>
