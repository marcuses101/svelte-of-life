<script lang="ts">
  import GameOfLife from "./lib/GameOfLife.svelte";
</script>

<main>
  <h1>Game of Life</h1>
  <GameOfLife />
</main>

<style>
  main {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;
    width: 95vw;
    overflow: hidden;
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
