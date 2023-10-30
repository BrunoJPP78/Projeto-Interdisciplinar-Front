import { Routes } from "@angular/router";
import { WelcomeComponent } from "./pages/welcome.component";

export const WELCOME_ROUTES: Routes = [
  {
    path: 'welcome', // Corrija o path aqui
    component: WelcomeComponent,
    data: {
      breadcrumb: {
        label: "Welcome",
      },
    },
  },
];
