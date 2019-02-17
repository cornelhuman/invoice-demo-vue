<template>
  <div>
    <div v-if="layoutType === 'Standard'">
      <InvoiceStandard></InvoiceStandard>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InvoiceStandard from "@/components/InvoiceStandard.vue"; // @ is an alias to /src

@Component({
  components: {
    InvoiceStandard
  }
})
export default class Invoice extends Vue {
  @Prop(String) public msg!: string;

  public layoutType: string = "Standard";

  public $refs!: {
    // fileform: HTMLFormElement;
  };

  public mounted() {
    const refObj = this;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
