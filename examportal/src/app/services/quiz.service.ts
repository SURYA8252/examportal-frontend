import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }
  //get quiz data
  public quizzes()
  {
    return this._http.get(`${baseUrl}/quiz/`);
  }
  //Add Quiz..................
  public addQuiz(quiz:any)
  {
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }
  //Delete Quiz.............
  public deleteQuiz(qId:any)
  {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }
  //get singal quiz data load to server
  public getQuiz(qId:any)
  {
     return this._http.get(`${baseUrl}/quiz/${qId}`);
  }
  //update quiz data
  public updateQuiz(quiz:any)
  {
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }
  //get Quizzes of Category
  public getQuizzessOfCategory(cId:any)
  {
    return this._http.get(`${baseUrl}/quiz/category/${cId}`);
  }
  //Get Active Quizzess
  public getActiveQuizzess()
  {
    return this._http.get(`${baseUrl}/quiz/active`);
  }
  //get Active Quiz of Category
  public getActiveQuizzessOfCategory(cId:any)
  {
    return this._http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}
