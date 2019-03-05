<template>
  <div>
    <Editable
      data-text="Business Address 1"
      @blur="businessdata.address1 = $event"
      :text="businessdata.address1"
    ></Editable>
    <Editable
      data-text="Business Address 2"
      @blur="businessdata.address2 = $event"
      :text="businessdata.address2"
    ></Editable>
    <Editable
      data-text="Business City"
      @blur="businessdata.city = $event"
      :text="businessdata.city"
    ></Editable>
    <Editable
      data-text="Business Country"
      @blur="businessdata.country = $event"
      :text="businessdata.country"
    ></Editable>
    <Editable data-text="Business Zip" @blur="businessdata.zip = $event" :text="businessdata.zip"></Editable>
    <Editable data-text="Business Tel" @blur="businessdata.tel = $event" :text="businessdata.tel"></Editable>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Editable from "@/components/Editable.vue"; // @ is an alias to /src
import Business from "@/classes/Business.ts";

@Component({
  components: {
    Editable
  }
})
export default class BusinessDetails extends Vue {
  get businessdata(): Business {
    return this.$store.state.business;
  }

  @Watch("businessdata", { deep: true })
  public watchBusiness(val: Business) {
    this.$store.commit("businessupdate", val);
  }
}
</script>


<style scoped>
[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
}
</style>
