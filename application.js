require(["dojo/_base/window","dojo/ready"],function(win,ready){
	ready(function(){	
		(new Slideshow({maxImages: 5})).placeAt("slideshow");
	});
});