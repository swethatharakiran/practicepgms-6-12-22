var emp={age:20,
name:"prem"}

var add=function(a,b,c){
    return this.age+a+b+c;
}

console.log(add.call(emp,1,2,3));
var arr=[1,2,4];
console.log(add.apply(emp,arr));
var bound=add.bind(emp);
console.log(bound(1,2,3));

var student={age:20}

var printage=function(){
    console.log(this.age);

}

printage.call(student);
printage.apply(student);
var b=printage.bind(student);
b();
