<template>
  <v-dialog
    v-model="openDialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card>
      <v-card-title class="headline grey lighten-2">
        賣出商品登陸
      </v-card-title>

      <v-card-text>
        <div style="display: flex; align-items: center" class="mb-2">
          <v-text-field
            dense
            outlined
            hide-details
            label="品項命名"
            class="mr-4"
          ></v-text-field>
          <v-select
            hide-details
            dense
            outlined
            label="購買人"
            class="mr-4"
          ></v-select>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>

        <v-list>
          <v-list-item>
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
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <div>
            <v-list-item v-for="(item, index) of 20" :key="index">
              <v-list-item-content>
                <v-select hide-details dense outlined class="mr-4"></v-select>
              </v-list-item-content>
              <v-list-item-content>
                123
              </v-list-item-content>
              <v-list-item-content>
                123
              </v-list-item-content>
              <v-list-item-content>
                123
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </div>
        </v-list>
      </v-card-text>
      
      <v-card-text>
          <span>總計</span>
          <v-spacer></v-spacer>
          <span>2 張  共 40 </span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="closeDialogAction">
          重置
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="closeDialogAction">
          取消
        </v-btn>
        <v-btn color="primary" @click="closeDialogAction">
          關閉
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: ["openDialog"],
    data: () => {
      return {
        date: new Date().toISOString().substr(0, 10),
        menu: false,
      };
    },
    methods: {
      closeDialogAction() {
        this.$emit("closeDialog");
      },
    },
  };
</script>
