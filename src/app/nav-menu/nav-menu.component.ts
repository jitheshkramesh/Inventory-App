import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private account: AccountService, private productService: ProductService) { }

  loginStatus$: Observable<boolean>;
  userName$: Observable<string>;

  ngOnInit() {
    this.loginStatus$ = this.account.isLoggedIn;
    this.userName$ = this.account.currentUsername;
  }

  onLogout() {
    this.productService.clearCache();
    this.account.logout();
  }


}
