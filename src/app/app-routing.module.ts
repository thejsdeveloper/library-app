import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatelogComponent } from './components/catelog/catelog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { MainComponent } from './components/main/main.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      animationState: 'One',
    },
  },
  {
    path: '',
    component: MainComponent,
    data: {
      animationState: 'Two',
    },
    children: [
      {
        path: 'catalog',
        component: CatelogComponent,
        data: {
          animationState: 'Three',
        },
      },
      {
        path: 'comments',
        component: CommentsComponent,
        data: {
          animationState: 'Four',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
