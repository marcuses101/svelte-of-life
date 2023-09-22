<script lang="ts">
    import Cell from "./Cell.svelte";
    import { calculateNextState } from "./calculateNextState";
    import Controls from "./Controls.svelte";
    import { onDestroy, onMount } from "svelte";

    const CELL_SIZE_IN_PIXELS = 15;

    let gridWidth = 0;
    let numberOfColumns = 0;
    $: maxColumns = Math.floor(gridWidth / (CELL_SIZE_IN_PIXELS + 1));
    $: columnControl = { min: 4, max: maxColumns };
    $: {
        console.log("update columns");
        if (numberOfColumns > maxColumns) {
            numberOfColumns = maxColumns;
            reset();
        }
    }

    let gridHeight = 0;
    let numberOfRows = 0;
    $: maxRows = Math.floor(gridHeight / (CELL_SIZE_IN_PIXELS + 1));
    $: rowControl = { min: 4, max: maxRows };
    $: {
        console.log("update rows");
        if (numberOfRows > maxRows) {
            numberOfRows = maxRows;
            reset();
        }
    }

    let tickInterval: null | number = null;
    let editMode: "fill" | "clear" = "clear";
    let isPressed: boolean = false;
    let isPaused: boolean = false;

    let cells = Array(numberOfRows * numberOfColumns).fill(false);

    $: cursor = !isPressed
        ? "pointer"
        : editMode === "fill"
        ? "cell"
        : "crosshair";

    onMount(() => {
        numberOfRows = maxRows;
        numberOfColumns = maxColumns;
        reset();
        random();
        play();
    });

    onDestroy(() => {
        if (tickInterval) {
            clearInterval(tickInterval);
            tickInterval = null;
        }
    });

    function play() {
        isPaused = false;
        if (!tickInterval) {
            tickInterval = setInterval(() => {
                tick();
            }, 100);
        }
    }
    function stop() {
        isPaused = false;
        if (tickInterval) {
            clearInterval(tickInterval);
            tickInterval = null;
        }
    }
    function playPause() {
        if (tickInterval) {
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
        cells = Array(numberOfRows * numberOfColumns).fill(false);
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
        isPlaying={Boolean(tickInterval)}
    />
    <i>Hint! Try clicking/dragging on the grid</i>
    <article
        class="grid-zone"
        bind:clientWidth={gridWidth}
        bind:clientHeight={gridHeight}
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
            style="--columns:{numberOfColumns};--rows:{numberOfRows};--cursor:{cursor}; --cell-size:{`${CELL_SIZE_IN_PIXELS}px`}"
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
