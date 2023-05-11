import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {
  qId:any;
  qTitle:any;
  questions:any=[];
  constructor(private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qId;
    this.qTitle=this._route.snapshot.params.title;
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data)=>{
        this.questions=data;
      }
      ,
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Something went wrong to server !!','error');
      }
    )
  }
  //Delete Question
  deleteQuestion(qId:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure ! Delete this question'
    }).then(
      (result)=>{
        if(result.isConfirmed)
        {
          //confirmed
          this._question.deleteQuestion(qId).subscribe(
            (data)=>{
              Swal.fire('Success !!','Successfully deleted !!','success');
              this.questions=this.questions.filter((q:any)=> q.quesId != qId);
            }
            ,
            (error)=>{
              console.log(error);
              Swal.fire('Error !!','Something went wrong to server !!','error');
            }
          );
        }
      }
    )
  }
}
