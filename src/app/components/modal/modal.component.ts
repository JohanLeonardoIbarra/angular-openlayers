import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/ts/interface/issue.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  private _issue: Issue | null;

  constructor() {
    this._issue = null;
  }

  ngOnInit(): void {
  }

  get issue(): Issue | null {
    return this._issue;
  }

  close(): void {
    this._issue = null;
  }

  show(issue: Issue): void {
    this._issue = issue;
  }
}
