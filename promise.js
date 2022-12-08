var posts=[{title:'post one',body:'This is post one'},
{title:'post two',body:'This is post two'}];
console.log(posts.length);

function getpost(){
    setTimeout(()=>{
        let output='';
        posts.forEach((p)=>{
            output+=`<li>${p.title}</li>`;
            
        });
        document.body.innerHTML=output;

    },1000);
}

function createpost(post){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            posts.push(post);
            const error=false;
            if (!error)
            {
                resolve();
                
            }
            else{
                reject('error:something went wrong');
            }
        },2000);
    });
}

function deletepost(){

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            
            //const error=false;
            if (posts.length>0)
            {
               
                resolve(posts.pop());
                
            }
            else if (posts.length==0){
                reject("No more posts to delete");
                console.log(posts.length);
            }
        },1000)
    })
}

createpost({title:'post three',body:'This is post three'})
.then(()=>{
getpost();
deletepost().then(()=>{
    getpost();
    deletepost().then(()=>{
        getpost();
        deletepost().then(()=>{
            getpost();
            deletepost().then(getpost).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
}).catch(err=>console.log(err));
}).catch(err=>console.log(err));
getpost();
createpost({title:'post four',body:'This is post four'}).then(()=>{
    getpost();
    setTimeout(()=>{
     deletepost().then(getpost);
    },1000)
    
 });
 
//promise.all
var p1=Promise.resolve("hello world");
var p2=10;
var p3=new Promise((resolve,reject)=>{
setTimeout(resolve,2000,"good bye");
});
Promise.all([p1,p2,p3]).then(values=>console.log(values));

var t;
function updatelastuseravtivitytime(){
    return new Promise((resolve)=>{
         t=new Date();
        resolve(t);
        
    });
}
createpost({title:'post 5', body:'This is post 5'}).then(()=>{
    setTimeout(()=>{
        updatelastuseravtivitytime().then(()=>{
            posts.forEach(p=>{console.log(p)});

            console.log(t);
    },1000)
    });
});

//var pp1=Promise.resolve(createpost({title:'post 6',body:'This is post 6'}));
//var pp2=Promise.resolve(setTimeout(updatelastuseravtivitytime),1000);
//Promise.all([pp1,pp2]).then(()=>{
//    console.log(posts);
//    console.log(t);
//})
