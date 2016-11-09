var Event = function (id, name, date) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.handlers = [];
};
Event.prototype = {
    subscribe: function (msg, notificateDate) {
        var self = this;
        let timeout = notificateDate
            ? notificateDate - new Date(Date.now())
            : this.date - new Date(Date.now());

        var id = this.setAction(msg, timeout, this.handlers.length);
        this.handlers.push(new Object({
            id,
            msg,
            date: notificateDate || this.date
        }));
        Notifier.getInstance().updateStorage();

        return function unsubscribe() {
            clearTimeout(id);
            self.handlers = self.handlers.filter(h => h !== id);
            Notifier.getInstance().updateStorage();
        }
    },
    unsubscribeAll: function () {
        this.handlers.forEach(handler => clearTimeout(handler.id));
        this.handlers = [];
        Notifier.getInstance().updateStorage();
    },
    notificate: function (params) {
        this.handlers.forEach(handler => alert(handler.msg));
    },
    setAction: function (msg, timeout, handlerIdx) {
        self = this;
        setTimeout(() => {
            alert(msg);
            self.handlers.splice(handlerIdx, 1);
            Notifier.getInstance().updateStorage();
        }, timeout)
    }
}

EventStorage = {
    getData: () => {
        try {
            return JSON.parse(localStorage.getItem('events'));
        } catch (ex) {
            console.error(`Cann\`t fetch from local storage: ${ex}`);
            return null;
        }
    },
    updateStorage: (data) => localStorage.setItem('events', JSON.stringify(data))
}

var Notifier = (function () {
    var instance;
    function createInstance() {
        function reinitSubscribers() {
            for (let i = 0; i < this.handlers.length; i++) {
                let notificateTicks = Date.parse(this.handlers[i].date) - Date.now();
                if (notificateTicks <= 0) {
                    console.log(`The skipped notify at ${this.handlers[i].date} for event - "${this.name}"`);
                    this.handlers.splice(i, 1);
                } else {
                    this.handlers[i].id = this.setAction(this.handlers[i].msg, notificateTicks);
                }
            }
        }

        var obj = function () {
            this.events = EventStorage.getData() || [];
            this.events.forEach(item => {
                item.__proto__ = Event.prototype;
                reinitSubscribers.call(item);
            });
            this.updateStorage();
        }
        obj.prototype = {
            addEvent: function (name, date) {
                let id = this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 0;
                let event = new Event(id, name, date);
                event.subscribe(name, date);
                this.events.push(event);
                this.updateStorage();
            },
            removeEvent: function (id) {
                var index = this.events.findIndex(e => e.id === id);
                this.events[index].unsubscribeAll();
                this.events.splice(index, 1);
                this.updateStorage();
            },
            getEvents: function () {
                return this.events;
            },
            getEventById: function (id) {
                return this.events[this.events.findIndex(e => e.id === id)];
            },
            updateStorage: function () {
                EventStorage.updateStorage(this.events);
            }
        }
        return new obj();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();

var notifier = Notifier.getInstance();

// console.log(notifier.getEvents());

notifier.addEvent('first event', new Date(Date.now() + 10000));

// notifier.getEventById(0).subscribe('3s: Всех с Новым Годом!', new Date(Date.now() + 3000));
// let firstNotificateUnsubscribe = notifier.getEventById(0).subscribe('1s: Всех с Новым Годом!', new Date(Date.now() + 1000));
// firstNotificateUnsubscribe();

// notifier.removeEvent(0);
// notifier.getEventById(0).unsubscribeAll();