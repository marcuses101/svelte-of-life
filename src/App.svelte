<script lang="ts">
    import GameOfLife from "./lib/GameOfLife.svelte";
</script>

<main>
    <h1>
        <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            >Game of Life
        </a>
    </h1>
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
    h1,
    h1 a {
        padding-top: 1rem;
        background: var(--gradient);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
        background-size: 200% 200%;
        animation: var(--gradient-animation);
    }
</style>
