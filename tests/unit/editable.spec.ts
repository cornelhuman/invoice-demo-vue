import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Editable from "@/components/Editable.vue";

describe("Editable.vue", () => {
  it("Editable - testing text property", () => {
    const wrapper = shallowMount(Editable);
    wrapper.setProps({ text: "Hello World" });
    expect(wrapper.text()).to.include("Hello World");
  });
});
