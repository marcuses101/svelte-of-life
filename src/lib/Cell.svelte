<script lang="ts">
  export let isOn: boolean;
</script>

<div
  on:pointerdown
  on:pointerenter
  on:pointerup
  class:on={isOn}
  on:drag|preventDefault
  on:dragstart|preventDefault
/>

<style>
  div {
    --hue: 0;
    display: grid;
    place-items: center;
  }

  .on {
    mix-blend-mode: saturation;
    background-color: hsl(0, 100%, 50%);
  }
  :not(.on) {
    background: hsla(0, 0%, 0%, 0.15);
  }
</style>
