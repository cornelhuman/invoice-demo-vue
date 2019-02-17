<template>
  <div>
    <div class="d-flex">
      <div>
        <editable
          data-text="FirstName"
          :text="contact.firstname"
          @blur="contact.firstname = $event"
        ></editable>
      </div>
      <div style="margin-left:5px">
        <editable
          data-text="LastName"
          :text="contactdata.lastname"
          @blur="contactdata.lastname = $event"
        ></editable>
      </div>
    </div>
    <div>
      <editable
        data-text="Address1"
        :text="contactdata.address1"
        @blur="contactdata.address1 = $event"
      ></editable>
    </div>
    <div>
      <editable
        data-text="Address2"
        :text="contactdata.address2"
        @blur="contactdata.address2 = $event"
      ></editable>
    </div>
    <div>
      <editable
        data-text="Suburb / City"
        :text="contactdata.city"
        @blur="contactdata.city = $event"
      ></editable>
    </div>
    <div>
      <editable data-text="Zip" :text="contactdata.zip" @blur="contactdata.zip = $event"></editable>
    </div>
    <div>
      <editable data-text="Cell / Tell" :text="contactdata.cell" @blur="contactdata.cell = $event"></editable>
    </div>
    <div>
      <editable data-text="Email" :text="contactdata.email" @blur="contactdata.email = $event"></editable>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Editable from "@/components/Editable.vue"; // @ is an alias to /src
import Contact from "@/classes/Contact.ts";

@Component({
  components: {
    Editable
  }
})
export default class ContactDetails extends Vue {
  @Prop(Contact) public contact!: Contact;

  public $refs!: {
    // fileform: HTMLFormElement;
  };

  get contactdata(): Contact {
    return this.contact;
  }

  @Watch("contactdata", { deep: true })
  public watchContact(val: Contact) {
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
