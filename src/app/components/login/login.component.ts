import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AnimationsService } from 'src/app/services/animations.service';
import { AuthService } from 'src/app/services/auth.service';

import { IUser } from 'src/app/models/IUser';
import { authErrorHandler } from 'src/app/helpers/error-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        visibility: 'visible',
        transform: 'translate(0, 0)'
      })),
      state('hide', style({
        opacity: 0,
        visibility: 'hidden',
        transform: 'translate(360px, 0)'
      })),
      transition('show => hide', [
        animate('.6s')
      ]),
      transition('hide => show', [
        animate('1s')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  private show: boolean;
  private subscription: Subscription;
  private user: IUser;
  private rememberUser: boolean;
  private submited: boolean;
  private errorMessage: string;

  constructor(
    private animationsService: AnimationsService,
    private auth: AuthService,
    private router: Router) {
    this.user = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.subscription = this.animationsService.loginIsOpened.subscribe(isVisible => this.show = isVisible);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get showState() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.animationsService.toggleShowLogin();
  }

  login() {
    if (!this.submited) {
      this.submited = true;
      this.errorMessage = '';
      this.auth.rememberUser = this.rememberUser;

      this.auth.loginUser(this.user)
        .subscribe(
          res => {
            this.auth.saveToken(res.token);
            this.router.navigate(['/feeds']);
          },
          err => {
            this.submited = false;
            this.errorMessage = authErrorHandler(err);
          });
    }
  }

}
