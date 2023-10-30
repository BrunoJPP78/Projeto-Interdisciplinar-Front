import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { jwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateModule } from "@ngx-translate/core";
import { SpinnerComponent } from "./shared/components/atoms/spinner/spinner.component";
import { errorInterceptor } from "./core/interceptors/error.interceptor";
import { spinnerInterceptor } from "./core/interceptors/spinner.interceptor";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { WelcomeComponent } from "./modules/welcome/pages/welcome.component";
import { BasicPageComponent } from "./shared/components/layouts/basic-page/basic-page.component";
import { UserComponent } from './modules/user/pages/user/user.component';
import { RouterModule } from "@angular/router";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { UserRegisterComponent } from './modules/user/register/user-register/user-register.component';
import { UserEditComponent } from './modules/user/register/user-edit/user-edit/user-edit.component';
import { UserEditAssignmentComponent } from './modules/user/register/user-edit/user-edit-assignment/user-edit-assignment.component';
import { DataUserComponent } from './modules/user/pages/data-user/data-user/data-user.component';
import { EmployerComponent } from './modules/employer/pages/employer/employer.component';
import { EmployerRegisterComponent } from './modules/employer/register/employer-register/employer-register.component';
import { EmployerEditComponent } from './modules/employer/register/employer-edit/employer-edit.component';
import { CompanyComponent } from './modules/company/pages/company/company.component';
import { CompanyRegisterComponent } from './modules/company/register/company-register/company-register.component';
import { CompanyEditComponent } from './modules/company/register/company-edit/company-edit.component';
import { ScheduleComponent } from './modules/schedule/pages/schedule/schedule.component';
import { PaymentComponent } from './modules/payment/pages/payment/payment.component';
import { PaymentRegisterComponent } from './modules/payment/register/payment-register/payment-register.component';
import { StockComponent } from './modules/stock/pages/stock/stock.component';
import { StockRegisterComponent } from './modules/stock/register/stock-register/stock-register.component';
import { StockEditComponent } from './modules/stock/register/stock-edit/stock-edit.component';

@NgModule({
    declarations: [AppComponent, WelcomeComponent, CompanyEditComponent,
          ],
    providers: [provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor, 
        spinnerInterceptor]))],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        NgxSpinnerModule,
        TranslateModule.forRoot({}),
        SpinnerComponent,
        MatDialogModule,
        HttpClientModule,
        ReactiveFormsModule,
        UserComponent,
        UserRegisterComponent,
        UserEditComponent,
        UserEditAssignmentComponent,
        UserEditComponent, 
        UserEditAssignmentComponent,
        EmployerComponent,
        EmployerRegisterComponent,
        EmployerEditComponent,
        CompanyComponent,
        CompanyRegisterComponent,
        PaymentComponent,
        PaymentRegisterComponent,
        StockComponent,
        StockRegisterComponent,
        StockEditComponent,
        DataUserComponent,
        BasicPageComponent,
    ],
})
export class AppModule {}
