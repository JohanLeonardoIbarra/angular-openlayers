import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Issue } from 'src/app/ts/interface/issue.interface';
import { IssuesService } from '../../service/issues.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.sass']
})
export class MobileComponent implements OnInit {
  constructor(private readonly httpService: HttpService, private readonly issuesService: IssuesService) {}

  ngOnInit(): void {
    this.httpService.getIssues().subscribe({
      next: (issues: Issue[]) => {
        this.issuesService.setIssues(issues)
      }
    })
  }
}
