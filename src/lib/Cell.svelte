<script lang="ts">
  export let isOn;
  const hue = Math.floor(Math.random() * 360);
  console.log({ hue });
</script>

<div on:click class:on={isOn} style="--hue:{hue};" />

<style>
  div {
    --hue: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
  }

  .on {
    mix-blend-mode: saturation;
    /* background: linear-gradient(-45deg, black, hsla(0, 0%, 0%, 0.5)); */
    background-color: hsl(var(--hue), 75%, 50%);
  }
  :not(.on) {
    background: hsla(0, 0%, 0%, 0.2);
  }
</style>
