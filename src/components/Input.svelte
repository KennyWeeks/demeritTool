<script>

    export let labelTag = "";
    export let type="text";
    export let def = "";
    export let min = null;

</script>

<label for="{labelTag}">{labelTag.replace(/-/g, " ")}</label><br>
<input type="{type}" name="{labelTag}" class="inputtag" placeholder="{def}" min={min}  required on:focus="{(e)=>{
    e.target.style.outlineStyle = "none";
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