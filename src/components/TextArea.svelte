<script>
    export let err = false;
</script>

<label for="textarea">Type demerit details here <span class:show={err === true}>Please enter data</span></label>
<textarea name="textarea" rows="20" placeholder="Write demerit details here ..." on:focus on:keypress|preventDefault={(e)=>{
    if(e.charCode < 48 || e.charCode > 57) {
        let char = String.fromCharCode(e.charCode);
        if(e.target.value.length == 0) {
            char = char.toUpperCase();
        }
        e.target.value += char;
    }
}} required></textarea>

<style lang="scss">

    label {
        margin-bottom:10px;
        color:#000;
        font-size:20px;

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

    textarea[name="textarea"] {
        border-radius:5px;
        resize:none;
        background-color:#fff;
        color:#000;
        box-shadow:inset 0 0 0 2px #000;
        border:none;
        width:calc(480px - 15px);
        font-size:18px;
        border-radius:0px;
        padding:7.5px;
        font-family:Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        margin-top:7.5px;

        &:focus {
            outline:none;
        }
    }

    @media only screen and (max-width:550px) {
        textarea[name="textarea"] {
            width:calc(96vw - 15px);
        }
    }

</style>