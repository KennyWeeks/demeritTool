window.addEventListener('load', (e)=>{
	/*car = document.getElementById("carousel");
	console.log(car.childNodes);
	caro = car.childNodes;
	console.log(caro);

	//This will start the carousel
	console.log(window.getComputedStyle(caro[1])["left"]);

	posArr = Array();

	posArr.push(caro[3]);
	posArr.push(caro[1]);
	posArr.push(caro[2]);
	
	console.log(caro[3])

	console.log(posArr);

	time = 4500;

	test = setInterval(()=>{

		newArray = Array();

		posArr[0].style.zIndex = 1;
		posArr[1].style.zIndex = 100;
		posArr[2].style.zIndex = 1000;

		posArr[1].style.left = "-100vw";
		posArr[2].style.left = "0vw";
		posArr[0].style.left = "100vw";

		//rearrange everything
		newArray.push(posArr[1]);
		newArray.push(posArr[2]);
		newArray.push(posArr[0]);

		posArr = newArray;

		time = 4500;

	}, time);

	car.addEventListener("click", ()=>{
		clearInterval(test);
	});

	testCards = document.getElementsByClassName("test-cards");

	buttons = document.getElementsByClassName("read-more");

	for(var i = 0; i < buttons.length; i++) {
		buttons[i].setAttribute("id", i)
		buttons[i].addEventListener("click", (e)=>{
			for(var j = 0; j < testCards.length; j++) {
				testCards[j].style.width = "300px";
			}
			item = e["target"].getAttribute("id");
			testCards[item].style.width = "450px";
		});
	}

	//This is the menu stuff
	menu = document.getElementById("small-menu");
	menuBar = document.getElementById("menu-bar");
	menu.addEventListener("click", ()=>{
		opened = menu.getAttribute("opened");
		if(opened==1){
			menuBar.style.right = "-10em";
			menu.setAttribute("opened", 0);
		} else {
			menuBar.style.right = "0em";
			menu.setAttribute("opened", 1);
		}
	});*/

	/*This will change the call us text*/
	/*callUs = document.getElementById("call-us");
	callUsText = document.getElementById("call-us-text");
	phoneNumber = document.getElementById("phone-number");
	phoneNumberText = document.getElementById("ph-text");

	callUs.addEventListener("click", ()=>{
		opened = callUs.getAttribute("opened");
		if(opened == 0) {
			callUsText.style.width = "55px";
			callUsText.style.textTransform = "uppercase";
			callUsText.innerText = "x";
			callUs.style.width = "55px";
			phoneNumber.style.opacity = "1";
			callUs.setAttribute("opened", 1);
		} else {
			callUsText.style.width = "120px";
			callUsText.style.textTransform = "none";
			callUs.style.width = "120px";
			callUsText.innerText = "Call Us";
			phoneNumber.style.opacity = 0;
			callUs.setAttribute("opened", 0);
		}
	});

	testBlock = document.getElementById("test");
	console.log(testBlock.offsetHeight);
	siteFooter = document.getElementById("site-footer");

	siteHeight = testBlock.offsetHeight + siteFooter.offsetHeight - window.innerHeight;

	progBar = document.getElementById("internal-progress");

	window.addEventListener("scroll", (e)=>{
		console.log(window.pageYOffset);
		console.log(window.pageYOffset / siteHeight);

		perc = window.pageYOffset / siteHeight * 100

		progBar.style.width = perc + "%";

	});*/

	/*openOpts = document.getElementsByClassName("open-options");
	console.log(openOpts);
	openText = document.getElementsByClassName("open-text");

	for(var i = 0; i < openOpts.length; i++) {
		openOpts[i].setAttribute("order", i);
		openOpts[i].addEventListener("mouseenter", (e)=>{
			order = e["target"].getAttribute("order");
			openText[order].style.color = "#000";
			openOpts[order].style.backgroundColor = "#fff";
		});
		openOpts[i].addEventListener("mouseleave", (e)=>{
			console.log("Hello");
			order = e["target"].getAttribute("order");
			openText[order].style.color = "#fff";
			openOpts[order].style.backgroundColor = "transparent";
		});
	}*/

	//This is where the switch will be stored
	switchEl = document.getElementsByClassName("switch-el");
	beforeAfterBlock = document.getElementsByClassName("before-after-switch");
	galleryImages = document.getElementsByClassName('gallery-images')
	beforeAfterTag = document.getElementsByClassName("before-after-tag")
	for(var i = 0; i < switchEl.length; i++) {

		beforeAfterBlock[i].setAttribute("block-number", i);
		beforeAfterBlock[i].setAttribute("block-open", 0);
		switchEl[i].setAttribute("switch-number", i);
		switchEl[i].setAttribute("switch-open", 0);
		beforeAfterBlock[i].addEventListener("click", (e)=>{
			open = e["target"].getAttribute("block-open");
			j = e["target"].getAttribute("block-number");
			if(open == null) {
				open = e["target"].getAttribute("switch-open");
				j = e["target"].getAttribute("switch-number");
			}
			currentImage = galleryImages[j].style.backgroundImage;
			newImage = galleryImages[j].getAttribute("second-pic");
			galleryImages[j].style.backgroundImage = newImage;
			galleryImages[j].setAttribute("second-pic", currentImage);
			if(open == 0) {
				beforeAfterTag[j].innerText = "After";
				beforeAfterTag[j].style.right = "10px";
				deviceWidth = beforeAfterBlock[j].offsetWidth;
				leftVal = deviceWidth - 4.5 - 20
				switchEl[j].style.left = leftVal + "px";
				switchEl[j].setAttribute("switch-open", 1)
				beforeAfterBlock[j].setAttribute("block-open", 1)
			} else {
				beforeAfterTag[j].innerText = "Before";
				beforeAfterTag[j].style.right = "5px";
				switchEl[j].style.left = "2.5px";
				switchEl[j].setAttribute("switch-open", 0)
				beforeAfterBlock[j].setAttribute("block-open", 0)
			}
		})
	}

	testBlock = document.getElementById("services");
	marginT = 0

	mapsBackground = document.getElementById("maps-background");
	siteFooter = document.getElementById("site-footer");

	mapsBackHeight = mapsBackground.offsetHeight;

	if(testBlock == null) {
		testBlock = document.getElementById("body");
		console.log(testBlock);
		mapsBackHeight = 0
	} else {
		styles = testBlock.currentStyle || window.getComputedStyle(testBlock);
		marginT = 90
	}
	siteHeight = testBlock.offsetHeight + marginT + mapsBackHeight + siteFooter.offsetHeight - window.innerHeight;

	console.log(siteHeight)

	progBar = document.getElementById("internal-progress");

	progressIcon = document.getElementById("progress-icon");

	progressIconWidth = progressIcon.offsetWidth;

	window.addEventListener("scroll", (e)=>{

		perc = window.pageYOffset / siteHeight * 100

		progBar.style.width = perc + "%";

		iconLeft = perc - (100 * progressIconWidth / window.innerWidth);

		console.log(iconLeft);
		console.log(perc)
		console.log("------")

		progressIcon.style.left = iconLeft + "%";

	});

	//This is the window resize event
	window.addEventListener("resize", ()=>{
		mapsBackground = document.getElementById("maps-background");
		mapsBackHeight = mapsBackground.offsetHeight;
		testBlock = document.getElementById("services");
		if(testBlock == null) {
			testBlock = document.getElementById("body");
			mapsBackHeight = 0
		}
		
		siteFooter = document.getElementById("site-footer");
		siteHeight = testBlock.offsetHeight + mapsBackHeight + siteFooter.offsetHeight - window.innerHeight;
		console.log("Site Height ->" + siteHeight);

		console.log("Page Offset ->" + window.pageYOffset);
		
		//console.log(window.pageYOffset / siteHeight);

		perc = window.pageYOffset / siteHeight * 100
		console.log(perc);
		console.log("------------")
		pageProgess = document.getElementById("internal-progress")

		pageProgess.style.width = perc + "%";
	});

	//This will prompt the user to call the phone number listed
	callUs = document.getElementById("call-us");
	callUsText = document.getElementById("call-us-text");
	phoneNumber = document.getElementById("phone-number");
	phoneNumberText = document.getElementById("ph-text");
	phoneIcon = document.getElementById("phone");

	callUs.addEventListener("click", ()=>{
		opened = callUs.getAttribute("opened");
		if(opened == 0) {
			callUsText.style.width = "55px";
			callUsText.style.textTransform = "uppercase";
			callUsText.innerText = "x";
			callUs.style.width = "55px";
			phoneNumber.style.opacity = "1";
			callUs.setAttribute("opened", 1);
		} else {
			callUsText.style.width = "120px";
			callUsText.style.textTransform = "none";
			callUs.style.width = "120px";
			callUsText.innerText = "Call Us";
			phoneNumber.style.opacity = 0;
			callUs.setAttribute("opened", 0);
		}
	});

});