<script>
  import Button from "./components/Button.svelte";
  import {onMount} from "svelte";
  import DemoView from "./views/DemoView.svelte";
  import BodyPart from "./views/BodyParts.svelte";

  const halfWidth = 0.5 * 8.5 * 96;
  let buttonText = "print"
  let printButton = true;

  //This is a function that will essentially look to see if the userAgent is
  //a phone or not
  const mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  onMount(async () => {
    
    //These are just some 
    let teb = document.getElementById("total-editor-block");
    if(window.innerHeight > teb.offsetHeight) {
      teb.style.top = "50%";
      teb.style.transform = "translateY(-50%)";
    }

    //This will set the button on load
    if(window.innerWidth - 500 <= halfWidth) {
      buttonText = "preview";
      printButton = false;
    }

    //This will set the zoom on the page.
    let innerBody = document.getElementById("inner-body");
    if((window.innerWidth - 500) <= 8.5 * 96 && (window.innerWidth - 500) >= halfWidth) {
      let scale = 1 * ((window.innerWidth - 500) / (8.5 * 96));
      innerBody.style.transform = `scale(${scale})`;
    }
  });

  const printCommand = (mc) =>  {
    let mobileChk = mobileCheck();
    console.log(mobileChk);
    let newWindow = window.open("", "PRINT", `height=${11*96}px, width=${8.5*96}px`);
    if(mobileChk) {
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

    if(!mobileChk) {
      newWindow.print()
    }

  }
  
</script>

<svelte:window on:resize="{()=>{
  let teb = document.getElementById("total-editor-block");
  let preview = document.getElementById("preview");
  let innerBody = document.getElementById("inner-body");
  let editor = document.getElementById("editor");
  let fs = document.getElementById("flip-switch");
  let images = Array.from(fs.childNodes).filter((val)=>{return val.data != " "}); //Filter out the text elements.

  //This will position the editor block into the center of the screen
  if(window.innerHeight <= teb.offsetHeight) {
    teb.style.top = "0px";
    teb.style.transform = "none";
  } else {
    teb.style.top = "50%";
    teb.style.transform = "translateY(-50%)";
  }

  //We need to check to see if the screen is too small to include the entire page
  if((window.innerWidth - 500) <= 8.5 * 96 && (window.innerWidth - 500) >= halfWidth) {
    let scale = 1 * ((window.innerWidth - 500) / (8.5 * 96));
    innerBody.style.transform = `scale(${scale})`;

    //This will change the button text on the editor
    printButton = true;
    buttonText = "Print";

    editor.removeAttribute("style");
    fs.setAttribute("data-toggle", "0");
    fs.style.left = "500px";
    
    images[0].style.display = "block";


  } else if(((window.innerWidth - 500) < halfWidth)) {
    buttonText = "Preview";
    printButton = false;

    if(window.innerWidth <= 550) {
      editor.style.boxShadow = "none";
      innerBody.removeAttribute("style");
      fs.removeAttribute("style");
      if(fs.getAttribute("data-toggle") == "1") {
        images[0].style.display = "block";
        fs.style.left = "-50px";
      }
    } else {
      innerBody.style.transform = "scale(1.0)";
      if(fs.getAttribute("data-toggle") == "1") {
        images[0].style.display = "none";
        fs.style.left = "0px";
        editor.style.boxShadow = "none";
      } else {
        editor.style.boxShadow = "0 0 0 50vw rgba(0,0,0,0.8)";
      }
    }
  }
}}"/>

<main>
  <div id="main-area">
    <div id="flip-switch" data-toggle="0" on:click="{(e)=>{
      let fs = document.getElementById("flip-switch");
      let images = Array.from(fs.childNodes).filter((val)=>{return val.data != " "}); //Filter out the text elements.
      
      if(parseInt(fs.getAttribute("data-toggle")) == 0) { 
        document.getElementById("editor").style.left = "-100vw";
        if(window.innerWidth > 550) {
          fs.style.left = "0px";
          document.getElementById("editor").style.boxShadow = "none";
          images[0].style.display = "none";
        } else {
          fs.style.left = "-50px";
        }
        fs.setAttribute("data-toggle", "1")
      } else {
        document.getElementById("editor").style.left = "0vw";
        if(window.innerWidth > 550) {
          document.getElementById("editor").style.boxShadow = "0 0 0 50vw rgba(0,0,0,0.8)";
          fs.style.left = "500px";
          images[0].style.display = "block";
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

        <BodyPart printButton="{printButton}" buttonText="{buttonText}" mobileDisplay="{mobileCheck()}"/>

      </div>
    </div>

    <div id="preview">

      <Button view={true} printbutton={true} buttonText="Print" on:click="{()=>{
        console.log("WHAT");
        let mainContent = document.getElementById("main-component");
        printCommand(mainContent);
      }}"/>
      
      <div id="inner-body">

        <DemoView/>

      </div>

    </div>

  </div>
</main>

<style lang="scss">

  $height:100vh;

  #main-area {
    width:100vw;
    height:$height;
    position:relative;

    //This is the switch that moves the editor off the screen to see the preview area
    #flip-switch {
      display:none;
    }

    //This is the editor
    #editor {
      width:500px;
      height:$height;
      overflow-y:scroll;
      overflow-x:hidden;
      scrollbar-width:none;
      position:absolute;
      top:0px;
      left:0px;
      background-color:#fff;

      &::--webkit-scrollbar {
        display:none;
      }
      #total-editor-block {
        padding-top:10px;
        padding-bottom:30px;
        position:absolute;

        h3 {
          color:#000;
          margin-top:5px;
          margin-bottom:5px;
          margin-left:10px;
        }

        hr {
          width:480px;
          float:left;
          margin-left:10px;
        }
      }
    }

    //This is the preview
    #preview {
      height:100vh;
      width:calc(100vw - 500px);
      background-color:rgba(129, 129, 129, 0.8);
      position:absolute;
      right:0px;
      top:0px;
      overflow:scroll;
      scrollbar-width:none;

      button {
        z-index:1000000000000000;
      }

      ::-webkit-scrollbar {
        display:none;
      }

      #inner-body {
        display:inline-block;
        overflow:hidden;
        padding:100px;
      }
    }
  }

  @media only screen and (max-width:908px) and (min-width:551px) {
    #main-area {

      #flip-switch {
        display:block;
        height:50px;
        width:50px;
        position:fixed;
        z-index:1000000000;
        left:500px;
        top:20px;
        border-top-right-radius:8px;
        border-bottom-right-radius:8px;
        background-color:#fff;
        overflow:hidden;

        .images {
          height:50px;
          width:50px;
          overflow:hidden;
          position:relative;
          
          img {
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
          }
        }
      }

      #editor {
        z-index:100000000;
        box-shadow:0 0 0 50vw rgba(0,0,0,0.8);
      }

      #preview {
        width:100vw;
        height:$height;
      }
    }
  }

  @media only screen and (max-width:550px) {
    #main-area {

      #flip-switch {
        display:block;
        height:50px;
        width:100px;
        position:fixed;
        z-index:1000000000;
        left:calc(100vw - 50px);
        top:20px;
        background-color:#fff;
        border-radius:8px;
        display:flex;
        justify-content:space-between;
        flex-flow:row;
        flex-wrap:nowrap;
        box-shadow:0 0 5px rgba(0,0,0,0.3);

        .images {
          height:50px;
          width:50px;
          overflow:hidden;
          position:relative;
          
          img {
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
          }
        }
      }

      #editor {
        width:100vw;
        z-index:100000000;

        #total-editor-block {
          width:96vw;
          margin-left:2vw;

          h3 {
            margin-left:0px;
          }

          hr {
            float:left;
            margin-left:0px;
            width:96vw;
          }
        }
      }

      #preview {
        width:100vw;
        height:$height;

        #inner-body {
          padding:0px;
          transform:scale(0.5);
          margin-left:-50%;
        }
      }
    }
  }

</style>
