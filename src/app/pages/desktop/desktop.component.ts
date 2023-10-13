import { AfterViewInit, Component, ViewChild } from '@angular/core';
import DeviceSize from '../../ts/enums/device-sizes.enum';
import { HttpService } from '../../service/http.service';
import { Issue } from '../../ts/interface/issue.interface';
import { OpenLayersComponent } from '../../components/open-layers/open-layers.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-map',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.sass']
})
export class DesktopComponent implements AfterViewInit {
  @ViewChild(OpenLayersComponent) map!: OpenLayersComponent;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @ViewChild(ModalComponent) modal!: ModalComponent;

  private _issues: Issue[];
  private _windowSize!: DeviceSize;

  constructor(private httpService: HttpService) {
    this._issues = [];
    this.handleWindowResize();
  }

  ngAfterViewInit(): void {
    this.httpService.getIssues().subscribe({
      next: (issues: Issue[]) => {
        this._issues = issues;
        this.map.loadMarkers(this.issues);
        this.map.zoom = 16;
      }
    })
  }

  get sidebarOpened(): boolean {
    return this._windowSize === DeviceSize.Desktop;
  }

  get sidebarWidth(): string {
    return this._windowSize === DeviceSize.Desktop? '25%' : '99%';
  }

  get issues(): Issue[] {
    return this._issues;
  }

  get isMobile() {
    return this._windowSize == DeviceSize.Mobile;
  }

  handleWindowResize() {
    if (window.innerWidth < DeviceSize.Mobile) {
      this._windowSize = DeviceSize.Mobile
    } else {
      this._windowSize = DeviceSize.Desktop
    }
  }

  changeMapPosition(issue: Issue) {
    this.map.moveTo(issue.long, issue.lat)

    if (this.isMobile) {
      this.sidebar.toggleSideNav();
    }
  }

  toggleSidenav() {
    this.sidebar.toggleSideNav();
  }

  selectIssue(issue: Issue): void {
    this.modal.show(issue);
  }
}
