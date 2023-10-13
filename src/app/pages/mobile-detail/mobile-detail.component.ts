import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../service/issues.service';
import { ActivatedRoute } from '@angular/router';
import { Issue } from 'src/app/ts/interface/issue.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-mobile-detail',
  templateUrl: './mobile-detail.component.html',
  styleUrls: ['./mobile-detail.component.sass']
})
export class MobileDetailComponent implements OnInit {

  private _issue!: Issue | undefined;

  constructor(
    private readonly location: Location,
    private readonly issuesService: IssuesService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(
          ({id}) => {
            return this.issuesService.getIssue(id)
          }
        )
      )
      .subscribe((issue) => {
        this._issue = issue;
      })
  }

  get issue(): Issue | undefined {
    return this._issue;
  }

  goBack() {
    this.location.back();
  }
}
