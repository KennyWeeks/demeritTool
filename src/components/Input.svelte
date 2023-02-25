<script>

    export let labelTag = "";
    export let type="text";
    export let def = "";
    export let min = null;

</script>

<label for="{labelTag}">{labelTag.replace(/-/g, " ")}</label><br>
<input type="{type}" name="{labelTag}" class="inputtag" placeholder="{def}" min={min}  required on:focus="{(e)=>{
    e.target.style.outline = "None";
}}"/>


<style>

    label {
        display:inline-block;
        margin-bottom:0px;
        font-size:20px;
        color:#000;
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