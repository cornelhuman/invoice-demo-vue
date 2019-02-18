<template>
  <div>
    <InvoiceNav></InvoiceNav>
    <div class="pt-5"></div>
    <div class="pt-4"></div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import InvoiceNav from "@/components/InvoiceNav.vue"; // @ is an alias to /src"

@Component({
  components: {
    InvoiceNav
  }
})
export default class App extends Vue {}
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
