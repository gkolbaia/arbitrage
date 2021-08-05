import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  credentialsControl: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.credentialsControl = _fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  login() {
    console.log(this.credentialsControl.valid);
    console.log(this.credentialsControl.value);
  }
}
