<template>
  <div>
    <div class="row font-weight-bold border-bottom pb-2 mb-2 text-left">
      <div class="col-2">Category</div>
      <div class="col-4">Description</div>
      <div class="col-3">Quantity x Price</div>
      <div class="col-2 text-right">Total</div>
    </div>
    <div class="row text-left" v-bind:key="item.id" v-for="(item) in invoicedata.items">
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
              :digits="0"
              :amount="item.quantity"
              @blur="item.quantity = $event"
            ></EditableAmount>
          </div>
          <div class="col-7 8">
            <span>{{businessdata.currencysymbol}}&nbsp;</span>
            <span>
              <EditableAmount
                data-text="Price"
                :amount="parseFloat(item.price.toFixed(2))"
                @blur="item.price = $event"
              ></EditableAmount>
            </span>
          </div>
        </div>
      </div>
      <div class="col-2 text-right">
        <span>{{businessdata.currencysymbol}}&nbsp;</span>
        <span>{{item.total.toFixed(2)}}</span>
      </div>
      <div class="col-1 text-right" v-if="showicons">
        <span @click="removeRow(item.id)">
          <font-awesome-icon style="color:gray" icon="times"/>
        </span>
      </div>
    </div>
    <!-- 
                Add New Line Button
    -->
    <div class="row font-weight-bold border-bottom pb-2 mb-2" v-if="showicons">
      <div class="col-6 text-left">
        <span
          @click="addInvoiceRow"
          class="text-primary"
          style="font-size:18pt;outline: none;margin-top:2px;"
        >
          <font-awesome-icon icon="plus-circle"/>
        </span>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-2"></div>
      <div class="col-4"></div>
      <div class="col-1"></div>
      <div class="col-4">
        <div class="row" v-if="businessdata.addtax">
          <div class="col-8 text-right font-weight-bold">Sub Total</div>
          <div class="col-4 font-weight-bold text-right">
            <span>{{businessdata.currencysymbol}}&nbsp;</span>
            <span>{{invoicedata.subtotal.toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2"></div>
      <div class="col-4"></div>
      <div class="col-1"></div>
      <div class="col-4">
        <div class="row" v-if="businessdata.addtax">
          <div class="col-8 text-right font-weight-bold">{{businessdata.taxname}}</div>
          <div class="col-4 font-weight-bold text-right">
            <span>{{businessdata.currencysymbol}}&nbsp;</span>
            <span>{{invoicedata.tax.toFixed(2)}}</span>
          </div>
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
          <div class="col-4 font-weight-bold text-right">
            <span>{{businessdata.currencysymbol}}&nbsp;</span>
            <span>{{invoicedata.total.toFixed(2)}}</span>
          </div>
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
import Invoice from "../classes/Invoice";
import InvoiceItem from "../classes/InvoiceItem";

@Component({
  components: {
    Editable,
    EditableAmount
  }
})
export default class InvoiceDetails extends Vue {
  // @Prop(Invoice) public invoice!: Invoice;
  @Prop(Boolean) public showicons!: boolean;

  public $refs!: {
    // fileform: HTMLFormElement;
  };

  get businessdata(): Invoice {
    // console.log("currencysymbol" + this.$store.state.business.currencysymbol);
    return this.$store.state.business;
  }

  get invoicedata(): Invoice {
    this.$store.commit("Calculate");
    return this.$store.state.invoice;
  }

  @Watch("invoicedata", { deep: true })
  public watchInvoice(val: Invoice) {
    this.$store.commit("invoiceupdate", val);
  }

  public addInvoiceRow() {
    this.$store.commit("addInvoiceRow");
  }

  public removeRow(itemid: number) {
    this.$store.commit("removeRow");
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
  content: " x ";
  text-align: right;
}

.price::before {
  content: "R ";
}
</style>
