<script lang="ts">
  export let rowControl = { min: 10, max: 100 };
  export let rowValue: number = 40;
  export let columnControl = { min: 10, max: 100 };
  export let columnValue: number = 40;
  export let playPause: () => void;
  export let tick: () => void;
  export let random: () => void;
  export let reset: () => void;
  export let resizeCallback: () => void = () => {};
  export let isPlaying = false;
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
    <button on:click={tick}>Next State</button>
    <button on:click={random}>Random</button>
    <button on:click={reset}>Reset</button>
    <button on:click={playPause}
      >{#if !isPlaying}Play{:else} Pause{/if}</button
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
  button {
    width: 140px;
    background-color: rgb(85, 83, 83);
    /* box-shadow: 2px 2px #319197; */
    color: white;
    font-size: 1.2rem;
    border: 1px solid black;
    position: relative;
  }
  button::after {
    content: "";
    z-index: -1;
    position: absolute;
    background: var(--gradient);
    background-size: 200% 200%;
    animation: gradient 15s ease infinite;
    border-radius: var(--br);
    width: 100%;
    height: 100%;
    top: 3px;
    left: 3px;
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
