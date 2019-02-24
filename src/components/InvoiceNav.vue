<template>
  <nav class="fixed-top navbar navbar-expand-lg navbar-light bg-primary">
    <div style="position:absolute">
      <div
        class="text-white nav-link"
        style="font-size:1.5em;font-weight:bold"
      >Demo Invoice App (Vue.js)</div>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav navbar-nav navbar-logo mx-auto">
        <li class="nav-item"></li>
      </ul>

      <div class="form-inline my-2 my-lg-0">
        <a
          class="nav-link text-white"
          style="font-size:1.5em;font-weight:bold"
          href="http://www.cornelhuman.com"
        >CORNEL HUMAN</a>
        <button
          class="btn my-2 my-sm-0 text-white"
          style="font-size:20pt"
          type="button"
          v-b-modal.modal1
        >
          <font-awesome-icon icon="cog"/>
        </button>
        <b-button v-b-toggle.collapse1 variant="primary" style="font-size:20pt">
          <font-awesome-icon icon="question"/>
        </b-button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class InvoiceNav extends Vue {}
</script>