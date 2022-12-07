var f1=document.getElementById("form1");
var ul=document.getElementById("items");
var count=0;
f1.addEventListener("submit",onsubmit);
function onsubmit(e){
    e.preventDefault();
    count=count+1;
    var li=document.createElement("li");
    var edit=document.createElement("button");
    var del=document.createElement("button");
    li.className="itemlist";
    li.id=count;
    console.log(li.id);
    console.log(li);
   
    li.textContent=`${f1.expamount.value}-${f1.desc.value}- ${f1.category.value}`;
    del.setAttribute('onclick',`deleteexp('${li.id}')`);
    edit.setAttribute('onclick',`editexp('${li.id}','${f1.expamount.value}','${f1.desc.value}','${f1.category.value}')`);
    edit.textContent="Edit Expense";
    del.textContent="Delete Expense";
    li.appendChild(del);
    li.appendChild(edit);
    ul.appendChild(li);
    var obj1=[f1.expamount.value,f1.desc.value,f1.category.value]
    localStorage.setItem(count,obj1);
    
}
function deleteexp(id1){
    console.log("del was clicked");
    var childnode=document.getElementById(id1);
    ul.removeChild(childnode);
    localStorage.removeItem(id1);
}

function editexp(id1,amt,des,cat){
    var chilnodeedit=document.getElementById(id1);
    document.getElementById("expamount").value=amt;
    document.getElementById("desc").value=des;
    document.getElementById("category").value=cat;
    deleteexp(id1);


}
