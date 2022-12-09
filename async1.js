console.log("person 1.shows ticket");
console.log("person 2.shows ticket");

const premovie=async()=>{

    const prom1=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('ticket');
        },3000);
    });
    const getpopcorn=new Promise((resolve,reject)=>{
        resolve('popcorn');
    });
    const getbutter=new Promise((resolve,reject)=>{
        resolve('butter');
    });
    const getcolddrink=new Promise((resolve,reject)=>{
        resolve('coke');
    });

    let tkt=await prom1;
    let [popcorn,butter,coke]=await Promise.all([getpopcorn,getbutter,getcolddrink]);
    console.log(`${tkt} ${popcorn} ${butter} ${coke}`);
    return 'ticket';
}

premovie().then(m=>{
    
    console.log(`person 3 : shows ${m}`);
});