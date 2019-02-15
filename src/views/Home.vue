<template>
  <div class="home">
    <button @click="logValue">Log Value</button>
    <Editable @blur="mytext = $event" :text="mytext"></Editable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Editable from "@/components/Editable.vue"; // @ is an alias to /src

@Component({
  components: {
    Editable
  }
})
export default class Home extends Vue {
  public mytext: string = "Hello World";
  public test(val: string) {
    console.log(val);
  }

  public logValue() {
    console.log(this.mytext);
  }
}
</script>
