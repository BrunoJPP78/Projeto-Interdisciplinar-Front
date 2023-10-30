import { Routes } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { RecoverComponent } from "./pages/recover/recover.component";

export const AUTH_ROUTES: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Entre na sua conta",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Preencha seus dados para realizar o cadastro",
    },
  },
  {
    path: "recover",
    component: RecoverComponent,
    data: {
      title: "Digite seu email para recuperar sua senha",
    },
  },
];
