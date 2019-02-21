import Vue from "vue";
import Vuex from "vuex";
import Business from "@/classes/Business.ts";
import Contact from "@/classes/Contact.ts";
import Invoice from "@/classes/Invoice.ts";
// import InvoiceItem from "@/classes/InvoiceItem.ts";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    business: Business
  },
  mutations: {
    businessupdate(state, payload) {
      state.business = payload
      localStorage["business"] = JSON.stringify(state.business);
    }

  },
  actions: {

  }
});
