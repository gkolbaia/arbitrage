import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  credentialsControl: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.credentialsControl = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  login() {
    if (this.credentialsControl.invalid) {
      return;
    }
    this._authService.login(this.credentialsControl.value).subscribe(
      (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        if (res?.type === 'USER') {
          this.router.navigate(['/admin']);
        } else if (res?.type === 'CASE') {
          this.router.navigate(['/user']);
        }
      },
      (err) => {
        if (err.error.statusCode === 400) {
          this._snackBar.open('მომხმარებელი ან პაროლი არასწორია', 'ოკ', {
            duration: 2000,
            panelClass: 'err-message',
          });
        } else {
          this._snackBar.open(
            'დაფიქსირდა შეცდომა, გთხოვთ ცადოთ მოგვიანებით',
            'ოკ',
            {
              duration: 2000,
              panelClass: 'err-message',
            }
          );
        }
      }
    );
  }
}
