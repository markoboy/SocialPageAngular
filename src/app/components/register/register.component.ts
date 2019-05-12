import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AnimationsService } from 'src/app/services/animations.service';
import { Subscription } from 'rxjs';

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

  constructor(private animationsService: AnimationsService) { }

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

}
