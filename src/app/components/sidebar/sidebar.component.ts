import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Issue } from '../../ts/interface/issue.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {
  @Input('opened') alwaysOpen: boolean;
  @Input('issues') issues!: Issue[];
  @Input('width') width: string;
  @Output('moveTo') private positionEmitter: EventEmitter<Issue>; 
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor() {
    this.alwaysOpen = false;
    this.positionEmitter = new EventEmitter();
    this.width = '100%';
  }

  moveTo(issue: Issue): void {
    this.positionEmitter.emit(issue);
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }
}
