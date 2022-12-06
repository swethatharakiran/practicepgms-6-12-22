class Student{
    static count=0;
    constructor(name,age,phone,marks){
    this.name=name,
    this.age=age,
    this.phone=phone,
    this.marks=marks
    Student.count=Student.count+1;
    }
    eligible(){
       
       if(this.marks>40)
      {
         console.log("eligible");
      }
    else
    {
    console.log("not eligible");
    }
    }
    static stucount(){
        console.log(Student.count);
    }
    eligible_for_placements(mbm){
        return (ag)=>{
            if (this.marks>=mbm && this.age>=ag)
            return true;
            else
            return false;
        };

    }
    }
    var s=[];
    s[0]=new Student("tata","20","12345",50);
     s[1]=new Student("birla","21","12346",10);
    s[2]=new Student("ambani","19","12347",60);
    s[3]=new Student("kirloskar","18","12348",80);
    s[4]=new Student("bajaj","20","12349",70);
    console.log(s[2]);
    s[2].eligible();
    Student.stucount();
    for(let i=0;i<Student.count;i++){
    console.log(s[i].eligible_for_placements(60)(19));
    }

    let square=(a)=>{ return a*a};
    console.log(square(2));
