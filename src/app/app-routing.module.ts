import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MainNewsComponent } from './components/main-news/main-news.component';

const routes: Routes = [
  { path: '', component: MainHomeComponent },
  { path: 'feeds', component: MainNewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
