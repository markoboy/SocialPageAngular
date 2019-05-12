import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationsService } from 'src/app/services/animations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit, OnDestroy {

  private showState: boolean;
  private subscription: Subscription;

  constructor(private animationsService: AnimationsService) { }

  ngOnInit() {
    this.subscription = this.animationsService.loginIsOpened.subscribe(isVisible => this.showState = isVisible);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
