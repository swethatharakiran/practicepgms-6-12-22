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
                resolve('pushed');
                
            }
            else{
                reject('error:something went wrong');
            }
        },1000);
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
            //console.log(posts.length);
        }
    },2000);

});
     }

     getpost();
     const f1=async()=>{

        const a=await createpost({title:'post 3',body:'This is post 3'});
        //console.log(a);
        getpost();
        const b=await deletepost();
        //console.log(b);
        getpost();
        createpost({title:'post 5', body:'This is post 5'});
        
     }

 f1().then(getpost);



