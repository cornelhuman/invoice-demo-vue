import Vue from "vue";
import Vuex from "vuex";
import Business from "@/classes/Business.ts";
import Contact from "@/classes/Contact.ts";
import Invoice from "@/classes/Invoice.ts";
import Currency from "@/classes/Currency.ts";
import InvoiceItem from "@/classes/InvoiceItem.ts";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    business: new Business(),
    contact: new Contact(),
    invoice: new Invoice()
  },
  mutations: {
    loadContactData(state, payload) {
      if (localStorage.contact) {
        state.contact = JSON.parse(localStorage.contact);
      }
    },
    loadBusinessData(state, payload) {
      if (localStorage.business) {
        state.business = JSON.parse(localStorage.business);
      }
    },
    loadInvoiceData(state, payload) {
      if (localStorage.invoice) {
        state.invoice = JSON.parse(localStorage.invoice);
      }
    },
    businessupdatecurrencysymbol(state, payload) {
      state.business.countrycode = payload;
      state.business.currencysymbol = Currency.list[payload].symbol;
      localStorage.business = JSON.stringify(state.business);
    },
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
    },
    invoiceToggleHelp(state) {
      state.business.showhelp = !state.business.showhelp;
      localStorage.business = JSON.stringify(state.business);
    },
    addInvoiceRow(state) {
      let maxId = 1;
      if (state.invoice.items.length > 0) {
        state.invoice.items.forEach(item => {
          if (item.id > maxId) {
            maxId = item.id;
          }
        });
      }

      const row = new InvoiceItem();
      row.id = maxId + 1;
      row.category = "";
      row.description = "";
      row.quantity = 1;
      row.price = 0;
      row.total = 0;
      state.invoice.items.push(row);
      console.log("Added a row");
    },
    removeRow(state, payload) {

      const pos = state.invoice.items.findIndex(
        (item: InvoiceItem) => item.id === payload
      );

      state.invoice.items.splice(pos, 1);
      console.log("Removed a row from the invoice");
    },
    Calculate(state) {
      state.invoice.subtotal = 0;
      state.invoice.items.forEach(item => {
        item.total = item.quantity * item.price;
        state.invoice.subtotal += item.total;
      });
      if (state.business.taxpercentage > 0) {
        state.invoice.tax = (state.invoice.subtotal * state.business.taxpercentage) / 100;
        state.invoice.total = state.invoice.subtotal + state.invoice.tax;
      } else {
        state.invoice.tax = 0;
        state.invoice.total = state.invoice.subtotal;
      }
      console.log("Calculated Totals");
    }
  },
  actions: {

  }
});
