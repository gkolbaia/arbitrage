import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { LoadingService } from '../../services/loading.service';

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
