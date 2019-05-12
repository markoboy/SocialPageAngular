import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatGridListModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatDividerModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDividerModule
  ]
})
export class AppMaterialModule { }
