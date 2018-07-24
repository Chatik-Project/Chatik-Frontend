import Vuex from 'vuex';
import Vue from "vue";
import chat from './modules/Chat.js';
Vue.use(Vuex);
export const store = new Vuex.Store({
    modules: {
        chat
    }
});