<script>

    import TextArea from "../components/TextArea.svelte";
    import Input from "../components/Input.svelte";
    import Button from "../components/Button.svelte";
    import {onMount} from "svelte";
    export let printButton = true;
    export let buttonText = "Print";


    let inputList = {"name": ["text", "Your name ...", false], "date": ["date", "02/14/2023", false], "hr-number": ["text", "1111111...", false], "demerit-points": ["number", "1", false], "who-assigned-the-demerit": ["text", "Captain ....", false]}
    let textAreaEmpty = false;

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

    const printCommand = (mc) => {
        let newWindow = window.open("", "PRINT", `height=${8.5*96}px, width=${11*96}px`);
        if(window.innerWidth <= 794) {
        newWindow.print()
        }
        //newWindow.print()
        mc.style.transform = "scale(1.0)";
        let CurrentArray = Array.from(mc.childNodes);
        
        CurrentArray = CurrentArray.filter((val)=>{return val.data != " "})
        
        //So we want to add the main component here
        newWindow.document.write("<div id='main-component'></div>");
        let newMainComponent = newWindow.document.getElementById("main-component");
        
        newMainComponent.innerHTML = mc.innerHTML; 

        let newMainArray = Array.from(newMainComponent.childNodes);

        //Parse the array
        newMainArray = newMainArray.filter((val)=>{return val.data != " "})

        //Save the current styles to the new page
        newMainComponent.setAttribute("style", mc.getAttribute("style"));

        //Save the inner components styles from this page to the new page
        for(let i = 0; i < newMainArray.length; i++) {
            newMainArray[i].setAttribute("style", CurrentArray[i].getAttribute("style"));
        }

        if(window.innerWidth > 794) {
            newWindow.print()
        }

    }


</script>

<div id="editor-block">
    <br>
    {#each Object.keys(inputList) as name}
       <Input err="{inputList[name][2]}" labelTag="{name.charAt(0).toUpperCase() + name.slice(1)}" type="{inputList[name][0]}" min="{inputList[name][1]}" def="{inputList[name][1]}" on:focus="{(e, x=name)=>{
        e.target.style.outline = "none";
        inputList[x][2] = false;
       }}"/><br>
       {#if name == "hr-number"}
        <hr>
        {:else if name=="demerit-points"}

        <label for="hours" style="font-size:20px; margin-bottom:10px; color:#000;">Time of Demerit</label><br>
        <select name="hours" id="hours-tag" style="margin-top:5px; margin-bottom:10px; font-size:18px;">
            {#each Array.from(Array(25).keys(),n=>n) as n}
                <option value="{n}">{n}</option>
            {/each}
        </select>
        <select name="minutes" id="minutes" style="font-size:18px;">
            {#each Array.from(Array(60).keys(),n=>n) as n}
                <option value="{n}">{n}</option>
            {/each}
        </select>
        <select name="ampm" id="ampm-tag" style="font-size:18px;">
            <option value="am">AM</option>
            <option value="pm">PM</option>
        </select><br>
       {/if}
    {/each}

    <TextArea err="{textAreaEmpty}" on:focus="{(e)=>{
        e.target.style.outline = "none";
        textAreaEmpty = false;
       }}"/>

    <Button printbutton="{printButton}" buttonText="{buttonText}" on:click="{()=>{

        //Basically 
        let inputs = document.querySelectorAll("input");
        let notComplete = false;
        inputs = Array.from(inputs);
        inputs.forEach((e)=>{
            let keys = e.getAttribute("name").toLowerCase()
            if(e.value == "") {
                inputList[keys][2] = true;
                e.style.outline = "2px solid #ff0000";
                notComplete = true;
            }
        });

        let textArea = document.querySelectorAll("textarea")[0];
        console.log(textArea.value)
        if(textArea.value == "") {
            textArea.style.outline = "2px solid #ff0000";
            notComplete = true;
            textAreaEmpty = true;
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
                    let hoursTemp = e.value
                    if(parseInt(e.value) == 0) {
                        hoursTemp = 12;
                    }
                    time += hoursTemp + ":"

                } else if(e.getAttribute("name") == "ampm") {
                    time += " " + e.value;
                } else {
                    let minTemp = e.value
                    if(parseInt(e.value) == 0) {
                        minTemp = "00";
                    }
                    console.log(minTemp)
                    time += minTemp;
                }
            });

            document.getElementById("time").innerText = time;

            document.getElementById("demerit-description").innerText = textArea.value.charAt(0).toLowerCase() + textArea.value.slice(1);

            if(window.innerWidth <= 500) {
                document.getElementById("flip-switch").style.left = "-50px";
                document.getElementById("flip-switch").setAttribute("data-toggle", "1");
                document.getElementById("editor").style.left = "-100vw";
            }

            let mainContent = document.getElementById("main-component");
            if(printButton) {
                printCommand(mainContent);
            } else {
                let editor = document.getElementById("editor");
                let fs = document.getElementById("flip-switch");
                editor.style.left = "-100vw";
                fs.setAttribute("data-toggle", "1");
                let images = Array.from(fs.childNodes).filter((val)=>{return val.data != " "}); //Filter out the text elements
                if(window.innerWidth <= 550) {
                    fs.style.left = "-50px";
                } else {
                    fs.style.left = "0px";
                    images[0].style.display = "none";
                    editor.style.boxShadow = "none";
                }
                
            }
        } else {
            let editor = document.getElementById("editor");
            let teb = document.getElementById("total-editor-block");
            if(window.innerHeight < teb.offsetHeight) {
                editor.scrollTo(0, 0);
            }
            
        }

    }}"/>

</div>

<style lang="scss">

    #editor-block {
        width:480px;
        margin-left:10px;

        hr {
            width:480px;
            float:left;
        }
    }

    @media only screen and (max-width:550px) {
        #editor-block {
            width:100%;
            margin-left:0px;
            padding-bottom:120px;

            hr {
                width:96vw;
            }
        }
    }

</style>