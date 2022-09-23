<script lang="ts">
  import Cell from "./lib/Cell.svelte";
  import { calculateNextState } from "./lib/calculateNextState";
  const max = 100;
  let numberOfRows = 40;
  let numberOfColumns = 90;
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
    <span>{numberOfRows}</span>
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
    <span>{numberOfColumns}</span>
  </section>
  <section class="buttons">
    <button on:click={tick}>Next State</button>
    <button on:click={random}>Random</button>
    <button on:click={reset}>Reset</button>
    <button on:click={playPause}
      >{#if !isPlaying}Play{:else} Pause{/if}</button
    >
  </section>

  <div class="grid" style="--columns:{numberOfColumns};--rows:{numberOfRows};">
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
  main {
    --columns: 50;
    --rows: 50;
    --cell_size: 15px;
    --gradient: linear-gradient(130deg, #a1179b, #319197 76.05%, #23d5ab);
  }
  h1 {
    background: -webkit-linear-gradient(290deg, #a1179b, #319197 76.05%, #23d5ab);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
  }

  button {
    background: rgb(85, 83, 83);
    box-shadow: 2px 2px  #319197;
    color: white;
    font-size: 1.2rem;
    border: 1px solid black;
    margin-block: 1rem;
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
    box-shadow: 5px 5px 10px hsla(0, 0%, 100%, 0.2);
    background: var(--gradient);
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
    width: fit-content;
    margin-inline: auto;
    display: grid;
    gap: 1px;
    grid-template-columns: repeat(var(--columns), var(--cell_size));
    grid-template-rows: repeat(var(--rows), var(--cell_size));
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
