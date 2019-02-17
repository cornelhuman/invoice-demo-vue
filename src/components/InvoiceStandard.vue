<template>
  <div>
    <div class="border container my-1 rounded invoice-border">
      <div class="p-4">
        <div class="row" style="background-color:white">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12">
                <DragDropLogo
                  :src="logo"
                  @change="logo = $event"
                  :msg="uploadmsg"
                  @progress="uploadmsg = $event"
                ></DragDropLogo>
              </div>
            </div>
          </div>

          <div class="col-md-6 text-right" style="font-size:1em">
            <div class="mr-4">
              <strong>$businessname$</strong>
              <br>$businessaddress1$
              <br>$businessaddress2$
              <br>$businesscity$
              <br>$businesscountry$
              <br>$businesszip$
              <br>$businessphone$
            </div>
          </div>
        </div>

        <div class="row text-left">
          <div class="col-md-12">
            <h2>$invoicetitle$</h2>
          </div>
        </div>

        <div class="row" style="background-color:white; padding-left:20px">
          <div class="col-6" style="padding:20px">$firstname$ $lastname$
            <br>$address1$
            <br>$address2$
            <br>$suburbcity$
            <br>$zip$
          </div>

          <div class="col-6 text-right" style="padding:20px">Invoice Number: $invoicenumber$
            <br>Invoice Date: $invoicedate$
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
import { Vue, Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import Editable from "@/components/Editable.vue"; // @ is an alias to /src
import EditableAmount from "@/components/EditableAmount.vue"; // @ is an alias to /src
import DragDropLogo from "@/components/DragDropLogo.vue"; // @ is an alias to /src

@Component({
  components: {
    Editable,
    EditableAmount,
    DragDropLogo,
    Invoice
  }
})
export default class Invoice extends Vue {
  @Prop(String) public msg!: string;

  public layoutType: string = "Standard";
  public uploadmsg: string = "Drag and Drop Logo Here";

  public $refs!: {
    //fileform: HTMLFormElement;
  };

  public mounted() {
    const refObj = this;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invoice-border {
  border-color: black important!;
  border-width: 2px important!;
}
</style>
