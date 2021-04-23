import axios from "axios";

const faceMask = {
    state: {
      count: 0,
      faceMasks: []
    },
    mutations: {
      increment(state) {
        state.count++;
      },
      updateFaceMasks(state, payload) {
        state.faceMasks.push(...payload);
      }
    },
    actions: {
      async queryFaceMasks({ commit }) {
        const response = await axios('https://findmasks.herokuapp.com/places');
        const faceMasks = response.data.features.slice(0, 10);
  
        commit('updateFaceMasks', faceMasks)
      },
      
    },
    getters: {
      faceMasks(state) {
        return state.faceMasks;
      }
    }
  };

  export default faceMask;
