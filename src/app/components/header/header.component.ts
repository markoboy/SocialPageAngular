import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationsService } from 'src/app/services/animations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private animationsService: AnimationsService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  logout() {
    // Check if the user registered so that the login page is shown on logout
    this.animationsService.loginIsOpened.subscribe(isOpened => {
      if (!isOpened) {
        this.animationsService.toggleShowLogin();
      }
      this.auth.logout();
      this.router.navigate(['/']);
    }).unsubscribe();
  }

}
