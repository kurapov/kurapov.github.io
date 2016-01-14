var timer = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	miliseconds: 0,
	elements: {
		hours: document.getElementById('hours'),
		minutes: document.getElementById('minutes'),
		seconds: document.getElementById('seconds'),
		miliseconds: document.getElementById('miliseconds'),
		splitContainer: document.querySelector('.splitContainer')
	},
	render: function() {
		this.elements.hours.innerHTML = this.hours > 9 ? this.hours : '0' + this.hours;
		this.elements.minutes.innerHTML = this.minutes > 9 ? this.minutes : '0' + this.minutes;
		this.elements.seconds.innerHTML = this.seconds > 9 ? this.seconds : '0' + this.seconds;
		this.elements.miliseconds.innerHTML = this._convertMiliseconds(this.miliseconds);
	},
	start: function() {
		var self = this;

		self.interval = setInterval(function(){
			self.miliseconds += 4;

			if(self.miliseconds >= 1000)
			{
				self.miliseconds = 0;
				self.seconds++;

				if(self.seconds >= 60)
				{
					self.seconds = 0;
					self.minutes++;
					
					if(self.minutes >= 60)
					{
						self.minutes = 0;
						self.hours++;
					}
				}
			}

			self.render();
		}, 4);
	},
	pause: function(){
		var self = this;
		clearInterval(self.interval);
	},
	split: function(splitText){
		var self = this;

		var row = document.createElement('ul');
		var hours = document.createElement('li');
		var minutes = document.createElement('li');
		var seconds = document.createElement('li');
		var miliseconds = document.createElement('li');
		var splitTextEl = document.createElement('span');


		row.classList.add('splitter');
		splitTextEl.classList.add('splitText');

		hours.innerHTML = self.hours > 9 ? self.hours : '0' + self.hours;
		minutes.innerHTML = self.minutes > 9 ? self.minutes : '0' + self.minutes;
		seconds.innerHTML = self.seconds > 9 ? self.seconds : '0' + self.seconds;
		miliseconds.innerHTML = self._convertMiliseconds(self.miliseconds);
		splitTextEl.innerHTML = splitText || 'split';

		row.appendChild(hours);
		row.appendChild(minutes);
		row.appendChild(seconds);
		row.appendChild(miliseconds);
		row.appendChild(splitTextEl);

		this.elements.splitContainer.appendChild(row);
	},
	stop: function(){
		this.pause();
		this.split('stop');
		this.reset();
	},
	reset: function(){
		this.hours = this.minutes = this.seconds = this.miliseconds = 0;
		this.render();
	},
	_convertMiliseconds: function(val){
		var ms = val;
		if(val < 10 )
			ms = '00' + val;	
		else if(val < 100 )
			ms = '0' + val;

		return ms;
	}
}

var app = {
	startTimer: function(){
		timer.start();
		bStart.removeEventListener('click', app.startTimer);
		bStart.addEventListener('click', app.pauseTimer);
		bStart.innerHTML = 'Pause';
		// bStart.classList.remove('btn-success');
		// bStart.classList.add('btn-warning');
	},
	pauseTimer: function(){
		timer.pause();
		bStart.removeEventListener('click', app.pauseTimer);
		bStart.addEventListener('click', app.startTimer);
		bStart.innerHTML = 'Start';
	},
	splitTimer: function(){
		timer.split();
	},
	resetTimer: function(){
		timer.reset();
	},
	stopTimer: function(){
		timer.stop();
		bStart.removeEventListener('click', app.pauseTimer);
		bStart.addEventListener('click', app.startTimer);
		bStart.innerHTML = 'Start';
	}
}

var bStart = document.getElementById('bStart');
var bSplit = document.getElementById('bSplit');
var bStop = document.getElementById('bStop');
var bReset = document.getElementById('bReset');

bStart.addEventListener('click', app.startTimer);
bSplit.addEventListener('click', app.splitTimer);
bReset.addEventListener('click', app.resetTimer);
bStop.addEventListener('click', app.stopTimer);

	// bStart.removeEventListener('click');

// document.getElementById('bStop').addEventListener('click', function(){
// 	timer.stop();
// });