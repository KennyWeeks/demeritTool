window.addEventListener("load", ()=>{

	smallMenu = document.getElementById("small-menu");
	closeBar = document.getElementById("close-bar");

	callUs = document.getElementById("call-us")

	phoneNumber = document.getElementById("phone-number");

	menuBar = document.getElementById("menu-bar")

	openOption = document.getElementsByClassName("open-options")

	closeOption = document.getElementsByClassName("close-options")

	smallMenu.addEventListener("click", (e)=>{
		smallMenu.style.right = "calc(1em + 10em)"; //initial right 1em

		//callUs.style.right = "calc(10px + 10em)"; //initial right 10px
		phoneNumber.style.right = "calc(10px + 10em)"; //initial right 10px
		body = document.getElementsByTagName("body")[0];
		body.style.marginLeft = "-10em"; // initial left 0px

		menuBar.style.right = "0";
	});

	closeBar.addEventListener("click", (e)=>{
		smallMenu.style.right = "1em"; //initial right 1em

		//callUs.style.right = "10px"; //initial right 10px
		phoneNumber.style.right = "10px"; //initial right 10px
		body = document.getElementsByTagName("body")[0];
		body.style.marginLeft = "0em"; // initial left 0px

		menuBar.style.right = "-10em";
	});

	/*These are the individual menu items in the actual menu*/
	smallMenuItems = document.getElementsByClassName("small-menu-items");
	hiddenBlocks = document.getElementsByClassName("hidden-blocks")
	for(var i = 0; i < smallMenuItems.length; i++) {
		if(smallMenuItems[i].getAttribute("ID") == 102) {
			smallMenuItems[i].addEventListener("click", (e)=>{
				if(e["target"].getAttribute("opened") == 0) {
					for(var j = 0; j < hiddenBlocks.length; j++) {
						if(hiddenBlocks[j].getAttribute("parent-block") == 102) {
							hiddenBlocks[j].style.height = "100px";
							openOption[0].style.display = "none";
							closeOption[0].style.display = "block";
						}
					}
					e["target"].setAttribute("opened", 1)
				} else {
					for(var j = 0; j < hiddenBlocks.length; j++) {
						if(hiddenBlocks[j].getAttribute("parent-block") == 102) {
							hiddenBlocks[j].style.height = "0px";
							openOption[0].style.display = "block";
							closeOption[0].style.display = "none";
						}
					}
					e["target"].setAttribute("opened", 0)
				}
			});
		}
	}
});