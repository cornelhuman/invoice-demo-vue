<template>
  <div contenteditable="true" ref="element" v-html="text"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Editable extends Vue {
  @Prop(String) public text!: string;
  @Prop(Boolean) public multiline!: false;

  public $refs!: {
    element: HTMLFormElement;
  };

  public mounted() {
    // Set div value from text property

    this.$refs.element.innerHTML = this.text;

    // Check for Enter
    this.$refs.element.addEventListener("keydown", event => {
      if (!this.multiline) {
        if (event.keyCode === 13) {
          this.$refs.element.blur();
        }
      }
    });

    // On blur emit the new value
    this.$refs.element.addEventListener("blur", () => {
      this.$emit("blur", this.$refs.element.innerText);
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
