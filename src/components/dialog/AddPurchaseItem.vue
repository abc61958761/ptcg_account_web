<template>
  <v-dialog
    v-model="openDialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card class="d-flex flex-column" style="height: 100%">
      <v-card-title class="headline grey lighten-2">
        購買商品登錄
      </v-card-title>

      <!-- <v-container> -->
      <v-card-text
        class="d-flex flex-column"
        style="flex: 1;
          height: 100%;
          overflow: hidden;
          padding-bottom: 0;"
      >
        <div style="display: flex; align-items: center" class="mb-2">
          <v-text-field
            v-model="newPurchaseItems.purchase.name"
            dense
            outlined
            hide-details
            label="品項命名"
            class="mr-4"
          ></v-text-field>
          <v-select
            v-model="newPurchaseItems.purchase.purchaser"
            hide-details
            dense
            outlined
            label="購買人"
            class="mr-4"
            :items="purchaserItems"
          ></v-select>
          <v-menu
            class="mr-4"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="newPurchaseItems.purchase.date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="newPurchaseItems.purchase.date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="newPurchaseItems.purchase.date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(newPurchaseItems.purchase.date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>

          <v-checkbox
            label="已拆帳"
            v-model="newPurchaseItems.purchase.split"
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
              <v-btn icon @click="addPurchaseItemAction">
                <v-icon color="grey lighten-1">mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <div style="overflow: auto; height: 100%">
            <v-list-item
              v-for="(item, index) of newPurchaseItems.purchaseRecords"
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
                  @click="removeItem(index)"
                  :disabled="newPurchaseItems.purchaseRecords.length < 2"
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
        <v-btn
          color="primary"
          @click="submitAction"
          :loading="loading"
          :disabled="loading"
        >
          登錄
          <template v-slot:loader>
            <span>大便去...</span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar" timeout="3000" color="error">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          關閉
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    props: ["openDialog"],
    data: () => {
      return {
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        snackbar: false,
        loading: false,
        message: null,
        newPurchaseItems: {
          purchase: {
            name: "",
            purchaser: "",
            date: new Date().toISOString().substr(0, 10),
            split: false,
          },
          purchaseRecords: [
            {
              pokemon_id: "",
              price: 0,
              count: 0,
              split: false,
            },
          ],
        },
        purchaserItems: ["Carol", "Chad"],
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
        for (const item of this.newPurchaseItems.purchaseRecords) {
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
      addPurchaseItemAction() {
        this.newPurchaseItems.purchaseRecords.push({
          pokemon_id: "",
          price: 0,
          count: 0,
          split: false,
        });
      },
      async submitAction() {
        if (!this.newPurchaseItems.purchase.name) {
          this.snackbar = true;
          this.message = "品項名稱未填寫";
          return;
        }
        if (!this.newPurchaseItems.purchase.purchaser) {
          this.snackbar = true;
          this.message = "購買人未填寫";
          return;
        }

        for (const item of this.newPurchaseItems.purchaseRecords) {
          if (item.count <= 0) {
            this.snackbar = true;
            this.message = "商品數量未填寫";
            return;
          }
          if (!item.pokemon_id) {
            this.snackbar = true;
            this.message = "未選擇商品";
            return;
          }

          item.split = this.newPurchaseItems.purchase.split;
        }

        const response = await this.$store.dispatch(
          "createPurchaseRecord",
          this.newPurchaseItems
        );

        if (response.status === 201) {
          this.closeDialogAction();
        } else {
          this.snackbar = true;
          this.message = "新增品項失敗";
        }
      },
      clearData() {
        this.newPurchaseItems.purchase = {
          name: "",
          purchaser: "",
          sales_channel: "",
          date: new Date().toISOString().substr(0, 10),
        };
        this.newPurchaseItems.purchaseRecords = [
          { pokemon_id: "", price: 0, count: 0 },
        ];
      },
      removeItem(index) {
        this.newPurchaseItems.purchaseRecords.splice(index, 1);
      },
    },
    async mounted() {
      await this.$store.dispatch("queryPokemons");
    },
  };
</script>
