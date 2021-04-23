import appserver from "./appserve";

const API_URL = "/accounts";

const accounts = {
  async queryPurchaseRecords() {
    return await appserver.get(`${API_URL}/purchaseRecords`);
  },
  async createPurchaseRecord(params) {
    return await appserver.post(`${API_URL}/purchaseRecord`, params);
  },
  async createPokemon(params) {
    return await appserver.post(`${API_URL}/pokemon`, params);
  },
  async queryPokemons(params) {
    return await appserver.get(`${API_URL}/pokemons`, { params });
  },
  async queryInventories() {
    return await appserver.get(`${API_URL}/inventories`);
  },
  async querySoldRecords() {
    return await appserver.get(`${API_URL}/soldRecords`);
  },
  async createSoldRecord(params) {
    return await appserver.post(`${API_URL}/soldRecord`, params);
  },
  async updatePokemon(id, params) {
    return await appserver.post(`${API_URL}/pokemon/${id}`, params);
  },
  async deletePurchaseRecords(data) {
    return await appserver.delete(`${API_URL}/purchaseRecords`, { data });
  },
  async deleteSoldRecords(data) {
    
    return await appserver.delete(`${API_URL}/soldRecords`, { data });
  },
};

export default accounts;
