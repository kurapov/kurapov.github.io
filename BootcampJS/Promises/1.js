let do1 = () => Promise.resolve();
// let do2 = () => {return 'FOO'};
let do2 = () => {throw 'FOO'};
do1()
.then(  )
.then((msg) => alert('Success: '+msg))
.catch((msg) => alert('Fail: '+msg))


//1 () => do2()
//2 () => { do2() } 
//3 do2
//4 do2()