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
        <editable data-text="LastName" :text="contact.lastname" @blur="contact.lastname = $event"></editable>
      </div>
    </div>
    <div>
      <editable data-text="Address1" :text="contact.address1" @blur="contact.address1 = $event"></editable>
    </div>
    <div>
      <editable data-text="Address2" :text="contact.address2" @blur="contact.address2 = $event"></editable>
    </div>
    <div>
      <editable data-text="Suburb / City" :text="contact.city" @blur="contact.city = $event"></editable>
    </div>
    <div>
      <editable data-text="Zip" :text="contact.zip" @blur="contact.zip = $event"></editable>
    </div>
    <div>
      <editable data-text="Cell / Tell" :text="contact.cell" @blur="contact.cell = $event"></editable>
    </div>
    <div>
      <editable data-text="Email" :text="contact.email" @blur="contact.email = $event"></editable>
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
