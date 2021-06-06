<template>
  <div
    class="d-flex flex-column flex-grow-1"
    style="height: 100%;
        overflow: hidden;"
  >
    <h3>買入紀錄</h3>

    <v-list style="height: 100%;overflow: scroll;">
      <v-list-group v-for="item of purchaseRecords" :key="item.purchase.id">
        <template v-slot:activator>
          <v-list-item-content style="max-width: 50px">
            <v-checkbox
              class="ma-0 pa-0 ml-2"
              hide-details
              v-model="item.isDelete"
              @change="deleteItem(item.purchase.id, item.isDelete)"
            ></v-checkbox>
          </v-list-item-content>
          <v-list-item-content style="display: block">
            <v-chip small dark class="mr-2" :class="[item.purchase.purchaser]">
              {{ item.purchase.purchaser }}
            </v-chip>
            <v-chip
              small
              dark
              :class="[item.purchase.split === 'true' ? split : unsplit]"
            >
              <span v-if="item.purchase.split === 'true'">已拆帳</span>
              <span v-else>未拆帳</span>
            </v-chip>
          </v-list-item-content>
          <v-list-item-content>
            {{ new Date(item.purchase.date).getFullYear() }} /
            {{ new Date(item.purchase.date).getMonth() + 1 }} /
            {{ new Date(item.purchase.date).getDate() }}
          </v-list-item-content>
          <v-list-item-content
            >＄{{ item.purchase.total_price }}</v-list-item-content
          >
        </template>

        <v-list-item
          v-for="(purchase_record, index) of item.purchase_records"
          :key="index"
        >
          <v-list-item-content style="max-width: 50px"> </v-list-item-content>
          <v-list-item-content></v-list-item-content>
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
      </v-list-group>
    </v-list>

    <div class="mb-1 d-flex">
      <v-btn depressed color="primary"  @click="deleteItemsAction" :disabled="tempDeleteItems.size == 0"
        >刪除</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="itemDialogAction">新增品項</v-btn>
    </div>
    <add-item-dialog
      :openDialog="openItemDialog"
      @closeDialog="openItemDialog = false"
    ></add-item-dialog>
  </div>
</template>
<script>
  import AddPurchaseItem from "../components/dialog/AddPurchaseItem";

  import { mapGetters } from "vuex";

  export default {
    data: () => {
      return {
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
        split: "split",
        unsplit: "unsplit",
      };
    },
    components: {
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
<style lang="scss" scoped>
  .v-chip {
    &.Chad {
      background: #80b2ff;
    }
    &.Carol {
      background: #edacea;
    }
    &.split {
      background: #56e18e;
    }
    &.unsplit {
      background: #ffd08a;
    }
  }
</style>
