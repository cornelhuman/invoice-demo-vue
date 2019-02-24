<template>
  <div class="home text-center" ondrop="return false;">
    <div class="pb-3" style="background-color:#6bb3ff">
      <b-collapse id="collapse1" visible class="mt-2">
        <div class="container">
          <div class="row text-left">
            <div class="col-8 pt-4">
              <h2>Free Invoice Generator</h2>
              <p class="card-text">
                <i>
                  Use the Invoice template below to customize your invoice. You do not have to register to use the Invoice Generator.
                  Click on any of the text to start Editing. Drag and drop your logo in the logo block. What you see is what you send to your client as a PDF
                </i>
                <b-button class="ml-4" v-b-toggle.collapse1 variant="warning">Ok</b-button>
              </p>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
    <Invoice></Invoice>
    <!--<input type="number" :value="amount">>
    <button @click="logValue">Log Value</button>
    <div>
      <Editable @blur="mytext = $event" :text="mytext"></Editable>
    </div>I
    <div>
      <EditableAmount @blur="amount = $event" :amount="amount"></EditableAmount>
    </div>
    <DragDropLogo
      :src="logo"
      @change="logo = $event"
      :msg="uploadmsg"
      @progress="uploadmsg = $event"
    ></DragDropLogo>-->
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import Editable from "@/components/Editable.vue"; // @ is an alias to /src
import EditableAmount from "@/components/EditableAmount.vue"; // @ is an alias to /src
import DragDropLogo from "@/components/DragDropLogo.vue"; // @ is an alias to /src
import Invoice from "@/components/Invoice.vue"; // @ is an alias to /src

@Component({
  components: {
    Editable,
    EditableAmount,
    DragDropLogo,
    Invoice
  }
})
export default class Home extends Vue {
  public mytext: string = "Hello World";
  public amount: number = 100.15;
  public logo: string = "";
  public uploadmsg: string = "Drag and Drop Files Here";

  public test(val: string) {
    console.log(val);
  }

  public logValue() {
    this.mytext = "kkk";
    this.amount = 50.99;
    // console.log(this.amount);
    // this.amount = 55.889;
    // console.log(this.amount);
  }
}
</script>
