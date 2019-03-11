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

  private getStringValue(numberOfDigits: number): string {
    return parseFloat(this.$refs.element.innerText).toFixed(numberOfDigits);
  }

  private getNumberValue(numberOfDigits: number): number {
    return parseFloat(this.getStringValue(numberOfDigits));
  }

  private setValue(numberOfDigits: number) {
    this.$refs.element.innerHTML = this.amount
      ? this.amount.toFixed(numberOfDigits)
      : "";
  }
}
</script>
