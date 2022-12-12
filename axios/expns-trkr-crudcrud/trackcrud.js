var f1=document.getElementById("form1");
var ul=document.getElementById("items");
//var count=0;
f1.addEventListener("submit",onsubmit);

function onsubmit(e){
    e.preventDefault();
    //count=count+1;

    var eamt=document.getElementById("expamount").value;
    var d=document.getElementById("desc").value;
    var c=document.getElementById("category").value;

    var obj1={
        expamt:eamt,
        desc:d,
        category:c

    }
    axios.post('https://crudcrud.com/api/be667177c97a493c9d16a61e2be68639/exp-trkr',obj1)
    .then(response=>showonscreen(response.data))
    .catch(e=>console.log(e));
}
    function showonscreen(obj){

    var li=document.createElement("li");
    var edit=document.createElement("button");
    var del=document.createElement("button");
    li.className="itemlist";
    li.id=obj._id;
    console.log(li);
   
    li.textContent=`${obj.expamt}-${obj.desc}- ${obj.category}`;
    del.setAttribute('onclick',`deleteexp('${li.id}')`);
    edit.setAttribute('onclick',`editexp('${li.id}')`);
    edit.textContent="Edit Expense";
    del.textContent="Delete Expense";
    li.appendChild(del);
    li.appendChild(edit);
    ul.appendChild(li);
    //var obj1=[f1.expamount.value,f1.desc.value,f1.category.value]
    //localStorage.setItem(count,obj1);
    
}
function deleteexp(id1){
    console.log("del was clicked");
    
    //localStorage.removeItem(id1);
    axios.delete(`https://crudcrud.com/api/be667177c97a493c9d16a61e2be68639/exp-trkr/${id1}`)
    .then(()=>{
        var childnode=document.getElementById(id1);
    ul.removeChild(childnode);
    })
    .catch(e=>console.log(e));
}

function editexp(id1){
    axios.get(`https://crudcrud.com/api/be667177c97a493c9d16a61e2be68639/exp-trkr/${id1}`)
    .then(response=>{

    document.getElementById("expamount").value=response.data.expamt;
    document.getElementById("desc").value=response.data.desc;
    document.getElementById("category").value=response.data.category;
    deleteexp(id1);
    })   
   
}

window.addEventListener("DOMContentLoaded",getdata);
function getdata(){
    axios.get('https://crudcrud.com/api/be667177c97a493c9d16a61e2be68639/exp-trkr')
    .then(response=>{
        for(var i=0;i<response.data.length;i++){
            showonscreen(response.data[i]);
        }
    })
}