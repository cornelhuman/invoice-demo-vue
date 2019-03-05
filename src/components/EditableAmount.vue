<template>
  <span contenteditable="true" ref="element" v-text="amount" style="overflow-wrap:normal"></span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class EditableAmount extends Vue {
  @Prop(Number) public amount!: number;
  @Prop(Number) public digits!: number;

  public $refs!: {
    element: HTMLFormElement;
  };

  private getStringValue(numberOfDigits: Number): string {
    return parseFloat(this.$refs.element.innerText).toFixed(this.digits);
  }

  private getNumberValue(numberOfDigits: Number): Number {
    return parseFloat(this.getStringValue(numberOfDigits));
  }

  private setValue(numberOfDigits: Number) {
    this.$refs.element.innerHTML = this.amount ? this.amount.toFixed() : "";
  }

  public mounted() {
    const numberOfDigits = this.digits || 2;

    this.setValue(numberOfDigits);

    this.$refs.element.addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        this.$refs.element.blur();
      }
    });

    this.$refs.element.addEventListener("blur", () => {
      this.$emit("blur", this.getNumberValue(numberOfDigits));
    });

    this.$refs.element.addEventListener("focus", () => {
      this.$emit("focus");
    });
  }
}
</script>
