import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../service/issues.service';
import { Issue } from 'src/app/ts/interface/issue.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.sass']
})
export class MobileMenuComponent implements OnInit {

  private _issuesList!: Issue[];

  constructor(
    private readonly issuesService: IssuesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.issuesService.issuesObservable$.subscribe((issues) => this._issuesList = issues)
  }

  get issuesList(): Issue[] {
    return this._issuesList;
  }

  goToMap(issue: Issue): void {
    this.router.navigate(['mobile', 'map'], {
      queryParams: {
        'lon': issue.long,
        'lat': issue.lat
      }
    })
  }
}
