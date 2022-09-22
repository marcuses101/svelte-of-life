<script lang="ts">
  import Cell from "./lib/Cell.svelte";
  import { calculateNextState } from "./lib/calculateNextState";
  const max = 100;
  let numberOfRows = 25;
  let numberOfColumns = 25;
  let isPlaying = false;
  let interval = null;
  let cells = [...Array(numberOfRows * numberOfColumns)].map((_) => false);

  function playPause() {
    if (isPlaying) {
      isPlaying = !isPlaying;
      if (interval === null) return;
      clearInterval(interval);
      interval = null;
      return;
    }
    isPlaying = !isPlaying;
    interval = setInterval(() => {
      tick();
    }, 100);
    return;
  }

  function getIndex(rowIndex, columnIndex) {
    return rowIndex * numberOfColumns + columnIndex;
  }
  function populateCells() {
    cells = [...Array(numberOfRows * numberOfColumns)].map((_) => false);
  }
  function random() {
    const randomVal = Math.random();
    cells = [...Array(numberOfRows * numberOfColumns)].map(
      (_) => Math.random() > randomVal
    );
  }
  function reset() {
    cells = [...Array(numberOfRows * numberOfColumns)].map((_) => false);
  }

  function onCellClick(i, isOn) {
    cells = cells.map((bool, index) => (index === i ? !isOn : bool));
  }
  function tick() {
    cells = calculateNextState(cells, numberOfRows, numberOfColumns);
  }
</script>

<main>
  <h1>Game of Life</h1>
  <section class="controls">
    <label for="rows">Rows </label>
    <input
      type="range"
      id="rows"
      bind:value={numberOfRows}
      on:change={populateCells}
      min="10"
      {max}
      step="1"
    />
    <span>{numberOfColumns}</span>
    <label for="column">Columns</label>
    <input
      type="range"
      id="columns"
      bind:value={numberOfColumns}
      on:change={populateCells}
      min="10"
      {max}
      step="1"
    />
    <span>{numberOfRows}</span>
  </section>
  <section class="buttons">
    <button on:click={tick}>Next State</button>
    <button on:click={random}>Random</button>
    <button on:click={reset}>Reset</button>
    <button on:click={playPause}
      >{#if !isPlaying}Play{:else} Pause{/if}</button
    >
  </section>

  <div class="grid" style="--columns:{numberOfColumns};--rows:{numberOfRows}">
    {#each cells as isOn, i}
      <Cell
        on:click={() => {
          onCellClick(i, isOn);
        }}
        {isOn}
      />
    {/each}
  </div>
</main>

<style>
  button {
    border: 1px solid black;
    margin-block: 1rem;
  }
  main {
    --columns: 50;
    --rows: 50;
    --cell_size: 10px;
  }
  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .grid {
    /* background: linear-gradient(
      130deg,
      rgb(255 122 24 / 75%),
      rgb(175 0 45 / 75%) 41.07%,
      rgb(49 145 151 / 75%) 76.05%
    ); */
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 5px 5px 5px hsla(0, 0%, 0%, 0.5);
    background: linear-gradient(
      130deg,
      #d4681a,
      #b12649 41.07%,
      #319197 76.05%
    );
    width: fit-content;
    margin-inline: auto;
    display: grid;
    gap: 1px;
    grid-template-columns: repeat(var(--columns), var(--cell_size));
    grid-template-rows: repeat(var(--rows), var(--cell_size));
  }
</style>
