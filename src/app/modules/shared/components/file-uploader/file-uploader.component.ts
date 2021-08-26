import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  uploadProgressBar = false;
  disableDownloadButton = false;
  fileName: string = '';
  fileId: string = '';
  errorStyles?: any;
  @Input()
  name?: string;
  @Input() icon?: string;
  @Input() file?: any;
  @Input() keyword?: string;
  @Input() disabled?: any;
  @Input() fileDelete?: any;
  @Output() fileUploaded = new EventEmitter<any>();
  @Output() deletedFile = new EventEmitter<any>();
  @Input() styles?: any;
  @Input() validateFile?: string[];

  constructor(
    private _snackBar: MatSnackBar,
    private _fileService: FilesService
  ) {}

  ngOnInit(): void {
    if (this.file) {
      this.fileName = this.file.name;
      this.fileId = this.file.id;
    }
  }
  downloadFile() {
    this.disableDownloadButton = true;
    return this._fileService.donwloadFile(this.fileId, this.fileName).subscribe(
      (res) => {
        this.disableDownloadButton = false;
      },
      (err) => {
        this.disableDownloadButton = false;
      }
    );
  }
  uploadFile(e: any) {
    this.uploadProgressBar = true;
    const fileToUpload = e?.target?.files?.item(0);
    if (fileToUpload) {
      const data = new FormData();
      data.append('file', fileToUpload);
      const validFIle = this.validateFile?.find(
        (fileType: string) => fileType === fileToUpload.type
      );
      if (validFIle) {
        this._fileService.uploadFile(data).subscribe(
          (res: any) => {
            this.fileUploaded.emit(res);
            const fileData = res;
            this.fileName = fileData?.originalname;
            this.fileId = fileData?.filename;
            this.uploadProgressBar = false;
          },
          (err) => {
            this.fileUploaded.emit(err);
            this.uploadProgressBar = false;
          }
        );
      } else {
        this.uploadProgressBar = false;
        this._snackBar.open('გთხოვთ ატვირთოთ მითითებული ფორმატის ფაილი', 'ok', {
          duration: 2000,
          panelClass: 'err-message',
        });
      }
    } else {
      this.uploadProgressBar = false;
    }
  }
  fileDeleted() {
    this.fileId = '';
    this.fileName = '';
    this.deletedFile.emit({
      keyword: this.keyword,
    });
  }
}
