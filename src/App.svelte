<script lang="ts">
  import Grid from "./lib/Grid.svelte";
</script>

<main>
  <h1>Game of Life</h1>
  <Grid />
</main>

<style>
  main {
    --columns: 50;
    --rows: 50;
    --cell_size: 15px;
  }
  h1 {
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
