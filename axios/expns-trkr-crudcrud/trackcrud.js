var f1=document.getElementById("form1");
var ul=document.getElementById("items");

f1.addEventListener("submit",onsubmit);

function onsubmit(e){
    e.preventDefault();
    

    var eamt=document.getElementById("expamount").value;
    var d=document.getElementById("desc").value;
    var c=document.getElementById("category").value;


    var obj1={
        expamt:eamt,
        desc:d,
        category:c

    }
    //new update to demonstrate async await
    async function addexpense(){
    await axios.post('https://crudcrud.com/api/ba75ba302d0f4b9285b2a5793cbab617/exp-trkr',obj1)
    .then(response=>showonscreen(response.data))
    .catch(e=>console.log(e));
     // New update to clear inputs after submit
    await (document.getElementById("expamount").value="");
    await (document.getElementById("desc").value="");
    await (document.getElementById("category").value="");
    }
    addexpense();

}
    function showonscreen(obj){

    var li=document.createElement("li");
    var edit=document.createElement("button");
    var del=document.createElement("button");
    li.className="itemlist";
    li.id=obj._id;
    console.log(li);
   
    li.textContent=`${obj.expamt}-${obj.desc}- ${obj.category}  `;
    del.setAttribute('onclick',`deleteexp('${li.id}')`);
    edit.setAttribute('onclick',`editexp('${li.id}')`);
    edit.textContent="Edit Expense";
    del.textContent="Delete Expense";
    edit.setAttribute('class','btn btn-outline-secondary  me-3');
    del.setAttribute('class','btn btn-outline-secondary me-3');
    li.appendChild(del);
    li.appendChild(edit);
    ul.appendChild(li);
    
    
}
function deleteexp(id1){
    console.log("del was clicked");
    
    //localStorage.removeItem(id1);
    axios.delete(`https://crudcrud.com/api/ba75ba302d0f4b9285b2a5793cbab617/exp-trkr/${id1}`)
    .then(()=>{
        var childnode=document.getElementById(id1);
    ul.removeChild(childnode);
    })
    .catch(e=>console.log(e));
}

function editexp(id1){
    axios.get(`https://crudcrud.com/api/ba75ba302d0f4b9285b2a5793cbab617/exp-trkr/${id1}`)
    .then(response=>{

    document.getElementById("expamount").value=response.data.expamt;
    document.getElementById("desc").value=response.data.desc;
    document.getElementById("category").value=response.data.category;
    deleteexp(id1);
    })   
   
}

window.addEventListener("DOMContentLoaded",getdata);
function getdata(){
    axios.get('https://crudcrud.com/api/ba75ba302d0f4b9285b2a5793cbab617/exp-trkr')
    .then(response=>{
        for(var i=0;i<response.data.length;i++){
            showonscreen(response.data[i]);
        }
    })
}