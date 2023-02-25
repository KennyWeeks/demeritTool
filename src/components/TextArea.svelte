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
        font-size:20px;
    }

    textarea[name="textarea"] {
        border-radius:5px;
        resize:none;
        width:465px;
        background-color:#fff;
        color:#000;
        border:2px solid #000;
        margin-top:5px;
        font-size:18px;
        border-radius:0px;
        padding:5px;
    }

    textarea[name="textarea"]:focus {
        outline:none;
    }

    @media only screen and (max-width:500px) {
        textarea[name="textarea"] {
            width:calc(94vw - 5px);
        }
    }

</style>