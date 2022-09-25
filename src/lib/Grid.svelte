<script lang="ts">
  import Cell from "./Cell.svelte";
  import { calculateNextState } from "./calculateNextState";
  import Controls from "./Controls.svelte";
  import { onMount } from "svelte";
  export let maxRows: number = 10;
  $: rowControl = { min: 4, max: maxRows };
  let numberOfRows = 50;
  export let maxColumns: number = 10;
  $: columnControl = { min: 4, max: maxColumns };
  let numberOfColumns = 50;
  let interval: null | NodeJS.Timer = null;
  let cells = [...Array(numberOfRows * numberOfColumns)].map((_) => false);
  let editMode: "fill" | "clear" = "clear";
  let isPressed: boolean = false;
  let isPaused: boolean = false;
  $: cursor = !isPressed
    ? "pointer"
    : editMode === "fill"
    ? "cell"
    : "crosshair";

  onMount(() => {
    console.log({ rowControl, columnControl });
    numberOfColumns = columnControl.max;
    numberOfRows = rowControl.max;
    reset();
  });

  function play() {
    isPaused = false;
    if (!interval) {
      interval = setInterval(() => {
        tick();
      }, 100);
    }
  }
  function stop() {
    isPaused = false;
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
  function playPause() {
    if (interval) {
      stop();
      return;
    }
    play();
  }

  function random() {
    cells = [...Array(numberOfRows * numberOfColumns)].map(
      (_) => Math.random() > 0.66
    );
  }
  function reset() {
    stop();
    cells = [...Array(numberOfRows * numberOfColumns)].map((_) => false);
  }

  function onCellClick(i: number, isOn: boolean) {
    cells = cells.map((bool, index) => (index === i ? !isOn : bool));
  }
  function onCellEnter(i: number, isOn: boolean) {
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

<section>
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
    isPlaying={Boolean(interval)}
  />
  <div
    on:drag|preventDefault
    on:dragstart|preventDefault
    on:mousedown={() => {
      isPressed = true;
    }}
    on:touchstart={() => {
      isPressed = true;
    }}
    on:mouseup={() => {
      isPressed = false;
    }}
    on:touchend={() => {
      isPressed = false;
    }}
    on:mouseleave={() => {
      isPressed = false;
      isPaused = false;
    }}
    on:touchcancel={() => {
      isPressed = false;
      isPaused = false;
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
        on:touchend={() => {
          isPaused = false;
          isPressed = false;
        }}
        on:mouseenter={() => {
          onCellEnter(i, isOn);
        }}
        on:touchstart={() => {
          if (!isPressed) {
            isPressed = true;
            editMode = isOn ? "clear" : "fill";
          }
          onCellClick(i, isOn);
        }}
        {isOn}
      />
    {/each}
  </div>
</section>

<style>
  .grid {
    --cursor: pointer;
    --cell-size: 15px;
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
    grid-template-columns: repeat(var(--columns), var(--cell-size));
    grid-template-rows: repeat(var(--rows), var(--cell-size));
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
