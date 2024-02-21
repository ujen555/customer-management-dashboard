import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './customer/view/view.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './customer/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: 'customer/index', pathMatch: 'full' },
  { path: 'customer/index', component: IndexComponent},
  { path: 'customer/view/:id', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
