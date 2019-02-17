<template>
  <div>
    <button @click="LogDetails">Log Details</button>
    <div class="border container my-1 rounded invoice-border">
      <div class="p-4">
        <div class="row" style="background-color:white">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
                <DragDropLogo
                  :src="business.logo"
                  @change="business.logo = $event"
                  :msg="uploadmsg"
                  @progress="uploadmsg = $event"
                ></DragDropLogo>
              </div>
            </div>
          </div>

          <div class="col-md-6 text-right" style="font-size:1em">
            <div class="mr-4">
              <BusinessDetails :business="business" @change="business = $event"></BusinessDetails>
            </div>
          </div>
        </div>

        <div class="row text-left">
          <div class="col-md-12">
            <h2>
              <Editable
                data-text="Invoice Title"
                @blur="invoice.invoicetitle = $event"
                :text="invoice.invoicetitle"
              ></Editable>
            </h2>
          </div>
        </div>

        <div class="row" style="pl-2">
          <div class="col-6 p-3 text-left">
            <ContactDetails :contact="contact" @change="contact = $event"></ContactDetails>
          </div>

          <div class="col-6 text-right" style="pr-3">
            <!--
            <div class="d-flex justify-content-end pr-4">
              <div style="margin-right:5px">Invoice Number:</div>
              <div>
                <editable
                  data-text="1000"
                  :text="invoice.invoicenumber"
                  @blur="invoice.invoicenumber = $event"
                ></editable>
              </div>
            </div>
            <div class="d-flex justify-content-end pr-4">
              <div style="margin-right:5px">Invoice Date:</div>
              <div>
                <editable :text="invoice.invoicedate" @blur="invoice.invoicedate = $event"></editable>
              </div>
            </div>-->
          </div>
        </div>

        <hr>
        <div class="row" style="margin-bottom:15px">
          <strong>Invoice Details</strong>
        </div>

        <p>$invoicedetails$</p>

        <hr>
        <p>$bankdetails$</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Editable from "@/components/Editable.vue";
import EditableAmount from "@/components/EditableAmount.vue";
import DragDropLogo from "@/components/DragDropLogo.vue";
import BusinessDetails from "@/components/BusinessDetails.vue";
import ContactDetails from "@/components/ContactDetails.vue";
import { State, Action, Getter } from "vuex-class";
import Business from "@/classes/Business.ts";
import Contact from "@/classes/Contact.ts";
import Invoice from "@/classes/Invoice.ts";
import InvoiceItem from "@/classes/InvoiceItem.ts";

@Component({
  components: {
    Editable,
    EditableAmount,
    DragDropLogo,
    BusinessDetails,
    ContactDetails
  }
})
export default class InvoiceStandard extends Vue {
  @Prop(String) public msg!: string;

  public layoutType: string = "Standard";
  public uploadmsg: string = "Drag and Drop Logo Here";

  public business: Business = new Business();

  public contact: Contact = new Contact();
  public invoice: Invoice | null = null;

  public $refs!: {
    // fileform: HTMLFormElement;
  };

  public LogDetails() {
    console.log(this.business);
  }

  public created() {
    this.business.invoicenumber = 1000;
    this.invoice = new Invoice(
      this.business.invoicenumber,
      "Invoice for hardware and software"
    );
    this.invoice.addItem("Hardware", "Dell XPS 17 Laptop", 1, 2300);
    this.invoice.addItem("Software", "Windows 10 Profesional", 2, 450.45);
  }

  public mounted() {
    const refObj = this;
    // console.log(this.logo);
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
