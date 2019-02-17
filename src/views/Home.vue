<template>
  <div class="home">
    <input type="number" :value="amount">>
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
    ></DragDropLogo>
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
    DragDropLogo
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
