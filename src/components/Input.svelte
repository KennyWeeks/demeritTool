<script>

    export let labelTag = "";
    export let type="text";
    export let def = "";
    export let min = null;
    let removeoutline = false;

</script>

<label for="{labelTag}">{labelTag.replace(/-/g, " ")}</label><br>
<input type="{type}" name="{labelTag}" class="inputtag" class:removeoutline="{removeoutline == true}" placeholder="{def}" min={min}  required on:focus="{()=>{
    removeoutline = true;
}}"/>


<style>

    label {
        display:inline-block;
        margin-bottom:10px;
        color:#000;
    }

    input {
        outline:none;
        background-color:#fff;
        color:#000;
    }

</style>