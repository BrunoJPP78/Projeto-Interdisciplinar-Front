import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ToastService } from "src/app/core/services/toast.service";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatInputModule, MatIconModule, MatButtonModule],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private httpClient: HttpClient // Adicionar Módulo http
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value)
    .pipe(
      catchError((error) => {
        // Trate o erro de não autorizado aqui, se necessário.
        // Por exemplo, você pode exibir uma mensagem de erro.
        console.error('Erro de login:', error);
        this.toastService.open("Erro ao fazer login", "Fechar");
        throw error; // Rejeita o erro para que ele não continue com o redirecionamento.
      })
    )
    .subscribe((data: any) => {
      // O redirecionamento só acontecerá se não houver erros.
      console.log('Login bem-sucedido. Redirecionando para /welcome');
      this.router.navigate(["/welcome"]);
    });
}
}
