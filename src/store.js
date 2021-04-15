import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
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
  });

  export default store;