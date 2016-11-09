do3 = () => Promise.resolve('do3');
// do4 = () => Promise.resolve('do4');
do4 = () => Promise.reject('do4');
do5 = () => Promise.resolve('do5');

Promise.all([do3(), do4(), do5()])
.then((msg) => alert('Success '+ msg))
.catch((msg) => alert('Fail '+ msg))


//Promise.all([do3(), do4(), do5()])