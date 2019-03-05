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

  private setValue() {
    this.$refs.element.innerHTML = this.text;
  }

  private getValue(): string {
    return this.$refs.element.innerText;
  }

  public mounted() {
    this.setValue();

    this.$refs.element.addEventListener("keydown", event => {
      if (!this.multiline) {
        if (event.keyCode === 13) {
          this.$refs.element.blur();
        }
      }
    });

    this.$refs.element.addEventListener("blur", () => {
      this.$emit("blur", this.getValue());
    });

    this.$refs.element.addEventListener("focus", () => {
      this.$emit("focus");
    });
  }
}
</script>
