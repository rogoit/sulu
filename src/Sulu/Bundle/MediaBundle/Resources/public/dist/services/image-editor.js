define(["config","jquery"],function(a,b){"use strict";var c;return a.get("sulu-media").adobeCreativeKey&&require(["//feather.aviary.com/imaging/v3/editor.js"],function(){c=new Aviary.Feather({apiKey:a.get("sulu-media").adobeCreativeKey,fileFormat:"png",theme:"minimum",enableCORS:!0,language:app.sandbox.sulu.user.locale})}),{editingIsPossible:function(){return!!a.get("sulu-media").adobeCreativeKey},editImage:function(a){var d,e,f=b.Deferred();return c?(e=location.protocol+"//"+location.host+a,d=b('<img src="'+e+'"/>'),d.on("load",function(){c.launch({image:d,url:e,onSave:function(a,b){c.close(),f.resolve(b)},onClose:function(){d.remove()}})}.bind(this)),b("body").append(d),f):(f.reject(),f)}}});