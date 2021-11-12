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

  displayedColumns: string[] = ['position', 'name', 'author', 'actions'];
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
      if (this.data?.defendantFiles?.length) {
        this.data.defendantFiles.forEach((file: any) => {
          file.author = 'მოპასუხე';
        });
      }
      if (this.data?.reportFiles?.length) {
        this.data.reportFiles.forEach((file: any) => {
          file.author = 'მოსარჩელე';
        });
      }
      this.dataSource = [
        ...this.data?.defendantFiles,
        ...this.data?.reportFiles,
      ];
      this.dataSource = this.dataSource.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
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
