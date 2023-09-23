<button on:click>
    <slot />
</button>

<style>
    button {
        border-radius: var(--br);
        border: 1px solid black;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        width: 140px;
        background-color: var(--grey);
        color: white;
        font-size: 1.2rem;
        position: relative;
    }
    button::after {
        content: "";
        z-index: -1;
        position: absolute;
        background: var(--gradient);
        background-size: 200% 200%;
        animation: var(--gradient-animation);
        border-radius: var(--br);
        width: 100%;
        height: 100%;
        top: 3px;
        left: 3px;
    }

    button:focus,
    button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
</style>
