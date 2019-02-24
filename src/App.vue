<template>
  <div>
    <InvoiceNav></InvoiceNav>
    <div class="pt-4 mt-3"></div>
    <div class="pt-2 mt-2"></div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import InvoiceNav from "@/components/InvoiceNav.vue"; // @ is an alias to /src"
import Business from "@/classes/Business.ts";
import Invoice from "@/classes/Invoice.ts";
import Contact from "@/classes/Contact.ts";

@Component({
  components: {
    InvoiceNav
  }
})
export default class App extends Vue {
  public beforeCreate() {
    let businessdata = new Business();
    let contactdata = new Contact();
    let invoicedata = new Invoice(100, "NEW INVOICE");

    if (localStorage.business) {
      businessdata = JSON.parse(localStorage.business);
    }

    if (localStorage.contact) {
      let res: Contact = JSON.parse(localStorage.contact);
      contactdata = res;
    }

    if (localStorage.invoice) {
      let res: Invoice = JSON.parse(localStorage.invoice);
      invoicedata = res;
    }

    this.$store.commit("businessupdate", businessdata);
    this.$store.commit("contactupdate", contactdata);
    this.$store.commit("invoiceupdate", invoicedata);
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
