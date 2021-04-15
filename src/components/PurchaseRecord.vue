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
      <v-btn
        class="mr-4"
        @click="cardDialogAction"
        >新增名稱</v-btn
      >
      <v-btn @click="itemDialogAction">新增品項</v-btn>
    </div>
    <add-card-dialog :openDialog="openCardDialog" @closeDialog="openCardDialog = false"></add-card-dialog>
    <add-item-dialog :openDialog="openItemDialog" @closeDialog="openItemDialog = false"></add-item-dialog>
  </div>
</template>
<script>
  import AddCard from "./dialog/AddCard";
  import AddItem from "./dialog/AddItem";

  export default {
    data: () => {
      return {
        openCardDialog: false,
        openItemDialog: false,
        expanded: [],
        dessertHeaders: [
          { text: "拆帳", value: "split" },
          { text: "品項名稱", value: "name" },
          { text: "購入時間", value: "purchaseDate" },
          { text: "購入者", value: "purchaser" },
          { text: "購入金額", value: "purchasePrice" }
        ],
        desserts: [
          {
            split: true,
            name: "一堆皮卡丘",
            purchaseDate: "2021 / 04 / 21",
            purchaser: 'carol',
            purchasePrice: 500,
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
      "add-card-dialog": AddCard,
      "add-item-dialog": AddItem,
    },
    methods: {
      itemDialogAction() {
        this.openItemDialog = true;
      },
      cardDialogAction() {
        this.openCardDialog = true;
      },
    },
  };
</script>
