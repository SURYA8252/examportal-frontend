import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzess:any=[
  {
    qId:'',
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'',
    category:{
      title:''
    }
  }
]
  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data)=>{
        this.quizzess = data;
        console.log(this.quizzess);
        
      }
      ,
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Something went wrong !!','error');
      }
    )
  }
  //delete quiz................
  deleteQuiz(qId:any)
  {
    Swal.fire({
      icon:'info',
      title:'are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzess = this.quizzess.filter((quiz:any) => quiz.qId!=qId);
            Swal.fire('Success','Successfully deleted','success');
          }
          ,
          (error)=>{
            console.log(error);
            Swal.fire('Error','Something went wrong to server !!','error');
          }
        )
      }
    })
  }
}
