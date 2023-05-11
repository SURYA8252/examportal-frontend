import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  
  qId:any;
  qTitle:any;
  question=
  {
    quiz: {
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };
  constructor(private _route:ActivatedRoute,private _ques:QuestionService) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qId;
    this.qTitle=this._route.snapshot.params.title;
    this.question.quiz['qId']=this.qId;
  }
  questionSubmit()
  {
    
    if(this.question.content.trim()=='' || this.question.content==null)
    {
      Swal.fire('Error','please enter a valid question content !!','error');
      return;
    }
    this._ques.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Sucess !!','Seccessfully added question','success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      }
      ,
      (error)=>{
        console.log(error);
        Swal.fire('Error','Something went wrong to server','error');
      }
      
    );
  }
}
