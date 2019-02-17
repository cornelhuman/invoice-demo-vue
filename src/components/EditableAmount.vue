<template>
  <div contenteditable="true" ref="element" v-text="amount" style="overflow-wrap:normal"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EditableAmount extends Vue {
  @Prop(Number) public amount!: number;

  public $refs!: {
    element: HTMLFormElement;
  };

  public mounted() {
    // Set div value from text property
    // Tofixed to trim initial values
    this.$refs.element.innerHTML = this.amount.toFixed(2);

    // Check for Enter
    this.$refs.element.addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        this.$refs.element.blur();
      }
    });

    // On blur emit the new value
    this.$refs.element.addEventListener("blur", () => {
      // We only want 2 decimal values for these amounts
      const res = parseFloat(this.$refs.element.innerText).toFixed(2);
      // his.$refs.element.innerText = res;
      this.$emit("blur", parseFloat(res));
    });

    // Emit focus event, we may want to know when the element receives focus
    this.$refs.element.addEventListener("focus", () => {
      this.$emit("focus");
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
