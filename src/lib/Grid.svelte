<script lang="ts">
  import Cell from "./Cell.svelte";
  import { calculateNextState } from "./calculateNextState";
  import Controls from "./Controls.svelte";
  let rowControl = { min: 10, max: 100 };
  let numberOfRows = 50;
  let columnControl = { min: 10, max: 100, value: 50 };
  let numberOfColumns = 50;
  let isPlaying = false;
  let interval = null;
  let cells = [...Array(numberOfRows * numberOfColumns)].map((_) => false);
  let editMode: "fill" | "clear" = "clear";
  let isPressed: boolean = false;
  let isPaused: boolean = false;
  $: cursor = !isPressed
    ? "pointer"
    : editMode === "fill"
    ? "cell"
    : "crosshair";

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

  function random() {
    const randomVal = Math.random();
    cells = [...Array(numberOfRows * numberOfColumns)].map(
      (_) => Math.random() > randomVal
    );
  }
  function reset() {
    isPlaying = false;
    cells = [...Array(numberOfRows * numberOfColumns)].map((_) => false);
  }

  function onCellClick(i, isOn) {
    cells = cells.map((bool, index) => (index === i ? !isOn : bool));
  }
  function onCellEnter(i, isOn) {
    if (!isPressed) return;
    if (editMode === "clear" && !isOn) return;
    if (editMode === "fill" && isOn) return;
    cells = cells.map((bool, index) => {
      if (i !== index) return bool;
      return editMode === "fill";
    });
  }

  function tick() {
    if (isPaused) return;
    cells = calculateNextState(cells, numberOfRows, numberOfColumns);
  }
</script>

<Controls
  bind:rowValue={numberOfRows}
  bind:columnValue={numberOfColumns}
  {rowControl}
  {columnControl}
  {playPause}
  {random}
  {tick}
  {reset}
  resizeCallback={() => {
    reset();
  }}
  {isPlaying}
/>

<div
  on:drag|preventDefault
  on:dragstart|preventDefault
  on:mousedown={() => {
    isPressed = true;
  }}
  on:mouseup={() => {
    isPressed = false;
  }}
  on:mouseleave={() => {
    isPressed = false;
  }}
  class="grid"
  style="--columns:{numberOfColumns};--rows:{numberOfRows};--cursor:{cursor}"
>
  {#each cells as isOn, i}
    <Cell
      on:mousedown={() => {
        isPaused = true;
        editMode = isOn ? "clear" : "fill";
        onCellClick(i, isOn);
      }}
      on:mouseup={() => {
        isPaused = false;
        isPressed = false;
      }}
      on:mouseenter={() => {
        onCellEnter(i, isOn);
      }}
      {isOn}
    />
  {/each}
</div>

<style>
  .grid {
    --cursor: pointer;
    cursor: var(--cursor);
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
