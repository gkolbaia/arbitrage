import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { LoadingService } from 'src/app/modules/shared/services/loading.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-um',
  templateUrl: './um.component.html',
  styleUrls: ['./um.component.scss'],
})
export class UmComponent implements OnInit {
  userForm?: FormGroup | null;

  users: any;
  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  selectUser(user: any) {
    this.generatUserForm(user);
  }
  isProfileActive(user: any) {
    return user._id === this.userForm?.value._id;
  }
  deleteUser(e: any) {
    e.stopPropagation();
    const dialog = this._dialog.open(ConfirmationDialogComponent);
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this._userService.deleteUser(this.userForm?.value?._id).subscribe(
          (res) => {
            this.loadData();
            this.userForm = null;
            this._snackBar.open('მონაცემი წაიშალა', 'ok', {
              duration: 10000,
              panelClass: 'message-warn',
            });
          },
          (err) => {
            this._snackBar.open(err.message, 'ok', {
              duration: 10000,
              panelClass: 'err-message',
            });
          }
        );
      }
    });
  }
  addUser() {
    if (!this.userForm) this.generatUserForm();
  }
  close() {
    this.userForm = null;
  }
  save() {
    if (this.userForm?.valid) {
      this._userService
        .registrateUser(this.userForm?.value)
        .subscribe((res) => {
          this.userForm = null;
          this.loadData();
          this._snackBar.open('თანამშრომელი დამატებულია', 'ok', {
            duration: 2000,
            panelClass: 'success-message',
          });
        });
    }
  }
  get userRolesControl(): FormArray {
    return this.userForm?.controls.roles as FormArray;
  }
  generatUserForm(user?: any) {
    this.userForm = this._fb.group({
      _id: [user?._id || null],
      firstName: [user?.firstName || '', Validators.required],
      username: [user?.username || '', Validators.required],
      lastName: [user?.lastName || '', Validators.required],
      pid: [user?.pid || null, Validators.required],
      roles: this._fb.array([]),
      type: [user?.type || null],
      userId: [user?.userId || null],
    });
    if (user?.roles?.length) {
      user.roles.forEach((role: string) => {
        this.userRolesControl.push(new FormControl(role));
      });
    }
  }
  roleChecked(role: string) {
    const neededRole = this.userRolesControl.value.find(
      (userRole: string) => userRole === role
    );
    return !!neededRole;
  }
  checkRole(e: MatCheckboxChange, role: string) {
    if (e.checked) {
      this.userRolesControl.push(new FormControl(role));
    } else {
      this.userRolesControl.value.forEach((userRole: string, i: number) => {
        if (userRole === role) {
          this.userRolesControl.removeAt(i);
        }
      });
    }
  }
  loadData() {
    this._userService.getUsers().subscribe((res: any) => {
      this.users = res?.result?.data;
    });
  }
  resetPassword() {
    const dialog = this._dialog.open(ConfirmationDialogComponent);
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this._userService.resetPassword(this.userForm?.value?._id).subscribe(
          (res) => {
            this._snackBar.open(
              'მომხმარებლის პაროლი წარმატებით დარესეტდა',
              'ok',
              {
                duration: 10000,
                panelClass: 'message-warn',
              }
            );
          },
          (err) => {
            this._snackBar.open(err.message, 'ok', {
              duration: 10000,
              panelClass: 'err-message',
            });
          }
        );
      }
    });
  }
}
