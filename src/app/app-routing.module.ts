import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginLayoutComponent } from "./components/login-layout/login-layout.component";
import { AuthComponent } from "./components/auth/auth.component";
import { AppLayoutComponent } from "./components/app-layout/app-layout.component";
import { AuthGuard } from "./guards/auth/auth.guard";
import { MainComponent } from "./components/main/main.component";


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'app',
        component: MainComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
