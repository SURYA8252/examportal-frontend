import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId:any;
  quiz:any={};
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _snack:MatSnackBar,private _router:Router) { }

  ngOnInit(): void {
     this.qId=this._route.snapshot.params.qId;
     this._quiz.getQuiz(this.qId).subscribe(
       (data)=>{
         this.quiz=data;
         //console.log(this.quiz);
         
       }
       ,(error)=>{
         console.log(error);
         this._snack.open('Something went wrong to server side','',{
           duration:3000
         });
       }
     );
  }
  startQuiz()
  {
    Swal.fire(
      {
        title:'Do you want to start the quiz?',
        showDenyButton:true,
        showCancelButton:true,
        confirmButtonText:'start',
        denyButtonText:"Don't Start",
        icon:'info'
      }).then((result)=>{
        if(result.isConfirmed)
        {
          this._router.navigate(['/start/'+this.qId]);
        }
      })
  }
}
