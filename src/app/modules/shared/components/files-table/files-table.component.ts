import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { LoadingService } from '../../services/loading.service';
const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-files-table',
  templateUrl: './files-table.component.html',
  styleUrls: ['./files-table.component.scss'],
})
export class FilesTableComponent implements OnInit {
  @Input() fileTableType?: string;
  @Input() data?: any;

  displayedColumns: string[] = ['position', 'name', 'actions'];
  dataSource: any[] = [];
  constructor(
    private _fileService: FilesService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.generateDatasource();
  }
  generateDatasource() {
    if (this.fileTableType === 'presentedFiles') {
      this.dataSource = [
        ...this.data?.defendantFiles,
        ...this.data?.reportFiles,
      ];
    } else if (this.fileTableType === 'arbitrageFiles') {
      this.dataSource = this.data.arbitrageFiles;
    }
  }
  downloadFile(file: any) {
    this._loadingService.loadingOn();
    return this._fileService
      .donwloadFile(file.filename, file.originalname)
      .subscribe(
        (res) => {
          this._loadingService.loadingOff();
        },
        (err) => {
          this._loadingService.loadingOff();
        }
      );
  }
}
