import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  insertForm: FormGroup;
  Username: FormControl;
  Password: FormControl;
  returnUrl: string;
  ErrorMessage: string;
  InvalidLogin: boolean;

  constructor(private account: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  onSubmit() {
    let userLogin = this.insertForm.value;
    this.account.login(userLogin.Username, userLogin.Password).subscribe(result => {

      let token = (<any>result).token;
      console.log(token);
      console.log(result.userRole)
      console.log("Logged in successfully");
      this.InvalidLogin = false;
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      this.InvalidLogin = true;
      this.ErrorMessage = error.error.loginError;

      console.log(this.ErrorMessage);
    });
  }

  ngOnInit() {
    this.Username = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    this.insertForm = this.fb.group({
      "Username": this.Username,
      "Password": this.Password
    });
  }

}
