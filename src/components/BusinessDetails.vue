<template>
  <div>
    <Editable
      data-text="Business Name"
      @blur="businessdata.name = $event"
      :text="businessdata.name"
    ></Editable>
    <Editable
      data-text="Business Address 1"
      @blur="business.address1 = $event"
      :text="business.address1"
    ></Editable>
    <Editable
      data-text="Business Address 2"
      @blur="business.address2 = $event"
      :text="business.address2"
    ></Editable>
    <Editable data-text="Business City" @blur="business.city = $event" :text="business.city"></Editable>
    <Editable
      data-text="Business Country"
      @blur="business.country = $event"
      :text="business.country"
    ></Editable>
    <Editable data-text="Business Zip" @blur="business.zip = $event" :text="business.zip"></Editable>
    <Editable data-text="Business Tel" @blur="business.tel = $event" :text="business.tel"></Editable>
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
  @Prop(Business) public business!: Business;

  public $refs!: {
    // fileform: HTMLFormElement;
  };

  get businessdata(): Business {
    return this.business;
  }

  @Watch("businessdata", { deep: true })
  public watchBusiness(val: Business) {
    this.$emit("change", val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invoice-border {
  border-color: black important!;
  border-width: 2px important!;
}

[contentEditable="true"]:empty:not(:focus):before {
  content: attr(data-text);
}
</style>
