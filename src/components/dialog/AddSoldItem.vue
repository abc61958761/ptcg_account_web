<template>
  <v-dialog
    v-model="openDialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card style="display: flex; flex-direction: column; height: 100%">
      <v-card-title class="headline grey lighten-2">
        賣出商品登陸
      </v-card-title>

      <v-card-text
        style="flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          padding-bottom: 0;"
      >
        <div style="display: flex; align-items: center" class="mb-2">
          <v-text-field
            v-model="newSoldItems.sold.name"
            dense
            outlined
            hide-details
            label="品項命名"
            class="mr-4"
          ></v-text-field>
          <v-select
            v-model="newSoldItems.sold.sales_channel"
            hide-details
            dense
            outlined
            label="賣出通路"
            class="mr-4"
            :items="salesChannelItems"
          ></v-select>
          <v-select
            v-model="newSoldItems.sold.payee"
            hide-details
            dense
            outlined
            label="收款人"
            class="mr-4"
            :items="payeeItems"
          ></v-select>
          <v-menu
            class="mr-4"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="newSoldItems.sold.date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="newSoldItems.sold.date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="newSoldItems.sold.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(newSoldItems.sold.date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-checkbox
            label="已拆帳"
            v-model="newSoldItems.sold.split"
          ></v-checkbox>
        </div>

        <v-list
          style="height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden"
        >
          <v-list-item style="flex: 0">
            <v-list-item-content>
              <v-list-item-title>商品名稱</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>購買價格（單張）</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>數量</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>小計</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="addSoldItemAction">
                <v-icon color="grey lighten-1">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <div style="overflow: auto; height: 100%">
            <v-list-item
              v-for="(item, index) of newSoldItems.soldRecords"
              :key="index"
            >
              <v-list-item-content class="pr-2">
                <v-autocomplete
                  v-model="item.pokemon_id"
                  :items="pokemons"
                  hide-no-data
                  hide-selected
                  item-text="name"
                  item-value="id"
                ></v-autocomplete>
              </v-list-item-content>
              <v-list-item-content class="pr-2 pl-2">
                <v-text-field
                  v-model="item.price"
                  prefix="$"
                  step="5"
                  min="0"
                  type="number"
                ></v-text-field>
              </v-list-item-content>
              <v-list-item-content class="pr-2 pl-2">
                <v-text-field
                  v-model="item.count"
                  min="0"
                  type="number"
                ></v-text-field>
              </v-list-item-content>
              <v-list-item-content class="pr-2 pl-2">
                {{ item.price * item.count }}
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  :disabled="newSoldItems.soldRecords.length < 2"
                  @click="removeItem(index)"
                >
                  <v-icon color="grey lighten-1">mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </div>
        </v-list>
      </v-card-text>

      <v-card-text style="display: flex">
        <span>總計</span>
        <v-spacer></v-spacer>
        <span>
          <span class="mr-10">{{ total.count }} 張</span>
          <span>共 {{ total.price }}</span>
        </span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="clearData">
          重置
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialogAction">
          取消
        </v-btn>
        <v-btn color="primary" @click="submitAction">
          登錄
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    props: ["openDialog"],
    data: () => {
      return {
        menu: false,
        newSoldItems: {
          sold: {
            name: "",
            payee: "",
            sales_channel: "",
            date: new Date().toISOString().substr(0, 10),
            split: false,
          },
          soldRecords: [
            {
              pokemon_id: "",
              price: 0,
              count: 0,
              split: false,
            },
          ],
        },
        payeeItems: ["Carol", "Chad"],
        salesChannelItems: ["轉交", "蝦皮"],
      };
    },
    computed: {
      ...mapGetters({
        pokemons: "pokemons",
      }),
      total() {
        let result = {
          price: 0,
          count: 0,
        };
        for (const item of this.newSoldItems.soldRecords) {
          result.price += item.price * item.count;
          result.count += parseInt(item.count);
        }
        return result;
      },
    },
    methods: {
      closeDialogAction() {
        this.$emit("closeDialog");
        this.clearData();
      },
      addSoldItemAction() {
        this.newSoldItems.soldRecords.push({
          pokemon_id: "",
          price: 0,
          count: 0,
          split: false,
        });
      },
      async submitAction() {
        if (!this.newSoldItems.sold.name) return;
        if (!this.newSoldItems.sold.payee) return;

        for (const item of this.newSoldItems.soldRecords) {
          if (item.count <= 0) return;
          if (!item.pokemon_id) return;
          item.split = this.newSoldItems.sold.split;
        }

        await this.$store.dispatch("createSoldRecord", this.newSoldItems);

        this.closeDialogAction();
      },
      clearData() {
        this.newSoldItems.sold = {
          name: "",
          payee: "",
          sales_channel: "",
          date: new Date().toISOString().substr(0, 10),
        };
        this.newSoldItems.soldRecords = [
          { pokemon_id: "", price: 0, count: 0 },
        ];
      },
      removeItem(index) {
        this.newSoldItems.soldRecords.splice(index, 1);
      },
    },
    async mounted() {
      await this.$store.dispatch("queryPokemons");
    },
  };
</script>
