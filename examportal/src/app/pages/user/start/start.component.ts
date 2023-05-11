import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qId:any;
  questions:any;
  timer:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  constructor(private _locationSt:LocationStrategy,private _route:ActivatedRoute,private _snack:MatSnackBar,private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId=this._route.snapshot.params.qId;
    this.loadQuestions();
  }
  preventBackButton()
  {
    history.pushState(null,'null',location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,'null',location.href);
    });
  }
  loadQuestions()
  {
    this._question.getQuestionOfQuizForTest(this.qId).subscribe((data)=>{
    this.questions=data;
    this.timer = this.questions.length * 2 * 60;
    //console.log(this.questions);
    this.questions.forEach(
      (q:any)=>{
        q['givenAnswer']=''
      }
    )
    this.startTimer();
    }
    ,
    (error)=>{
      console.log(error);
      this._snack.open('Something went to server','',{
        duration:5000
      });
    }
    );
  }
  submitQuiz()
  {
    Swal.fire({
      title:'Do you want the submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed)
      {
        this.evalQuiz();  
      }
    });
  }
  startTimer()
  {
    let t=window.setInterval(()=>{
      //Code
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }
      else
      {
        this.timer--;
      }
    },1000);
  }
  getFormatTime()
  {
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }
  evalQuiz()
  {
    //calcuation
    // this.isSubmit=true;
    // this.questions.forEach((q:any)=>{
    //    if(q.givenAnswer==q.answer)
    //    {
    //      this.correctAnswers++;
    //      var markSingal=this.questions[0].quiz.maxMarks/this.questions.length;
    //      this.marksGot +=markSingal;
    //    }
    //    if(q.givenAnswer.trim()!='')
    //    {
    //      this.attempted++;
    //    }
    // });

    //Calling to server check the question and answer
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted;
        this.isSubmit=true;
      }
      ,
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Something went wrong to server','error');
      }
    );
  }
  printPage()
  {
    window.print();
  }
}
