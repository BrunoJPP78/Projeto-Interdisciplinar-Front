import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatInputModule, MatButtonModule],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const email = this.form.get("email")!.value;
    const password = this.form.get("password")!.value;
    // this.authService.login(email, password).subscribe((data: any) => {
    //   this.authService.saveToken(data.token);
    //   this.toastService.open("Login realizado com sucesso", "Fechar");
    //   this.router.navigate(["/"]);
    // });
  }
}
