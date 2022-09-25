<script lang="ts">
  import { onMount } from "svelte";
  import Grid from "./lib/Grid.svelte";
  const cellSize = 15;
  let isLoading = true;
  let maxColumns = 10;
  let maxRows = 40;

  onMount(() => {
    const sizeOfOneRem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const maxWidth = window.innerWidth - 4 * sizeOfOneRem;
    maxColumns = Math.floor(maxWidth / (cellSize + 1));
    console.log({ maxWidth, maxColumns });
    isLoading = false;
  });
</script>

<main>
  <h1>Game of Life</h1>
  {#if isLoading}
    <h2>Loading</h2>
  {:else}
    <Grid {maxColumns} {maxRows} />
  {/if}
</main>

<style>
  main {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;
  }
  h1 {
    padding-top: 1rem;
    background: -webkit-linear-gradient(
      290deg,
      #a1179b,
      #319197 76.05%,
      #23d5ab
    );
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }
</style>
