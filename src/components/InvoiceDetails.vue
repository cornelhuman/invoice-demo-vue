<template>
  <div>
    <div class="row font-weight-bold border-bottom pb-2 mb-2 text-left">
      <div class="col-2">Category</div>
      <div class="col-4">Description</div>
      <div class="col-3">Quantity x Price</div>
      <div class="col-2 text-right">Total</div>
    </div>
    <div class="row text-left" v-bind:key="item.id" v-for="(item,index) in invoicedata.items">
      <div class="col-2">
        <Editable data-text="Category of Item" @blur="item.category = $event" :text="item.category"></Editable>
      </div>
      <div class="col-4">
        <Editable
          data-text="Descrition on Service or Goods"
          :text="item.description"
          @blur="item.description = $event"
        ></Editable>
      </div>
      <div class="col-3">
        <div class="row">
          <div class="col-4 quantity">
            <EditableAmount
              data-text="Quantiry"
              :amount="item.quantity"
              @blur="item.quantity = $event"
            ></EditableAmount>
          </div>
          <div class="col-8 price">
            <EditableAmount
              data-text="Price"
              :amount="parseFloat(item.price.toFixed(2))"
              @blur="item.price = $event"
            ></EditableAmount>
          </div>
        </div>
      </div>
      <div class="col-2 text-right price">{{item.total.toFixed(2)}}</div>
      <div class="col-1 text-right" v-if="showEditElements">
        <span @click="removeRow(index)">
          <i class="fas fa-times pt-1" style="font-size: 18px;color:gray"></i>
        </span>
      </div>
    </div>
    <!-- 
                Add New Line Button
    -->
    <div class="row font-weight-bold border-bottom pb-2 mb-2" v-if="showEditElements">
      <div class="col-6">
        <span
          @click="addInvoiceRow"
          class="text-primary"
          style="font-size:18pt;outline: none;margin-top:2px;"
        >
          <i class="fas fa-plus-circle"></i>
        </span>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-2"></div>
      <div class="col-4"></div>
      <div class="col-1"></div>
      <div class="col-4">
        <div class="row">
          <div class="col-8 text-right font-weight-bold">Sub Total</div>
          <div class="col-4 font-weight-bold text-right price">{{invoicedata.subtotal.toFixed(2)}}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-4"></div>
      <div class="col-1"></div>
      <div class="col-4">
        <div class="row">
          <div class="col-8 text-right font-weight-bold">Tax</div>
          <div class="col-4 font-weight-bold text-right price">{{invoicedata.tax.toFixed(2)}}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-4"></div>
      <div class="col-1"></div>
      <div class="col-4">
        <div class="row">
          <div class="col-8 text-right font-weight-bold">Total</div>
          <div class="col-4 font-weight-bold text-right price">{{invoicedata.total.toFixed(2)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Editable from "@/components/Editable.vue"; // @ is an alias to /src
import EditableAmount from "@/components/EditableAmount.vue"; // @ is an alias to /src
import Invoice from "@/classes/Invoice.ts";
import InvoiceItem from "@/classes/InvoiceItem.ts";

@Component({
  components: {
    Editable,
    EditableAmount
  }
})
export default class InvoiceDetails extends Vue {
  @Prop(Invoice) public invoice!: Invoice;

  public showEditElements: boolean = true;
  public $refs!: {
    // fileform: HTMLFormElement;
  };

  get invoicedata(): Invoice {
    return this.Calculate(this.invoice);
  }

  @Watch("invoicedata", { deep: true })
  public watchContact(val: Invoice) {
    // console.log("Invoice Data Changed");
    this.$emit("change", val);
  }

  public addInvoiceRow() {
    console.log("Add a row to the invoice");
  }

  public removeRow() {
    console.log("Remove Row");
  }

  private Calculate(val: Invoice) {
    // console.log("Calculating Totals");
    val.subtotal = 0;
    val.items.forEach(item => {
      item.total = item.quantity * item.price;
      val.subtotal += item.total;
    });
    if (val.taxpercentage > 0) {
      val.tax = (val.subtotal * val.taxpercentage) / 100;
      val.total = val.subtotal + val.tax;
    } else {
      val.tax = 0;
      val.total = val.subtotal;
    }
    return val;
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

.quantity::after {
  content: " x";
}

.price::before {
  content: "$ ";
}
</style>
