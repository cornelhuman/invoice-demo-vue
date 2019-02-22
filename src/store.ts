import Vue from "vue";
import Vuex from "vuex";
import Business from "@/classes/Business.ts";
import Contact from "@/classes/Contact.ts";
import Invoice from "@/classes/Invoice.ts";
// import InvoiceItem from "@/classes/InvoiceItem.ts";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    business: Business,
    contact: Contact,
    invoice: Invoice
  },
  mutations: {
    businessupdate(state, payload) {
      state.business = payload;
      localStorage.business = JSON.stringify(state.business);
    },
    contactupdate(state, payload) {
      state.contact = payload;
      localStorage.contact = JSON.stringify(state.contact);
    },
    invoiceupdate(state, payload) {
      state.invoice = payload;
      localStorage.invoice = JSON.stringify(state.invoice);
    }

  },
  actions: {

  }
});
