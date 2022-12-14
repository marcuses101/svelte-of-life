<script lang="ts">
  import Cell from "./Cell.svelte";
  import { calculateNextState } from "./calculateNextState";
  import Controls from "./Controls.svelte";
  import { onDestroy, onMount } from "svelte";
  const cellSize = 15;
  let maxRows: number = 10;
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
  let availableWidth = 0;
  let availableHeight = 0;
  let gridZoneRef: HTMLElement | null = null;
  let resizeObserver = new ResizeObserver(() => {
    updateDimentions();
  });
  function updateDimentions() {
    maxColumns = Math.floor(availableWidth / (cellSize + 1));
    maxRows = Math.floor(availableHeight / (cellSize + 1));
    numberOfRows = maxRows;
    numberOfColumns = maxColumns;
    reset();
  }

  onMount(() => {
    if (gridZoneRef !== null) {
      resizeObserver.observe(gridZoneRef);
    }
  });
  onDestroy(() => {
    resizeObserver.disconnect();
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
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
  function pointerDown(e: PointerEvent, i: number, isOn: boolean) {
    isPaused = true;
    editMode = isOn ? "clear" : "fill";
    onCellClick(i, isOn);
    if (e.target === null) return;
    const target = e.target as Element;
    target.releasePointerCapture(e.pointerId);
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
    tick={() => {
      stop();
      tick();
    }}
    {reset}
    resizeCallback={() => {
      reset();
    }}
    isPlaying={Boolean(interval)}
  />
  <article
    bind:this={gridZoneRef}
    class="grid-zone"
    bind:clientWidth={availableWidth}
    bind:clientHeight={availableHeight}
  >
    <div
      on:drag|preventDefault
      on:dragstart|preventDefault
      on:pointerdown|preventDefault={() => {
        isPressed = true;
      }}
      on:pointerup|preventDefault={() => {
        isPressed = false;
      }}
      on:pointerleave|preventDefault={() => {
        isPressed = false;
        isPaused = false;
      }}
      class="grid"
      style="--columns:{numberOfColumns};--rows:{numberOfRows};--cursor:{cursor}"
    >
      {#each cells as isOn, i}
        <Cell
          on:pointerdown={(e) => {
            pointerDown(e, i, isOn);
          }}
          on:pointerup={() => {
            isPaused = false;
            isPressed = false;
          }}
          on:pointerenter={() => {
            onCellEnter(i, isOn);
          }}
          {isOn}
        />
      {/each}
    </div>
  </article>
</section>

<style>
  section {
    flex-direction: column;
    display: flex;
    gap: 1rem;
    overflow: hidden;
    padding-bottom: 2rem;
  }
  .grid-zone {
    flex: 1;
    display: flex;
    overflow-y: hidden;
    place-items: center;
  }
  .grid {
    --cursor: pointer;
    --cell-size: 15px;
    touch-action: none;
    cursor: var(--cursor);
    border-radius: 0.5rem;
    overflow: hidden;
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
