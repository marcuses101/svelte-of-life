<script lang="ts">
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    export let rowControl = { min: 10, max: 100 };
    export let rowValue: number = 40;
    export let columnControl = { min: 10, max: 100 };
    export let columnValue: number = 40;
    export let resizeCallback: () => void = () => {};
    export let isPlaying = false;

    const dispatch = createEventDispatcher();
</script>

<section class="controls">
    <article class="range">
        <label for="column">Columns</label>
        <input
            type="range"
            id="columns"
            on:change={() => {
                resizeCallback();
            }}
            bind:value={columnValue}
            min={columnControl.min}
            max={columnControl.max}
            step="1"
        />
        <span>{columnValue}</span>
    </article>
    <article class="range">
        <label for="rows">Rows </label>
        <input
            type="range"
            id="rows"
            on:change={() => {
                resizeCallback();
            }}
            bind:value={rowValue}
            min={rowControl.min}
            max={rowControl.max}
            step="1"
        />
        <span>{rowValue}</span>
    </article>
    <section class="buttons">
        <Button
            on:click={() => {
                dispatch("next");
            }}>Next State</Button
        >
        <Button
            on:click={() => {
                dispatch("random");
            }}>Random</Button
        >
        <Button
            on:click={() => {
                dispatch("reset");
            }}>Reset</Button
        >
        <Button
            on:click={() => {
                dispatch("playPause");
            }}
            >{#if !isPlaying}Play{:else} Pause{/if}</Button
        >
    </section>
</section>

<style>
    .range {
        display: grid;
        grid-template-columns: 100px 200px 50px;
        margin: 0.5rem auto;
        justify-content: center;
    }
    .buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>
