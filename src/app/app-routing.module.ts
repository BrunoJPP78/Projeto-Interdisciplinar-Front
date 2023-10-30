import { NgModule } from "@angular/core";
import { RouterModule, Routes, withComponentInputBinding } from "@angular/router";
import { AuthService } from "./modules/auth/services/auth.service";
import { LayoutLoginComponent } from "./modules/auth/components/layout-login/layout-login.component";
import { LoggedLayoutComponent } from "./shared/components/layouts/logged-layout/logged-layout.component";
import { AuthGuard } from "./modules/auth/services/auth.guard";
import { WelcomeComponent } from "./modules/welcome/pages/welcome.component";
import { UserComponent } from "./modules/user/pages/user/user.component";
import { UserRegisterComponent } from "./modules/user/register/user-register/user-register.component";
import { UserEditComponent } from "./modules/user/register/user-edit/user-edit/user-edit.component";
import { UserEditAssignmentComponent } from "./modules/user/register/user-edit/user-edit-assignment/user-edit-assignment.component";
import { DataUserComponent } from "./modules/user/pages/data-user/data-user/data-user.component";
import { EmployerComponent } from "./modules/employer/pages/employer/employer.component";
import { EmployerEditComponent } from "./modules/employer/register/employer-edit/employer-edit.component";
import { EmployerRegisterComponent } from "./modules/employer/register/employer-register/employer-register.component";
import { CompanyComponent } from "./modules/company/pages/company/company.component";
import { CompanyRegisterComponent } from "./modules/company/register/company-register/company-register.component";
import { CompanyEditComponent } from "./modules/company/register/company-edit/company-edit.component";
import { ScheduleComponent } from "./modules/schedule/pages/schedule/schedule.component";
import { PaymentComponent } from "./modules/payment/pages/payment/payment.component";
import { PaymentRegisterComponent } from "./modules/payment/register/payment-register/payment-register.component";
import { StockComponent } from "./modules/stock/pages/stock/stock.component";
import { StockRegisterComponent } from "./modules/stock/register/stock-register/stock-register.component";
import { StockEditComponent } from "./modules/stock/register/stock-edit/stock-edit.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth-routing.module").then((mod) => mod.AUTH_ROUTES),
    providers: [AuthService],
    component: LayoutLoginComponent,
  },
  {
    path: "",
    component: LoggedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "welcome", // Adicione a rota para o WelcomeComponent
        component: WelcomeComponent,
        data: {
          breadcrumb: {
            label: "", // Rótulo para o breadcrumb, se necessário
          },
        },
      },
      {
        path: "user",
        component: UserComponent,
        data: {
          breadcrumb: {
            label: 'Usuário',
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
      {
        path: "user/:id/edit", 
        component: UserEditComponent,
        data: {
          breadcrumb: {
            label: "Edição Dados Gerais", 
          },
        },
      },
      {
        path: "user/:id/edit-assignment", 
        component: UserEditAssignmentComponent,
        data: {
          breadcrumb: {
            label: "Edição de Atribuições", 
          },
        },
      },
      {
        path: "user/:id/show-data-user", 
        component: DataUserComponent,
        data: {
          breadcrumb: {
            label: "Dados do Usuário", 
          },
        },
      },
      {
        path: "employer",
        component: EmployerComponent,
        data: {
          breadcrumb: {
            label: 'Funcionário',
          },
        },
      },
      {
        path: "employer/register", 
        component: EmployerRegisterComponent,
        data: {
          breadcrumb: {
            label: "Cadastro de Funcionário", 
          },
        },
      },
      {
        path: "employer/:id/edit", 
        component: EmployerEditComponent,
        data: {
          breadcrumb: {
            label: "Edição Dados Gerais", 
          },
        },
      },
      {
        path: "company",
        component: CompanyComponent,
        data: {
          breadcrumb: {
            label: 'Funcionário',
          },
        },
      },
      {
        path: "company/register", 
        component: CompanyRegisterComponent,
        data: {
          breadcrumb: {
            label: "Cadastro de Empresas", 
          },
        },
      },
      {
        path: "company/:id/edit", 
        component: CompanyEditComponent,
        data: {
          breadcrumb: {
            label: "Edição Dados Gerais", 
          },
        },
      },
      {
        path: "schedule",
        component: ScheduleComponent,
        data: {
          breadcrumb: {
            label: 'Agenda',
          },
        },
      },
      {
        path: "payment",
        component: PaymentComponent,
        data: {
          breadcrumb: {
            label: 'Pagamentos',
          },
        },
      },
      {
        path: "payment/register",
        component: PaymentRegisterComponent,
        data: {
          breadcrumb: {
            label: 'Criação de Pagamentos',
          },
        },
      },
      {
        path: "stock",
        component: StockComponent,
        data: {
          breadcrumb: {
            label: 'Estoque',
          },
        },
      },
      {
        path: "stock/register", 
        component: StockRegisterComponent,
        data: {
          breadcrumb: {
            label: "Cadastro de Produtos", 
          },
        },
      },
      {
        path: "stock/:id/edit", 
        component: StockEditComponent,
        data: {
          breadcrumb: {
            label: "Edição de Produtos", 
          },
        },
      },
      {
        path: "**",
        redirectTo: "/welcome",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/auth/login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
