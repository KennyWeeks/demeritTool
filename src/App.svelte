<script>
  import Button from "./components/Button.svelte";
  import {onMount} from "svelte";
  import DemoView from "./views/DemoView.svelte";
  import BodyPart from "./views/BodyParts.svelte";
    import { claim_component, exclude_internal_props, missing_component, mount_component } from "svelte/internal";

  let toggle = 0;
  let buttonText = "print"
  let printButton = true;

  const halfWidth = 0.5 * 8.5 * 96;
  
</script>

<svelte:window on:load="{()=>{
  let teb = document.getElementById("total-editor-block");
  let preview = document.getElementById("preview");
  let previewCd = Array.from(preview.childNodes);
  if(window.innerWidth > 794) {
    //This is the print button for cellphone sized screens, so essentially,
    //it will remove this from the display so there aren't 2 print buttons.
    previewCd[0].style.display = "none"; 
  } else {
    //Essentially, this will just change the button layout
    //on smaller screens so the original print button 
    //will turn into a 'Preview' button, and it will display
    //a print button in the preview page.
    buttonText = "Preview";
    printButton = false;
  }

  //This is just styling stuff because the total editor space is 
  //pretty tiny, so this but on certain screens it will be smaller then
  //the screen, so it should be centered on those screen
  if(window.innerHeight > teb.offsetHeight) {
    teb.style.position = "absolute";
    teb.style.top = "50%";
    teb.style.transform = "translateY(-50%)";
  }

  //This is a loader that makes the printed page fit the screen.
  if(window.innerWidth - 500 <= 8.5 * 96 && window.innerWidth - 500 >= halfWidth) {
    //This will make the page an appropriate size to fill the space.
    let size = window.innerWidth - 500;
    let percent = (1 * size / (8.5 * 96));
    let mc = document.getElementById("main-component")
    mc.style.transform = `scale(${percent})`;
  }
   
}}" on:resize="{()=>{
  let preview = document.getElementById("preview");
  let previewCd = Array.from(preview.childNodes);
  if(window.innerWidth <= 794) {
    previewCd[0].style.display = "block";
    buttonText = "Preview";
    printButton = false;
  } else {
    previewCd[0].style.display = "none";
    buttonText = "Print";
    printButton = true;
  }

  //I need to set something here
  if(window.innerWidth - 500 < 8.5 * 96 && window.innerWidth - 500 > halfWidth) {
    let size = window.innerWidth - 500;
    let percent = (1 * size / (8.5 * 96));
    let mc = document.getElementById("main-component")
    mc.style.transform = `scale(${percent})`;
    console.log("Test"); 
  } else if((window.innerWidth - 500 >= 8.5 * 96)) {
    let mc = document.getElementById("main-component")
    mc.style.width = "calc(8.5*96px)";
    mc.style.height = "calc(11*96px)";
  } else if(window.innerWidth  <= 794 && window.innerWidth >= 551) {
    let mc = document.getElementById("main-component")
    mc.style.transform = `scale(1.0)`;
  } else if(window.innerWidth < 551) {
    let mc = document.getElementById("main-component")
    mc.style.transform = `scale(0.5)`;
  }

  if(window.innerWidth <= 550) {
    let fs = document.getElementById("flip-switch");
    if(parseInt(fs.getAttribute("data-toggle")) == 1) {
      fs.style.left = "-50px";
    } else {
      fs.style.left = "calc(100vw - 50px)";
    }
  } else if(window.innerWidth > 550 && window.innerWidth <= 794) {
    let fs = document.getElementById("flip-switch");
    if(parseInt(fs.getAttribute("data-toggle")) == 1) {
      fs.style.left = "0px";
    } else {
      fs.style.left = "500px";
    }
  } else {
    let fs = document.getElementById("flip-switch");
    fs.style.left = "500px";
    fs.setAttribute("data-toggle", "0");
    let editor = document.getElementById("editor");
    editor.style.left = "0px";
  }
}}"/>

<main>
  <div id="main-area">
    <div id="flip-switch" data-toggle="0" on:click="{()=>{
      let fs = document.getElementById("flip-switch");
      if(parseInt(fs.getAttribute("data-toggle")) == 0) { 
        document.getElementById("editor").style.left = "-100vw";
        if(window.innerWidth > 500) {
          fs.style.left = "0px";
          document.getElementById("editor").style.boxShadow = "none";
        } else {
          fs.style.left = "-50px";
        }
        fs.setAttribute("data-toggle", "1")
      } else {
        document.getElementById("editor").style.left = "0vw";
        if(window.innerWidth > 500) {
          document.getElementById("editor").style.boxShadow = "0 0 0 50vw rgba(0,0,0,0.8)";
          fs.style.left = "500px";
        } else {
          fs.style.left = "calc(100vw - 50px)";
        }
        fs.setAttribute("data-toggle", "0")
      }
    }}" on:keydown="{()=>{}}">

      <div class="images">

        <img src="eye.png" width="35" alt="View"/>

      </div>

      <div class="images">

        <img src="generate.png" width="35" alt="View"/>

      </div>

    </div>
    <div id="editor">
      <div id="total-editor-block">
        <h3>Write demerit content here</h3>
        <hr>

        <BodyPart printButton="{printButton}" buttonText="{buttonText}"/>
      </div>
    </div>

    <div id="preview">

      <Button view={true} printbutton={true} buttonText="Print" on:click="{()=>{
        let newWindow = window.open("", "PRINT", `height=${8.5*96}px, width=${11*96}px`);
  
        newWindow.print()
      }}"/>
      
      <div id="inner-body">

        <DemoView/>

      </div>

    </div>

  </div>
</main>

<style>

#main-area {
  width:100vw;
  height:100vh;
  position:relative;
}

#editor {
  width:500px;
  height:100vh;
  overflow-y:scroll;
  overflow-x:hidden;
  scrollbar-width:none;
  position:absolute;
  top:0px;
  left:0px;
  background-color:#fff;
}

#editor::-webkit-scrollbar {
  display:none;
}

#total-editor-block {
  overflow:hidden;
  padding-top:10px;
  padding-bottom:30px;
}

#total-editor-block > h3 {
  color:#000;
  margin-left:10px;
  margin-top:5px;
  margin-bottom:5px;
}

#total-editor-block > hr {
  width:480px;
  margin-left:10px;
}

#preview {
  height:100vh;
  width:calc(100vw - 500px);
  background-color:rgba(129, 129, 129, 0.8);
  position:absolute;
  right:0px;
  top:0px;
  overflow:scroll;
  scrollbar-width:none;
}

#preview::--webkit-scrollbar {
  display:none;
}

#inner-body {
  display:inline-block;
  overflow:hidden;
  padding:100px;
}

#flip-switch {
  display:none;
}

@media only screen and (max-width:794px) and (min-width:551px) {
  #editor {
      z-index:1000000;
      box-shadow:0 0 0 50vw rgba(0,0,0,0.8);
  }

  #flip-switch {
    display:block;
    position:absolute;
    width:50px;
    height:50px;
    top:20px;
    left:500px;
    background-color:#fff;
    z-index:1000000000;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
  }

  .images {
    width:50px;
    height:50px;
    overflow:hidden;
    position:relative;
  }

  .images:nth-child(2) {
    display:none
;  }

  .images > img {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }

  #preview {
    width:100vw;
  }
}

@media only screen and (max-width:550px) {

  #flip-switch {
    display:block;
    width:100px;
    height:50px;
    border-radius:5px;
    position:absolute;
    background-color:#fff;
    position:fixed;
    top:20px;
    left:calc(100vw - 50px);
    box-shadow:0 0 2px #000;
    z-index:1000000000;
    display:flex;
    justify-content:space-between;
    flex-wrap:nowrap;
    flex-flow:row;
  }

  .images {
    width:50px;
    height:50px;
    overflow:hidden;
    position:relative;
  }

  .images > img {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }

  #editor {
    width:100vw;
    z-index:10000000; /*Make this the dominant element*/
  }

  #total-editor-block {
    width:100vw;
    padding-bottom:80px;
  }

  #total-editor-block > h3 {
    margin-left:2vw;
  }

  #total-editor-block > hr {
    width:95vw;
    margin-left:2vw;
  }

  #preview {
    width:100vw;
  }

  #inner-body {
    height:calc(0.5 * 11 * 96px);
    width:calc(0.5 * 8.5 * 96px);
    position:absolute;
    top:50%;
    left:50%;
    padding:30px;
    transform:translate(-50%, -50%);
  }
}

</style>
