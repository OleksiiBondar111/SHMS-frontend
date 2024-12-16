import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {FooterComponent} from "../../../shared/footer/footer.component";
import {NavbarComponent} from "../../../shared/navbar/navbar.component";
import {login} from "../../store/actions/auth.actions";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private store = inject(Store);
  loginForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.store.dispatch(login({username, password}));
    }
  }
}
