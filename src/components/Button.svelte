<script>

    export let buttonText = "click"
    export let printbutton = false;

</script>

<button class="clickbutton" class:printbutton={printbutton === true} on:click>{buttonText}</button>

<style>

    .clickbutton {
        padding:10px;
        text-transform:uppercase;
        border-radius:8px;
        font-size:18px;
        border:none;
    }

    .printbutton {
        background-color:#000;
        color:#fff;
    }

</style>