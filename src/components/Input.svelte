<script>

    export let labelTag = "";
    export let type="text";
    export let def = "";
    export let min = null;
    export let err = false;

</script>

<label for="{labelTag}">{labelTag.replace(/-/g, " ")} <span class:show={err === true}>Please enter data</span></label><br>
{#if labelTag === "Hr-number"}
<input type="{type}" name="{labelTag}" class="inputtag" placeholder="{def}" min={min} on:keypress|preventDefault={(e)=>{
    if(e.charCode >= 48 && e.charCode <= 57) {
        e.target.value += String.fromCharCode(e.charCode);
    }
}} required on:focus/>
{:else if labelTag == "Name" || labelTag == "Who-assigned-the-demerit"}
<input type="{type}" name="{labelTag}" class="inputtag" placeholder="{def}" min={min} on:keypress|preventDefault={(e)=>{
    if(e.charCode < 48 || e.charCode > 57) {
        let char = String.fromCharCode(e.charCode);
        if(e.target.value.length == 0) {
            char = char.toUpperCase();
        }
        e.target.value += char;
    }
}} required on:focus/>
{:else}
<input type="{type}" name="{labelTag}" class="inputtag" placeholder="{def}" min={min} required on:focus/>
{/if}

<style lang="scss">

    label {
        display:inline-block;
        margin-bottom:0px;
        font-size:20px;
        color:#000;

        span {
            font-weight:bolder;
            font-size:15px;
            color:#ff0000;
            display:none;

            .show {
                display:block;
            }
        }
    }

    input {
        outline:none;
        background-color:#fff;
        color:#000;
        margin-top:5px;
        margin-bottom:10px;
        font-size:18px;
        box-shadow:none;
        border:2px solid #000;
        line-height:1.5;
        padding-left:5px
    }

</style>