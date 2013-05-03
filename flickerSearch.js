//flickerSearch
require([
     "dojo/_base/declare",
	 "dojo/io/script",
     "dijit/_WidgetBase", "dijit/_TemplatedMixin","dojo/dom-construct", "dojo/dom-attr", "dojo/dom-style",
	 "dojo/text!./templates/searchForm.html"
 ], function(declare, ioScript,_WidgetBase, _TemplatedMixin, domConstruct, domAttr, domStyle,template){

     declare("Slideshow", [_WidgetBase, _TemplatedMixin],{ 
		 constructor: function(args){
			console.log(args);
			console.log(this);
			this.imageIndex = 1;
			this.maxImages = args.maxImages;
			this.callBackParamName = "jsoncallback";
			this.url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a4ecc06bdde2b2ffed3c3a49b961cfc9&format=json&per_page=" + this.maxImages;
			//domConstruct.place(this.templateString,args.slideElement);
		 },
         templateString: template,
		 next: function(){
			this.imageIndex++;
			this.imageIndex = (this.imageIndex <= this.maxImages) ? this.imageIndex : 1;
			domStyle.set("slideImages", {
				transform: "translateX("+(this.imageIndex-1) * -400+"px)"
			});
  		 },	
		 prev: function(){
			this.imageIndex--;
			this.imageIndex = (this.imageIndex <= 0) ? this.maxImages : this.imageIndex;
			domStyle.set("slideImages", {
				transform: "translateX("+(this.imageIndex-1) * -400+"px)"
			});
		 },
		 play: function(){
			domStyle.set("slideImages", {
				transform: "translateX("+(this.maxImages-1) * -400+"px)"
			});
			this.imageIndex = this.maxImages;
		},
		stop: function(){
			domStyle.set("slideImages", {
				transform: "translateX("+0+"px)"
			});
			this.imageIndex = 1;
		},
	     search : function(){
				ioScript.get({
                url : this.url,
                callbackParamName: this.callBackParamName,
                content:{ text : domAttr.get("searchBox", "value")},
                   load : function(response, ioArgs) {
                            console.log(response);   
							var i=0, photos = response.photos.photo, photoLength = photos.length;
							domConstruct.empty("slideImages");
							while(i < photoLength) {
								domAttr.set(domConstruct.place("<img width='400px' height='400px'>", "slideImages"),"src", "http://farm"+photos[i].farm+".staticflickr.com/"+photos[i].server+"/"+photos[i].id+"_"+photos[i].secret+".jpg");
									i++;
							}
                   },
                   error : function(response, ioArgs) {
                            console.log("error");
                            console.log(response);
                            return response;           
                  }
            });
        }     
	 });
 });