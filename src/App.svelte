<script>
  import Button from "./components/Button.svelte";
  import {onMount} from "svelte";
</script>

<svelte:window on:click="{()=>{
  alert("Sup");
}}"/>

<main>
  <div id="main-area">

    <div id="editor">
      <h3>Write demerit content here</h3>
      <hr>
    </div>

    <div id="preview">
      
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

#editor > h3 {
  color:#000;
  margin-left:10px;
}

#editor > hr {
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
}

</style>
