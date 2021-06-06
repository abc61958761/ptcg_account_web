<template>
  <div class="d-flex flex-column flex-grow-1">
    <h3>賣出紀錄</h3>

    <v-list style="height: 100%;overflow: scroll;">
      <v-list-group v-for="item of soldRecords" :key="item.sold.id">
        <template v-slot:activator>
          <v-list-item-content style="max-width: 50px">
            <v-checkbox
              class="ma-0 pa-0 ml-2"
              hide-details
              v-model="item.isDelete"
              @change="deleteItem(item.sold.id, item.isDelete)"
            ></v-checkbox>
          </v-list-item-content>
          <v-list-item-content style="display: block">
            <v-chip small dark class="mr-2" :class="[item.sold.payee]">
              {{ item.sold.payee }}
            </v-chip>
            <v-chip
              small
              dark
              :class="[item.sold.split === 'true' ? split : unsplit]"
            >
              <span v-if="item.sold.split === 'true'">已拆帳</span>
              <span v-else>未拆帳</span>
            </v-chip>
          </v-list-item-content>
          <v-list-item-content>
            {{ new Date(item.sold.date).getFullYear() }} /
            {{ new Date(item.sold.date).getMonth() + 1 }} /
            {{ new Date(item.sold.date).getDate() }}
          </v-list-item-content>
          <v-list-item-content>
            ＄{{ item.sold.total_price }}
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="sold_record of item.sold_records"
          :key="sold_record.record.id"
        >
          <v-list-item-content></v-list-item-content>
          <v-list-item-content>
            <div>{{ sold_record.pokemon.name }}</div>
          </v-list-item-content>
          <v-list-item-content>
            <div>
              <span class="mr-10"> {{ sold_record.record.count }} 張 </span>
              <span
                >{{ sold_record.record.total_price / sold_record.record.count }}
                / 張
              </span>
            </div>
          </v-list-item-content>
          <v-list-item-content>
            <div>＄{{ sold_record.record.total_price }}</div>
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
    <add-sold-item
      :openDialog="openSoldItemDialog"
      @closeDialog="openSoldItemDialog = false"
    ></add-sold-item>
  </div>
</template>
<script>
  import AddSoldItem from "../components/dialog/AddSoldItem";
  import { mapGetters } from "vuex";

  export default {
    data: () => {
      return {
        openSoldItemDialog: false,
        expanded: [],
        dessertHeaders: [
          { text: "刪除", value: "delete" },
          { text: "收款人", value: "sold.payee" },
          { text: "品項名稱", value: "sold.name" },
          { text: "賣出時間", value: "sold.date" },
          { text: "銷售通路", value: "sold.salesChannel" },
          { text: "賣出金額", value: "sold.total_price" },
          { text: "", value: "data-table-expand" },
        ],
        tempDeleteItems: new Set(),
        split: "split",
        unsplit: "unsplit",
      };
    },
    components: {
      "add-sold-item": AddSoldItem,
    },
    computed: {
      ...mapGetters({
        soldRecords: "soldRecords",
      }),
    },
    methods: {
      itemDialogAction() {
        this.openSoldItemDialog = true;
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
        await this.$store.dispatch("deleteSoldRecords", {
          ids: Array.from(this.tempDeleteItems),
        });
      },
    },
    async mounted() {
      await this.$store.dispatch("querySoldRecords");
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