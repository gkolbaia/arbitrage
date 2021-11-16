import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-meetings-table',
  templateUrl: './case-meetings-table.component.html',
  styleUrls: ['./case-meetings-table.component.scss'],
})
export class CaseMeetingsTableComponent implements OnInit {
  @Input() data?: any;
  dataSource: any[] = [];
  constructor() {}
  displayedColumns = ['date'];

  ngOnInit(): void {
    console.log(this.data);
    this.dataSource = this.data?.arbitrageMeetings;
    this.dataSource = this.data?.arbitrageMeetings.sort(
      (a: { type: string; date: Date }, b: { type: string; date: Date }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}
