import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private router: Router
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
      (res) => {
        console.log(res);
        this._authService.session.subscribe((res) => {
          console.log(res);
        });
        localStorage.setItem('employee', JSON.stringify(res));
        this.router.navigate(['/admin']);
      },
      (err) => {
        //TODO handle error
        console.log(err);
      }
    );
  }
}
