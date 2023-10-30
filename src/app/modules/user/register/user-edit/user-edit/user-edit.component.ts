import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { BasicPageComponent } from "src/app/shared/components/layouts/basic-page/basic-page.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { NgFor, NgIf } from "@angular/common";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AutocompleteComponent } from "src/app/shared/components/atoms/autocomplete/autocomplete.component";
import { UploadFileComponent } from "src/app/shared/components/atoms/upload-file/upload-file.component";
import { UserService } from "../../../service/user.service";
import { Router } from "@angular/router";
import { CepService } from "src/app/core/services/cep.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,

    MatTabsModule,
    RouterModule,
    MatButtonModule,
    BasicPageComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AutocompleteComponent,
    UploadFileComponent,
  ],
})
export class UserEditComponent {
  @Input() id!: number;
  form!: FormGroup;
  fornecedor: any; // Variável para armazenar os dados do fornecedor
  userId: number = 0; // Variável para armazenar o ID do fornecedor

  constructor(private fb: FormBuilder,
     private route: ActivatedRoute ,
     private userService: UserService,
     private cepService: CepService,
     private router: Router,
     private toastService: ToastService
     ) {
    this.form = this.fb.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      cpf: ["", [Validators.required]],
      data_de_nascimento: ["", [Validators.required]],
      email: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    // Obtenha o ID do fornecedor a partir da rota atual
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // "+" converte para número
    });

    // Recupere os dados do fornecedor pelo ID
    this.userService.getUsuarioById(this.userId).subscribe((data: any) => {
      this.fornecedor = data; // Armazene os dados do fornecedor
      this.form.patchValue(data); // Preencha o formulário com os dados do fornecedor
    });
  }

  // Implemente a lógica para salvar as alterações no fornecedor
  salvarAlteracoes() {
    const formData = this.form.value;

    // Faça a chamada ao serviço para atualizar os dados do fornecedor
    this.userService.updateUsuario(this.userId, formData).subscribe(
      (response: any) => {
        // Lide com a resposta da atualização, por exemplo, exiba uma mensagem de sucesso
        this.toastService.open("Usuario atualizado com sucesso", "Fechar");

        // Redirecione ou faça outra ação adequada após a atualização
        this.router.navigate(['/user']);
      },
      (error) => {
        // Lide com erros de atualização, se necessário
        this.toastService.open("ERRO na edição de Usuário", "Fechar");

      }
    );
  }
}
