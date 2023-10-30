import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { UsuarioStored } from "src/app/core/models/auth.models";
import { ToastService } from "src/app/core/services/toast.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authenticated$ = new BehaviorSubject<boolean>(false);

  // Usuário e senha fixos
  private fixedUsername = "teste";
  private fixedPassword = "teste";

  constructor(private router: Router, private toastService: ToastService) {
    this.verifyAuthenticated();
  }

  verifyAuthenticated() {
    this.authenticated$.next(this.isAuthenticated());
  }

  public login(credentials: { username: string; password: string }): any {
    // Verifique se o nome de usuário e a senha correspondem aos valores fixos
    if (credentials.username === this.fixedUsername && credentials.password === this.fixedPassword) {
      // Login bem-sucedido
      this.saveUser(credentials);
      this.authenticated$.next(true);
      this.toastService.open("Login realizado com sucesso", "Fechar");
      this.router.navigate(["/welcome"]); // Redirecione para a página após o login bem-sucedido
    } else {
      // Login falhou
      this.authenticated$.next(false);
      this.toastService.open("Nome de usuário ou senha incorretos", "Fechar");
    }
  }

  public logout(): void {
    localStorage.removeItem("user");
    this.authenticated$.next(false);
    this.router.navigate(["/auth", "login"]);
  }

  public isAuthenticated(): boolean {
    return !!this.getUser();
  }

  public saveUser(user: { username: string }): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(): UsuarioStored | null {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }
}
