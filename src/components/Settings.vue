<template>
  <div>
    <!-- Modal Component -->
    <b-modal id="modal1" title="Settings">
      <!--<p class="my-4">Hello from modal!</p> -->
      <input type="checkbox" id="checkbox" v-model="businessdata.showNameAsText">
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
  public $refs!: {
    // fileform: HTMLFormElement;
  };

  get businessdata(): Business {
    return this.$store.state.business;
  }

  @Watch("businessdata", { deep: true })
  public watchBusiness(val: Business) {
    this.$store.commit("businessupdate", val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
