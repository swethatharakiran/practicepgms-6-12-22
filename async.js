console.log("person 1:shows ticket");
console.log("person 2.shows ticket");
const prom1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('ticket');
    },3000);
});

const getpopcorn=prom1.then(t=>{
    console.log("hubsnd:we should go");
    console.log("wife: I am hungry");
    return new Promise((resolve,reject)=>{
        resolve(`${t} popcorn`);
    });
});

const getbutter=getpopcorn.then((t)=>{
    console.log("we should go in");
    console.log("I need butter on popcorn");
    return new Promise((resolve,reject)=>{
        resolve(`${t} butter`);
    });
});
const addcoke=getbutter.then((t)=>{
    console.log("I need coke");
    return new Promise((resolve,reject)=>{
        resolve(`${t} coke`);
    })
})
addcoke.then(t=>console.log(t));
