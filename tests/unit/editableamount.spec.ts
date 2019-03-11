import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import EditableAmount from "@/components/EditableAmount.vue";

describe("EditableAmount.vue", () => {
  it("EditableAmount - Testing amount only has 2 decimals and is rounded", () => {
    const wrapper = shallowMount(EditableAmount, {
      propsData: {
        amount: 10.559,
        digits: 2
      }
    });
    expect(wrapper.text()).to.include("10.56");
  });
});
