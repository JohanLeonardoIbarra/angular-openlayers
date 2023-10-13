import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { OpenLayersComponent } from 'src/app/components/open-layers/open-layers.component';
import { IssuesService } from '../../service/issues.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Issue } from 'src/app/ts/interface/issue.interface';

@Component({
  selector: 'app-mobile-map',
  templateUrl: './mobile-map.component.html',
  styleUrls: ['./mobile-map.component.sass']
})
export class MobileMapComponent implements AfterViewInit {
  @ViewChild(OpenLayersComponent) openLayers!: OpenLayersComponent;

  constructor(
    private readonly issuesService: IssuesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngAfterViewInit(): void {
    combineLatest([this.issuesService.issuesObservable$, this.activatedRoute.queryParams])
      .subscribe(([issues, {lon, lat}]) => {
        this.openLayers.loadMarkers(issues);
        this.openLayers.zoom = 16;
        this.openLayers.moveTo(lon, lat);
      })
  }

  selectIssue(issue: Issue) {
    this.router.navigate(['mobile', 'detail', issue.token])
  }
}
