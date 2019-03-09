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
          <div class="col-3 text-right">
            <label for="checkbox" class="pl-2">Tax Name</label>
          </div>
          <div class="col-9 text-left">
            <input type="text" v-model="businessdata.taxname">
          </div>
        </div>
        <div class="row ml-3">
          <div class="col-3 text-right">
            <label for="checkbox" class="pl-2">Tax % (15)</label>
          </div>
          <div class="col-9 text-left">
            <input type="number" v-model="businessdata.taxpercentage">
          </div>
        </div>
      </template>
      <div class="row ml-3">
        <div class="col-3 text-right">
          <label class="pl-2">Currency</label>
        </div>
        <div class="col-9 text-left" style="margin-left:-10px">
          <select class="selectcontrol" ref="currency" @change="currencyChanged">
            <option
              v-bind:key="item"
              v-for="item in currencies"
              :value="item"
              :selected="item == businessdata.countrycode"
            >{{item}}</option>
          </select>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Business from "@/classes/Business.ts";
import Currency from "@/classes/Currency.ts";
@Component({
  components: {}
})
export default class Settings extends Vue {
  public $refs!: {
    currency: HTMLSelectElement;
  };

  get currencies(): any {
    return Object.keys(Currency.list);
  }

  get businessdata(): Business {
    return this.$store.state.business;
  }

  @Watch("businessdata", { deep: true })
  public watchBusiness(val: Business) {
    this.$store.commit("businessupdate", val);
  }

  public currencyChanged() {
    this.$store.commit(
      "businessupdatecurrencysymbol",
      this.$refs.currency.value
    );
  }
}
</script>

<style scoped>
.selectcontrol {
  margin-left: 10px;
}
</style>
