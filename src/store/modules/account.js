import accounts from "../../api/account";

const account = {
  state: {
    purchaseRecords: [],
    inventories: [],
    soldRecords: [],
    pokemons: [],
    settlements: [],
    settlementDetail: {},
  },
  mutations: {
    updatePurchaseRecords(state, payload) {
      state.purchaseRecords = payload;
    },
    updateInventories(state, payload) {
      state.inventories = payload;
    },
    updateSoldRecords(state, payload) {
      state.soldRecords = payload;
    },
    updatePokemons(state, payload) {
      state.pokemons = payload;
    },
    updateSettlements(state, payload) {
      state.settlements = payload;
    },
    updateSettlementDetail(state, payload) {
      state.settlementDetail = payload;
    },
  },
  actions: {
    async queryPurchaseRecords({ commit }) {
      const response = await accounts.queryPurchaseRecords();

      commit(
        "updatePurchaseRecords",
        response.data.data.map((item) => {
          return { ...item, isDelete: false };
        })
      );
    },
    async queryInventories({ commit }, params) {
      const response = await accounts.queryInventories(params);

      commit(
        "updateInventories",
        response.data.data.map((item) => {
          item.pokemon = {
            ...item.pokemon,
            isEdit: false,
          };
          return item;
        })
      );
    },
    async querySoldRecords({ commit }) {
      const response = await accounts.querySoldRecords();

      commit(
        "updateSoldRecords",
        response.data.data.map((item) => {
          return { ...item, isDelete: false };
        })
      );
    },
    async queryPokemons({ commit }, params) {
      const response = await accounts.queryPokemons(params);

      commit("updatePokemons", response.data.data);
    },
    async createPokemon({ dispatch }, newPokemon) {
      await accounts.createPokemon(newPokemon);
      await dispatch("queryInventories");
    },
    async createPokemons({ dispatch }, params) {
      const response = await accounts.createPokemons(params.newPokemons);
      await dispatch("queryInventories", { name: params.name });

      return response;
    },
    async updatePokemon({ dispatch }, params) {
      await accounts.updatePokemon(params.id, params);
      await dispatch("queryInventories", { name: params.searchPokemon });
    },
    async createPurchaseRecord({ dispatch }, newPurchaseRecord) {
      const response = await accounts.createPurchaseRecord(newPurchaseRecord);
      await dispatch("queryPurchaseRecords");
      // await dispatch("queryInventories");

      return response;
    },
    async createSoldRecord({ dispatch }, newSoldRecord) {
      const response = await accounts.createSoldRecord(newSoldRecord);
      await dispatch("querySoldRecords");
      // await dispatch("queryInventories");

      return response;
    },
    async deletePurchaseRecords({ dispatch }, deletePurchaseRecordIds) {
      await accounts.deletePurchaseRecords(deletePurchaseRecordIds);
      await dispatch("queryPurchaseRecords");
      await dispatch("queryInventories");
    },
    async deleteSoldRecords({ dispatch }, deleteSoldRecordIds) {
      await accounts.deleteSoldRecords(deleteSoldRecordIds);
      await dispatch("querySoldRecords");
      await dispatch("queryInventories");
    },
    async updateSettlement({ dispatch }, params) {
      await accounts.updateSettlement(params);
      await dispatch("querySettlements");
    },
    async querySettlements({ commit }) {
      const unsettlementRes = await accounts.queryUnSettlements();
      const settlementsRes = await accounts.querySettlements();

      const unsettlements = Object.values(unsettlementRes.data.data).map(
        (item) => {
          return {
            ...item,
            status: "unsettlement",
          };
        }
      );
      const settlements = settlementsRes.data.data.map((item) => {
        return {
          year: item.year,
          month: item.month,
          status: "settlemented",
          purchase: item.carol_purchase_price + item.chad_purchase_price,
          sold: item.carol_sold_price + item.chad_sold_price,
        };
      });

      commit("updateSettlements", [...unsettlements, ...settlements]);
    },
    async getSettlementDetail({ commit }, params) {
      const response = await accounts.getSettlementDetail(params);

      commit("updateSettlementDetail", response.data);
    },
    async splitSold({ dispatch }, { year, month, id }) {
      await accounts.splitSold(id);
      await dispatch("getSettlementDetail", { year, month });
    },
    async splitPurchase({ dispatch }, { year, month, id }) {
      await accounts.splitPurchase(id);
      await dispatch("getSettlementDetail", { year, month });
    },
    async splitSolds({ dispatch }, date) {
      await accounts.splitSolds(date);
      await dispatch("getSettlementDetail", date);
    },
    async splitPurchases({ dispatch }, date) {
      await accounts.splitPurchases(date);
      await dispatch("getSettlementDetail", date);
    },
  },
  getters: {
    purchaseRecords(state) {
      return state.purchaseRecords;
    },
    inventories(state) {
      return state.inventories;
    },
    soldRecords(state) {
      return state.soldRecords;
    },
    pokemons(state) {
      return state.pokemons;
    },
    settlements(state) {
      return state.settlements;
    },
    settlementDetail(state) {
      return state.settlementDetail;
    },
  },
};

export default account;
