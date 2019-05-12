import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  private loginIsOpened$ = new BehaviorSubject(true);
  loginIsOpened: Observable<boolean>;

  constructor() {
    this.loginIsOpened = this.loginIsOpened$.asObservable();
  }

  toggleShowLogin() {
    this.loginIsOpened$.next(!this.loginIsOpened$.value);
  }

}
