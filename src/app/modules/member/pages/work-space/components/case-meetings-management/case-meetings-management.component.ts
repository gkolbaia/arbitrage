import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseMeeting } from 'src/app/modules/member/interfaces/case-meeting.interface';
import { CasesService } from 'src/app/modules/member/services/cases.service';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';

@Component({
  selector: 'app-case-meetings-management',
  templateUrl: './case-meetings-management.component.html',
  styleUrls: ['./case-meetings-management.component.scss'],
})
export class CaseMeetingsManagementComponent implements OnInit {
  disableMainMeeting: boolean = false;
  arbitrageMeeting: FormGroup;
  meetingTypes = [
    {
      en: 'main',
      ge: 'მთავარი',
    },
    {
      en: 'regular',
      ge: 'მორიგი',
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<CaseMeetingsManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _casesService: CasesService,
    private _loadingService: LoadingService
  ) {
    this.disableMainMeeting = this.checkMainMeeting();
    this.arbitrageMeeting = _fb.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      type: [null, Validators.required],
    });
  }
  get typeControl(): FormControl {
    return this.arbitrageMeeting.controls.type as FormControl;
  }
  get dateControl(): FormControl {
    return this.arbitrageMeeting.controls.date as FormControl;
  }
  get timeControl(): FormControl {
    return this.arbitrageMeeting.controls.time as FormControl;
  }
  ngOnInit(): void {
    console.log(this.data);
  }
  close() {
    this.dialogRef.close();
  }
  saveMeeting() {
    if (this.arbitrageMeeting.valid) {
      const validDateString = `${this.dateControl.value.getFullYear()}/${
        this.dateControl.value.getMonth() + 1
      }/${this.dateControl.value.getDate()} ${this.timeControl.value}`;
      const date = new Date(validDateString);
      const arbitrageMeeting = {
        date,
        type: this.typeControl.value,
      };
      this.data.arbitrageMeetings.push(arbitrageMeeting);
      this._loadingService.loadingOn();
      this._casesService
        .addCaseMeeting(this.data?._id, {
          arbitrageMeetings: this.data.arbitrageMeetings,
        })
        .subscribe(
          (res) => {
            this._loadingService.loadingOff();
            this._snackBar.open(
              'სხდომა დაემატა',
              'ok',
              {
                duration: 2000,
                panelClass: 'success-message',
              }
            );
            this.close();
          },
          (err) => {
            this._loadingService.loadingOff();
            this._snackBar.open(err.message, 'ok', {
              duration: 2000,
              panelClass: 'err-message',
            });
          }
        );
    } else {
      this._snackBar.open(
        'დაფიქსირდა შეცდომა, გთხოვთ ცადოთ მოგვიანებით',
        'ok',
        {
          duration: 2000,
          panelClass: 'err-message',
        }
      );
    }
  }
  checkMainMeeting() {
    const mainMeeting = this.data?.arbitrageMeetings?.find(
      (meeting: CaseMeeting) => meeting.type === 'main'
    );
    return !!mainMeeting;
  }
  myFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    console.log(currentDate.getTime());
    return true;
  };
  get minDate() {
    return new Date();
  }
  get maxDate() {
    const mainMeeting = this.data?.arbitrageMeetings?.find(
      (meeting: CaseMeeting) => meeting.type === 'main'
    );
    if (!mainMeeting) {
      return null;
    }
    return new Date(mainMeeting.date);
  }
}
