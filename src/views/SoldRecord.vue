<template>
  <div class="d-flex flex-column flex-grow-1">
    <h3>賣出紀錄</h3>
    <v-data-table
      :headers="dessertHeaders"
      :items="soldRecords"
      :expanded.sync="expanded"
      item-key="sold.id"
      show-expand
      hide-default-header
      class="d-flex flex-column flex-grow-1"
    >
      <template v-slot:item.delete="{ item }">
        <v-checkbox
          v-model="item.isDelete"
          @change="deleteItem(item.sold.id, item.isDelete)"
        ></v-checkbox>
      </template>
      <template v-slot:item.sold.date="{ item }">
        {{ new Date(item.sold.date).getFullYear() }} /
        {{ new Date(item.sold.date).getMonth() }} /
        {{ new Date(item.sold.date).getDate() }}
      </template>
      <template v-slot:item.sold.payee="{ item }">
        <v-chip dark>
          {{ item.sold.payee }}
        </v-chip>
      </template>
      <template v-slot:item.sold.price="{ item }">
        ＄{{ item.sold.price }}
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-list-item
            v-for="sold_record of item.sold_records"
            :key="sold_record.record.id"
          >
          <v-list-item-content></v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{
                sold_record.pokemon.name
              }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                <span class="mr-10"> {{ sold_record.record.count }} 張 </span>
                <span>{{ sold_record.record.price }} / 張 </span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>＄{{
                sold_record.record.count * sold_record.record.price
              }}</v-list-item-title>
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
      <v-btn @click="itemDialogAction">新增品項</v-btn>
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
          { text: "賣出金額", value: "sold.price" },
          { text: "", value: "data-table-expand" },
        ],
        tempDeleteItems: new Set(),
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
