<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2 class="d-flex align-center">
        記帳系統
      </h2>

      <v-spacer></v-spacer>

      <v-btn class="mr-2" text to="/purchase-record">
        購入紀錄
      </v-btn>
      <v-btn class="mr-2" text to="/inventory"> 庫存 </v-btn>
      <v-btn class="mr-2" text to="/sold-record">
        賣出紀錄
      </v-btn>
      <v-btn text to="/settlement-recrod">
        結算紀錄
      </v-btn>
    </v-app-bar>

    <v-main
      class="d-flex flex-column"
      style="height: 100vh;
        overflow: hidden;"
    >
      <v-container
        d-flex
        flex-column
        style="height: 100%;
        overflow: hidden;"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data: () => ({
      //
    }),
  };
</script>
<style lang="scss">
  .v-main .v-main__wrap {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  .v-data-table > .v-data-table__wrapper {
    display: flex !important;
    flex: 1 !important;
    overflow: auto;
    tbody {
      tr.v-data-table__expanded__content {
        box-shadow: 0 0 !important;
        background: rgba(0, 0, 0, 0.1) !important;
        font-size: 0.875rem !important;
      }
    }
  }
  table {
    tr:not(.v-data-table__expanded__content) td:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .v-input.v-input--selection-controls {
      margin-top: 0;
      padding-top: 0;
    }
  }

  .add-item {
    .v-input {
      margin-top: 0;
    }
  }
</style>
