<template>
  <v-container>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="(item, index) in items" :key="index">
        {{ item.text }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, index) in items" :key="index">
        <component :is="item.component"></component>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import PurchaseRecord from '../components/PurchaseRecord';
import Inventory from '../components/Inventory';
import SellRecord from '../components/SellRecord';

  export default {
      components: {
          'purchase-record': PurchaseRecord,
          'inventory': Inventory,
          'sell-record': SellRecord
      },
      data: () => {
          return {
              tab: null,
              items: [
                  { component: 'purchase-record', text: '購入紀錄' },
                  { component: 'inventory', text: '庫存' },
                  { component: 'sell-record', text: '賣出紀錄' }
                ]
          }
      }
  }
</script>
