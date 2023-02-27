<script>

    export let buttonText = "click"
    export let printbutton = false;
    export let view = false;

</script>

<button class="clickbutton" class:printbutton={printbutton === true} class:view={view === true} on:click>{buttonText}</button>

<style>

    .clickbutton {
        padding:10px;
        text-transform:uppercase;
        border-radius:8px;
        font-size:18px;
        border:none;
        margin-top:10px;
    }

    .printbutton {
        background-color:#000;
        color:#fff;
    }

    .view {
        position:fixed;
        right:10px;
        top:20px;
    }

</style>