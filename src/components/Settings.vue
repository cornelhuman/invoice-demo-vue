<template>
  <div>
    <!-- Modal Component -->
    <b-modal id="modal1" title="Settings">
      <!--<p class="my-4">Hello from modal!</p> -->
      <input type="checkbox" id="checkbox" v-model="business.showText">
      <label for="checkbox" class="pl-2">Use Text for Company Logo</label>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Business from "@/classes/Business.ts";
import Contact from "@/classes/Contact.ts";
import Invoice from "@/classes/Invoice.ts";
import InvoiceItem from "@/classes/InvoiceItem.ts";

@Component({
  components: {}
})
export default class Settings extends Vue {
  @Prop(String) public msg!: string;

  public layoutType: string = "Standard";
  public uploadmsg: string = "Drag and Drop Logo Here";

  public business: Business = new Business();
  public contact: Contact = new Contact();
  public invoice: Invoice = new Invoice(1000, "New Invoice");

  public $refs!: {
    // fileform: HTMLFormElement;
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
