function getUrlParam () {
	var url = location.search;
	if (url.indexOf("?") != -1){
		var str = url.substr(1).split("&");
		var obj ={};
		for (var i=0;i<str.length;i++) {
			var item = str[i].split("=");
			var name = decodeURIComponent(item[0]);
			var value = decodeURIComponent(item[1]);
			obj[name] = value;
		}
	}
	return obj;
}