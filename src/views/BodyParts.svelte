<script>

    import TextArea from "../components/TextArea.svelte";
    import Input from "../components/Input.svelte";
    import Button from "../components/Button.svelte";
    import {onMount} from "svelte";
    import { construct_svelte_component } from "svelte/internal";

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

    <Button printbutton="{true}" buttonText="Print" on:click="{()=>{

        //Basically 
        let inputs = document.querySelectorAll("input");
        let notComplete = false;
        inputs = Array.from(inputs);
        inputs.forEach((e)=>{
            if(e.value == "") {
                e.style.outline = "2px solid #00ff00";
                notComplete = true;
            }
        });

        let textArea = document.querySelectorAll("textarea")[0];
        console.log(textArea.value)
        if(textArea.value == "") {
            textArea.style.outline = "2px solid #00ff00";
            notComplete = true;
        }

        if(!notComplete) {
            document.getElementById("name-text").innerText = inputs[0].value; //This is the name
            document.getElementById("date-text").innerText = inputs[1].value; //This is the date
            document.getElementById("number-text").innerText = inputs[2].value; //This is the hr-number
            document.getElementById("demerit-points").innerText = inputs[3].value;
            document.getElementById("assigned").innerText = inputs[4].value;

            //we'll render the time display
            let time = ""
            let select = document.querySelectorAll("select");
            select = Array.from(select);
            console.log(select);
            select.forEach((e)=>{
                if(e.getAttribute("name") == "hours") {
                    time += e.value + ":"
                } else if(e.getAttribute("name") == "ampm") {
                    time += " " + e.value;
                } else {
                    time += e.value;
                }
            });

            document.getElementById("time").innerText = time;

            document.getElementById("demerit-description").innerText = textArea.value.charAt(0).toLowerCase() + textArea.value.slice(1);
        }

    }}"/>

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