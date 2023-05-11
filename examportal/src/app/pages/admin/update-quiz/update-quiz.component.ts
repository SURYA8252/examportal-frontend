import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  qId=0;
  quiz:any;
  categories:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _categorys:CategoryService,private _router:Router) { }

  ngOnInit(): void {
     this.qId=this._route.snapshot.params.qId;
     //alert(this.qId);
     this._quiz.getQuiz(this.qId).subscribe(
       (data)=>{
         this.quiz=data;
       }
       ,
       (error)=>{
         console.log(error);
         Swal.fire('Error','Error to server side not fetch the data','error');
       }
     );
     this._categorys.categories().subscribe(
       (data)=>{
         this.categories=data;
       }
       ,
       (error)=>{
         console.log(error);
         Swal.fire('Error','Error in loading category !!','error');
       }
     )
  }
  updateQuizes()
  {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        //this.quiz=data;
        Swal.fire('Success !!','Successfully updated !!','success').then(
          (e)=>{
            this._router.navigate(['/dashboard/quizzes']);
          }
        );
      }
      ,
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Something went wrong !!','error');
      }
    );
  }
}
