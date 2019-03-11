<template>
  <div class="home text-center" ondrop="return false;">
    <div class="pb-3" style="background-color:#6bb3ff">
      <b-collapse id="collapse1" :visible="businessdata.showhelp" class="mt-2">
        <div class="container">
          <div class="row text-left">
            <div class="col-8 pt-4">
              <h2>Free Invoice Generator</h2>
              <p class="card-text">
                <i>
                  Use the Invoice template below to customize your invoice. You do not have to register to use the Invoice Generator.
                  Click on any of the text to start Editing. Drag and drop your logo in the logo block. What you see is what you send to your client as a PDF
                </i>
                <b-button
                  class="ml-4"
                  v-b-toggle.collapse1
                  variant="warning"
                  @click="invoiceToggleHelp"
                >Ok</b-button>
              </p>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
    <Invoice></Invoice>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import Invoice from "@/components/Invoice.vue"; // @ is an alias to /src
import Business from "@/classes/Business.ts";

@Component({
  components: {
    Invoice
  }
})
export default class Home extends Vue {
  get businessdata(): Business {
    return this.$store.state.business;
  }

  public invoiceToggleHelp() {
    this.$store.commit("invoiceToggleHelp");
  }
}
</script>
