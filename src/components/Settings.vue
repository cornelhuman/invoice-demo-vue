<template>
  <div>
    <b-modal id="modal1" title="Settings">
      <div class="row ml-3">
        <input type="checkbox" v-model="businessdata.showNameAsText">
        <label for="checkbox" class="pl-2">Use Text for Company Logo</label>
      </div>
      <div class="row ml-3">
        <input type="checkbox" v-model="businessdata.addtax">
        <label for="checkbox" class="pl-2">Add Tax</label>
      </div>
      <template v-if="businessdata.addtax">
        <div class="row ml-3">
          <div class="col-6 text-right">
            <label for="checkbox" class="pl-2">Tax Name</label>
          </div>
          <div class="col-6">
            <input type="text" v-model="businessdata.taxname">
          </div>
        </div>
        <div class="row ml-3">
          <div class="col-6 text-right">
            <label for="checkbox" class="pl-2">Tax Percentage (15)</label>
          </div>
          <div class="col-6">
            <input type="number" v-model="businessdata.taxpercentage">
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Business from "@/classes/Business.ts";

@Component({
  components: {}
})
export default class Settings extends Vue {
  get businessdata(): Business {
    return this.$store.state.business;
  }

  @Watch("businessdata", { deep: true })
  public watchBusiness(val: Business) {
    this.$store.commit("businessupdate", val);
  }
}
</script>
