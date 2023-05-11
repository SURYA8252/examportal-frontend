import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=[
    {
      cId:'',
      title:''
    }
  ]
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cId:''
    }
  };
  constructor(private _category:CategoryService,private quiz:QuizService) { }

  ngOnInit(): void {
     this._category.categories().subscribe(
       (data:any)=>{
         //Load Categories
         this.categories=data;
         //console.log(this.categories);
       }
       ,
       (error)=>{
         console.log(error);
         Swal.fire('Error !!','Somrthing went wrong !!','error');
       }
     );
  }
  //Add data to quiz
  addQuiz()
  {
    //console.log(this.quizData);
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
      Swal.fire('Error !!','Please fill the title !!','error');
      return;
    }
    //Calling to Server
    this.quiz.addQuiz(this.quizData).subscribe(
      (data)=>
      {
        Swal.fire('Success','Successfully Added !!','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cId:''
          }
        };
      }
      ,
      (error)=>{
        console.log(error);
        Swal.fire('Error','Something went wrong !!','error');
      }
    );
  }
}
