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
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-um',
  templateUrl: './um.component.html',
  styleUrls: ['./um.component.scss'],
})
export class UmComponent implements OnInit {
  userForm?: FormGroup | null;

  users: any = [
    {
      id: 1,
      firstName: 'გიორგი',
      lastName: 'ყოლბაია',
      pid: 62006064772,
      roles: ['ARBITR'],
    },
    {
      id: 2,
      firstName: 'გიორგი',
      lastName: 'წულუკიძე',
      pid: 62006064772,
      roles: ['PRESIDENT'],
    },
    {
      id: 3,
      firstName: 'მარშალ',
      lastName: 'გელოვანი',
      pid: 62006064772,
      roles: ['SUPERADMIN'],
    },
  ];
  constructor(
    private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {}
  ngOnInit(): void {}
  selectUser(user: any) {
    this.generatUserForm(user);
  }
  isProfileActive(user: any) {
    return user.id === this.userForm?.value.id;
  }
  deleteUser(e: any, user: any) {
    e.stopPropagation();
  }
  addUser() {
    if (!this.userForm) this.generatUserForm();
  }
  close() {
    this.userForm = null;
  }
  save() {
    this._userService.registrateUser(this.userForm?.value).subscribe((res) => {
      console.log(res);
    });
    console.log(this.userForm?.value);
  }
  get userRolesControl(): FormArray {
    return this.userForm?.controls.roles as FormArray;
  }
  generatUserForm(user?: any) {
    this.userForm = this._fb.group({
      id: [user?.id || null],
      firstName: [user?.firstName || '', Validators.required],
      username: [user?.username || '', Validators.required],
      lastName: [user?.lastName || '', Validators.required],
      pid: [user?.pid || null, Validators.required],
      // roles: this._fb.group({
      //   president: user?.role?.president || false,
      //   arbitr: user?.role?.arbitr || false,
      //   chancelleryMan: user?.role?.chancelleryMan || false,
      // }),
      roles: this._fb.array([]),
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
}
