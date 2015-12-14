app = {
	createElement: function(params){

		var el = document.createElement(params.tag);

		if(params.innerHtml)
			el.innerHTML = params.innerHtml;

		if(params.type)
			el.type = params.type;

		if(params.name)
			el.name = params.name;

		if(params.value)
			el.value = params.value;

		if(params.classList)
		{
			for (var i = 0; i < params.classList.length; i++) {
				el.classList.add(params.classList[i]);
			}
		}

		if(params.draw)
			this.drawElement(el, params.perent);

		return el;
	},

	drawElement: function(element, perent){
		perent.appendChild(element);
	},

	createQuestionBlock: function(params){
		var questionBlock = this.createElement({
			tag: 'div',
			perent: params.perent,
			classList: ['question'],
			draw: true
		});

		this.createElement({
			tag: 'h3',
			innerHtml: params.blockTitle,
			perent: questionBlock,
			draw: true
		});


		if(params.answers)
		{
			for (var i = 0; i < params.answers.length; i++) {
				var label = this.createElement({
					tag: 'label',
					innerHtml: params.answers[i],
					classList: ['answer-item']
				});

				var cb = this.createElement({
					tag: 'input',
					type: 'checkBox',
					name: params.name,
				});

				label.insertBefore(cb, label.childNodes[0]);

				this.drawElement(label, questionBlock);
			}
		}
	},

	createQuestions: function(perent, count){
		var questionsWrapper = app.createElement({
			tag: 'div',
			perent: perent,
			classList: ['questions-wrapper'],
			draw: true
		});

		for (var i = 1; i <= count; i++) {	
			this.createQuestionBlock({
				blockTitle: 'Вопрос №' + i,
				name: 'question' + i,
				perent: questionsWrapper,
				answers: [
				'Вариант ответа №1',
				'Вариант ответа №2',
				'Вариант ответа №3'
				],
				draw: true
			})
		}
	}
}


var body = document.querySelector('body');

var wrapper = app.createElement({
	tag: 'div',
	perent: body,
	classList: ['wrapper'],
	draw: true
})

app.createElement({
	tag: 'h1',
	innerHtml: 'Тест по программированию',
	perent: wrapper,
	draw: true
})

app.createQuestions(wrapper, 3);

app.createElement({
	tag: 'input',
	type: 'submit',
	value: 'Проверить мои результаты',
	perent: wrapper,
	classList: ['send-results'],
	draw: true
})