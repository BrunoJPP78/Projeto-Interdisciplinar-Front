import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-recover",
  templateUrl: "./recover.component.html",
  styleUrls: ["./recover.component.scss"],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatInputModule, MatIconModule, MatButtonModule],
})
export class RecoverComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required]],
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
    //   this.toastService.open("Enviamos um email com sua nova senha provisória", "Fechar");
    //   this.router.navigate(["/auth/login"]);
    // });
  }
}
