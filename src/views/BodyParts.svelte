<script>

    import TextArea from "../components/TextArea.svelte";
    import Input from "../components/Input.svelte";
    import Button from "../components/Button.svelte";
    import {onMount} from "svelte";

    let inputList = {"name": ["text", "Your name ..."], "date": ["date", "02/14/2023"], "hr-number": ["text", "1111111..."], "demerit-points": ["number", "1"], "who-assigned-the-demerit": ["text", "Captain ...."]}
    
    onMount(async ()=>{
        //This will essentially set the time
        let date = new Date();
        //Set the value, don't worry about the warning, it's type script freaking out.
        document.getElementById("hours-tag").value = date.getHours();
        document.getElementById("minutes").value = date.getMinutes();
        if(date.getHours() > 12) {
            document.getElementById("ampm-tag").value = "pm";
        }
    });


</script>

<div id="editor-block">

    {#each Object.keys(inputList) as name}
       <Input labelTag="{name.charAt(0).toUpperCase() + name.slice(1)}" type="{inputList[name][0]}" def="{inputList[name][1]}"/><br>
       {#if name == "hr-number"}
        <hr>
        {:else if name=="demerit-points"}

        <label for="hours" style="font-size:20px; margin-bottom:10px; color:#000;">Time of Demerit</label><br>
        <select name="hours" id="hours-tag" style="margin-top:5px; margin-bottom:10px; font-size:18px;">
            {#each Array.from(Array(24).keys(),n=>n+1) as n}
                <option value="{n}">{n}</option>
            {/each}
        </select>
        <select name="minutes" id="minutes" style="font-size:18px;">
            {#each Array.from(Array(60).keys(),n=>n+1) as n}
                <option value="{n}">{n}</option>
            {/each}
        </select>
        <select name="ampm" id="ampm-tag" style="font-size:18px;">
            <option value="am">AM</option>
            <option value="pm">PM</option>
        </select><br>
       {/if}
    {/each}

    <TextArea/>

    <Button printbutton="{true}" buttonText="Print"/>

</div>

<style>

    #editor-block {
        width:480px;
        margin-left:10px;
    }

    @media only screen and (max-width:500px) {
        #editor-block {
            width:96vw;
            margin-left:2vw;
        }
    }

</style>