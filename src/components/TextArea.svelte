<script>

</script>

<label for="textarea">Type demerit details here</label>
<textarea name="textarea" rows="20" placeholder="Write demerit details here ..." on:focus="{(e)=>{
    e.target.style.outline = "none";
}}"></textarea>

<style>

    label {
        margin-bottom:10px;
        color:#000;
    }

    textarea[name="textarea"] {
        border-radius:5px;
        resize:none;
        width:470px;
        background-color:#fff;
        color:#000;
    }

    textarea[name="textarea"]:focus {
        outline:none;
    }

    @media only screen and (max-width:500px) {
        textarea[name="textarea"] {
            width:calc(100vw - 20px);
        }
    }

</style>