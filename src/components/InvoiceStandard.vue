<template>
  <div>
    <!--<button @click="LogDetails">Log Details</button>-->
    <div class="border container my-1 rounded invoice-border">
      <div class="p-4">
        <div class="row" style="background-color:white">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12 text-left">
                <div v-if="businessdata.showNameAsText">
                  <h1 class="pt-2">
                    <Editable
                      data-text="Business Name"
                      @blur="businessdata.name = $event"
                      :text="businessdata.name"
                    ></Editable>
                  </h1>
                </div>
                <div v-else-if="!businessdata.showNameAsText">
                  <DragDropLogo
                    :src="businessdata.logo"
                    @change="businessdata.logo = $event"
                    :msg="uploadmsg"
                    @progress="uploadmsg = $event"
                  ></DragDropLogo>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6 text-right" style="font-size:1em">
            <div class="mr-4">
              <BusinessDetails></BusinessDetails>
            </div>
          </div>
        </div>

        <div class="row text-left">
          <div class="col-md-12">
            <h2>
              <Editable
                data-text="Invoice Title"
                @blur="invoicedata.invoicetitle = $event"
                :text="invoicedata.invoicetitle"
              ></Editable>
            </h2>
          </div>
        </div>

        <div class="row" style="pl-2">
          <div class="col-6 p-3 text-left">
            <ContactDetails></ContactDetails>
          </div>

          <div class="col-6 text-right" style="pr-3">
            <div class="d-flex justify-content-end pr-4">
              <div style="margin-right:5px">Invoice Number:</div>
              <div>
                <EditableAmount
                  :digits="0"
                  data-text="1000"
                  :text="invoicedata.invoicenumber"
                  @blur="invoicedata.invoicenumber = $event"
                ></EditableAmount>
              </div>
            </div>
            <div class="d-flex justify-content-end pr-4">
              <div style="margin-right:5px">Invoice Date:</div>
              <div>
                <Editable :text="invoicedata.invoicedate" @blur="invoicedata.invoicedate = $event"></Editable>
              </div>
            </div>
          </div>
        </div>

        <hr>

        <InvoiceDetails :invoice="invoicedata" @change="invoicedata = $event"></InvoiceDetails>
        <hr>
        <p class="text-left">
          <Editable
            :multiline="true"
            data-text="Banking Details"
            @blur="businessdata.bankdetails = $event"
            :text="businessdata.bankdetails"
          ></Editable>
        </p>
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
import InvoiceDetails from "@/components/InvoiceDetails.vue";
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
    ContactDetails,
    InvoiceDetails
  }
})
export default class InvoiceStandard extends Vue {
  @Prop(String) public msg!: string;
  public layoutType: string = "Standard";
  public uploadmsg: string = "Drag and Drop Logo Here";

  // public invoice: Invoice = new Invoice(1000, "New Invoice");
  // public $refs!: {
  // fileform: HTMLFormElement;
  // };

  get businessdata(): Business {
    return this.$store.state.business;
  }

  get invoicedata(): Invoice {
    return this.$store.state.invoice;
  }

  @Watch("businessdata", { deep: true })
  public watchBusiness(val: Business) {
    //   console.log("Settting business data");
    this.$store.commit("businessupdate", val);
    // this.$emit("change", val);
  }

  @Watch("invoicedata", { deep: true })
  public watchInvoice(val: Invoice) {
    this.$store.commit("invoiceupdate", val);
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
