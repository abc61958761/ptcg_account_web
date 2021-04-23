
  import Vue from 'vue';
import Vuex from 'vuex';

import faceMask from './modules/faceMask';
import account from './modules/account';

Vue.use(Vuex);

/**
 * CreateStore - Function to create store.
 *
 * @returns {Object}  Description.
 */
export function createStore() {
  return new Vuex.Store({
    modules: {
      account,
      faceMask
    }
  });
}
