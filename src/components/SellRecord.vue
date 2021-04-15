<template>
  <div>
    <v-data-table
      :headers="dessertHeaders"
      :items="desserts"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:item.split="{ item }">
        <v-checkbox v-model="item.split"></v-checkbox>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-list-item v-for="(card, index) of item.items" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ card.cardName }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                <span class="mr-5"> {{ card.count }} / 張 </span>
                <span>{{ card.price }} / 張 </span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{
                card.count * card.price
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </td>
      </template>
    </v-data-table>
    <div style="position: fixed; bottom: 16px; right: 16px;">
      <v-btn @click="itemDialogAction">新增品項</v-btn>
    </div>
    <add-sold-item
      :openDialog="openSoldItemDialog"
      @closeDialog="openSoldItemDialog = false"
    ></add-sold-item>
  </div>
</template>
<script>
  import AddSoldItem from "./dialog/AddSoldItem";

  export default {
    data: () => {
      return {
        openSoldItemDialog: false,
        expanded: [],
        dessertHeaders: [
          { text: "拆帳", value: "split" },
          { text: "品項名稱", value: "name" },
          { text: "賣出時間", value: "soldDate" },
          { text: "賣出金額", value: "soldPrice" },
        ],
        desserts: [
          {
            split: true,
            name: "一堆皮卡丘",
            soldDate: "2021 / 04 / 21",
            soldPrice: 500,
            items: [
              {
                cardName: "皮卡丘 SR",
                count: 3,
                price: 300,
              },
              {
                cardName: "皮卡丘 SR",
                count: 3,
                price: 300,
              },
            ],
          },
        ],
      };
    },
    components: {
      "add-sold-item": AddSoldItem,
    },
    methods: {
        itemDialogAction() {
            this.openSoldItemDialog = true;
        }
    }
  };
</script>
