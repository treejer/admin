<template>
  <label class="burger-menu" for="check">
    <input
    
      :class="checkBox ? 'checked' : 'not-check'"
      type="checkbox"
      id="check"
    />
    <span></span>
    <span></span>
    <span></span>
  </label>
</template>

<script>
export default {
  props: {
    checkBox: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.burger-menu {
  display: flex;
  flex-direction: column;
  width: 70px;
  cursor: pointer;

  label span {
    background: black;
    border-radius: 10px;
    height: 7px;
    margin: 7px 0;
    transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  span:nth-of-type(1) {
    width: 50%;
  }

  span:nth-of-type(2) {
    width: 100%;
  }

  span:nth-of-type(3) {
    width: 75%;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"].checked ~ span:nth-of-type(1) {
    transform-origin: bottom;
    transform: rotatez(45deg) translate(8px, 0px);
  }

  input[type="checkbox"].checked ~ span:nth-of-type(2) {
    transform-origin: top;
    transform: rotatez(-45deg);
  }

  input[type="checkbox"].checked ~ span:nth-of-type(3) {
    transform-origin: bottom;
    width: 50%;
    transform: translate(30px, -11px) rotatez(45deg);
  }
}
</style>