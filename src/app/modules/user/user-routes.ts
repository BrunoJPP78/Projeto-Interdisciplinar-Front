import { Routes } from "@angular/router";
import { UserComponent } from "./pages/user/user.component";
import { UserRegisterComponent } from "./register/user-register/user-register.component";

export const USER_ROUTES: Routes = [
  {
    path: "",
    component: UserComponent,
    data: {
      breadcrumb: {
        label: "",
      },
    },
  },
  {
    path: "user/register",
    component: UserRegisterComponent,
    data: {
      breadcrumb: {
        label: "Cadastro de Usuários",
      },
    },
  },
];
