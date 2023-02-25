<script>
  import Button from "./components/Button.svelte";
  import {onMount} from "svelte";
  import DemoView from "./views/DemoView.svelte";
  import BodyPart from "./views/BodyParts.svelte";

  let toggle = 0;
</script>

<svelte:window on:load="{()=>{
  let teb = document.getElementById("total-editor-block");
  if(window.innerHeight > teb.offsetHeight) {
    teb.style.position = "absolute";
    teb.style.top = "50%";
    teb.style.transform = "translateY(-50%)";
  }
}}" on:click="{()=>{}}"/>

<main>
  <div id="main-area">
    <div id="flip-switch" on:click="{()=>{
      let fs = document.getElementById("flip-switch");
      if(toggle == 0) {
        fs.style.left = "-50px";
        document.getElementById("editor").style.left = "-100vw";
        toggle = 1;
      } else {
        fs.style.left = "calc(100vw - 50px)";
        document.getElementById("editor").style.left = "0vw";
        toggle = 0;
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

        <BodyPart/>
      </div>
    </div>

    <div id="preview">
      
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
  padding:300px;
  overflow:hidden;
}

@media only screen and (max-width:500px) {

  #flip-switch {
    width:100px;
    height:50px;
    border-radius:5px;
    position:absolute;
    background-color:#fff;
    position:absolute;
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
