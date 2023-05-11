import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      (params)=>{
        this.catId=params.catId;
        if(this.catId==0)
    {
       //Load All Quiz
       this._quiz.getActiveQuizzess().subscribe(
         (data)=>{
           this.quizzes=data;
         }
         ,
         (error)=>{
           console.log(error);
           this._snack.open('Error while loading all data from server','',{
             duration:3000
           });
         }
       );
    }
    else
    {
      this._quiz.getActiveQuizzessOfCategory(this.catId).subscribe(
        (data)=>{
          this.quizzes=data;
        }
        ,
        (error)=>{
          console.log(error);
          this._snack.open('Something went wrong to server','',{
            duration:3000
          });
        }
      )
    }
      }
    );
  }

}
