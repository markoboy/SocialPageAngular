import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';

import { AnimationsService } from 'src/app/services/animations.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/IUser';
import { authErrorHandler } from 'src/app/helpers/error-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
        transform: 'translate(-360px, 0)'
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
export class RegisterComponent implements OnInit, OnDestroy {

  private show: boolean;
  private subscription: Subscription;
  private submited: boolean;
  private user: IUser;
  private errorMessage: string;

  constructor(
    private animationsService: AnimationsService,
    private auth: AuthService,
    private router: Router) {
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    this.subscription = this.animationsService.loginIsOpened.subscribe(isVisible => this.show = !isVisible);
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

  register() {
    if (!this.submited) {
      this.submited = true;
      this.auth.registerUser(this.user)
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
