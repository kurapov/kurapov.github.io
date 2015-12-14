app = {
	
	names: [],

	insertNames: function(count){
		this.names.length = 0;
		for (var i = 1; i <= count; i++) {
			this.names[i] = prompt('Please, enter name ' + i);
		}
	},

	checkName: function(){
		var name = prompt('Please, enter checking name');
		for (var i = 1; i <= this.names.length; i++) {
			if (name === this.names[i]) {
				alert(name + ', вы успешно вошли');
				return;
			}
		}
		alert('Ошибка, совпадений не найдено');
	},

	pow: function(num, count){
		var res = 1;
		for (var i = 0; i < count; i++) {
			res *= num;
		}

		console.log(res);
	}
}

app.pow(2, 8);

app.insertNames(5);
app.checkName();