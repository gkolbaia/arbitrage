import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cases-table',
  templateUrl: './cases-table.component.html',
  styleUrls: ['./cases-table.component.scss'],
})
export class CasesTableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'actions'];
  @Input() dataSource?: any[];
  @Input() tableName?: string;
  @Input() page?: {
    number: number;
    total: number;
    size: number;
  };
  constructor() {}

  ngOnInit(): void {}
  openEditDialog(element: any) {}
  deleteItem(element: any) {}
  pageEvent(e: any) {}
}
