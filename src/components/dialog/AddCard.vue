<template>
  <v-dialog
    v-model="openDialog"
    transition="dialog-bottom-transition"
    fullscreen
  >
    <v-card>
      <v-card-title class="headline grey lighten-2">
        卡片登錄
      </v-card-title>

      <v-card-text class="mt-4">
        <div style="display: flex; align-items: center" class="mb-2">
          <v-text-field
            dense
            outlined
            hide-details
            label="品項命名"
            class="mr-4"
          ></v-text-field>
          <v-btn>新增</v-btn>
        </div>
        <v-subheader>
          卡片名稱
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-magnify</v-icon>
          </v-btn>
        </v-subheader>

        <v-divider></v-divider>
        <v-list dense class="pa-0">
          <v-list-item
            v-for="(item, index) of items"
            dense
            :key="index"
            style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <v-btn icon class="ml-3">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions style="position: fixed; bottom: 0px; right: 0px;">
        <v-spacer></v-spacer>
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
        items: [
          { name: "皮卡丘&捷克羅姆GX-SC2b-E" },
          { name: "皮卡丘&捷克羅姆GX-SC2b-E" },
          { name: "皮卡丘&捷克羅姆GX-SC2b-E" },
        ],
      };
    },
    methods: {
      closeDialogAction() {
        this.$emit("closeDialog");
      },
    },
  };
</script>
