import accounts from "../../api/account";

const account = {
  state: {
    purchaseRecords: [],
    inventories: [],
    soldRecords: [],
    pokemons: [],
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
    async queryInventories({ commit }) {
      const response = await accounts.queryInventories();

      commit("updateInventories", response.data.data);
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

      commit(
        "updatePokemons",
        response.data.data.map((pokemon) => {
          return { ...pokemon, isEdit: false };
        })
      );
    },
    async createPokemon({ dispatch }, newPokemon) {
      await accounts.createPokemon(newPokemon);
      await dispatch("queryPokemons");
      await dispatch("queryInventories");
    },
    async updatePokemon({ dispatch }, params) {
      await accounts.updatePokemon(params.id, params);
      await dispatch("queryPokemons");
    },
    async createPurchaseRecord({ dispatch }, newPurchaseRecord) {
      await accounts.createPurchaseRecord(newPurchaseRecord);
      await dispatch("queryPurchaseRecords");
      await dispatch("queryInventories");
    },
    async createSoldRecord({ dispatch }, newSoldRecord) {
      await accounts.createSoldRecord(newSoldRecord);
      await dispatch("querySoldRecords");
      await dispatch("queryInventories");
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
  },
};

export default account;
