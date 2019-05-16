import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AnimationsService } from 'src/app/services/animations.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit, OnDestroy {

  private showState: boolean;
  private subscription: Subscription;

  constructor(
    private auth: AuthService,
    private animationsService: AnimationsService,
    private router: Router) { }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/feeds']);
    }
    this.subscription = this.animationsService.loginIsOpened.subscribe(isVisible => this.showState = isVisible);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
