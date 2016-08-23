//事件队列机制
var Event = {
	queen: {},
	on: function(eventName, callback) {
		if (!this.queen[eventName]) {
			this.queen[eventName] = [];
		}
		this.queen[eventName].push(callback);
		return this;
	},
	emit: function(eventName) {
		if (this.queen[eventName]) {
			var args = Array.prototype.slice.call(arguments,1);
			this.queen[eventName].forEach(function(item){
				item.apply(this,args);
			})
			return this;
		} else {
			console.log("not bind")
		}
	},
	remove: function (eventName, callback) {
		if (this.queen[eventName]) {
			if (!callback){
				delete this.queen[eventName];
			} else{
				this.queen[eventName].forEach(function(item,i){
					if (this.queen[eventName][i] === callback) {
						break;
					}
					this.queen[eventName].splice(i,1);
				})
			}
		} else{
			console.log("not found this function")
		}
	}
}
Event.on('click', function (a, b) {
  console.log(a+b);
}).on('click', function (a, b) {
  console.log(a-b);
});

Event.emit('click', 1, 2).emit('click', 1, 5);
Event.remove("click");
Event.emit('click',1,2)
