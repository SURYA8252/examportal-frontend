import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
  //get Question
  public getQuestionOfQuiz(qId:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }
  //Get Singal Question
  public getQuestionOfQuizForTest(qId:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qId}`);
  }
  //add Question
  public addQuestion(question:any)
  {
    return this._http.post(`${baseUrl}/question/`,question);
  }
  //delete question
  public deleteQuestion(quesId:any)
  {
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }
  //Eval Quiz
  public evalQuiz(questions:any)
  {
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
