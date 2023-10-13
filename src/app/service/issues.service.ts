import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Issue } from '../ts/interface/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private _issuesSubject: BehaviorSubject<Issue[]>  =new BehaviorSubject<Issue[]>([]);
  public issuesObservable$: Observable<Issue[]> = this._issuesSubject.asObservable();

  private _issueSubject: Subject<Issue> = new Subject<Issue>();


  constructor() { }

  setIssues(issues: Issue[]): void {
    this._issuesSubject.next(issues);
  }

  getIssue(id: string): Observable<Issue | undefined> {
    return this.issuesObservable$.pipe(
      map(issues => {
        return issues.find(issue => {
          return issue.token === id;
        })
      })
    )
  }
}
