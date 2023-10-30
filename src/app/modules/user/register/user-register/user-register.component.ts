import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { BasicPageComponent } from "src/app/shared/components/layouts/basic-page/basic-page.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
import { NgFor, NgIf } from "@angular/common";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AutocompleteComponent } from "src/app/shared/components/atoms/autocomplete/autocomplete.component";
import { UploadFileComponent } from "src/app/shared/components/atoms/upload-file/upload-file.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { ToastService } from "src/app/core/services/toast.service";
import { UserService } from "../../service/user.service";
import { SelectService } from "src/app/service/select/select.service";
import { CepService } from "src/app/core/services/cep.service";



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
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
export class UserRegisterComponent {
  dadosGeraisForm: FormGroup;
  atribuicoesForms: FormGroup[] = [];
  tiposTelefone: string[] = ['Fixo', 'Fax', 'Celular'];
  cargos: any [] = [];
  funcoes: any [] = [];
  unidades: any [] = [];
  perfis: any [] = [];

  apiUrl= environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private selectService: SelectService,
    private cepService: CepService
    ) {
    this.dadosGeraisForm = this.fb.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      cpf: ["", [Validators.required]],
      data_de_nascimento: ["", [Validators.required]],
      email: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirm_password: ["", [Validators.required]],
    });
  }

  ngOnInit() {
   
  }

  onSubmit() {
    if (
      this.dadosGeraisForm &&
      this.dadosGeraisForm.valid &&
      this.atribuicoesForms.every(form => form.valid) // Verifica se todos os formulários de contato são válidos
    ) {
      // Recupere os dados do Local Storage com a chave "user"
      const userData = localStorage.getItem('user');
      
      if (userData) {
        // Parse os dados JSON do Local Storage
        const userDataParsed = JSON.parse(userData);
        const unidadePadrao = userDataParsed.unidade_padrao.id;
        
        // Crie um objeto JSON com os dados do fornecedor
        const usuarioData = {
          usuario: {
            first_name: this.dadosGeraisForm.get('first_name')!.value,
            last_name: this.dadosGeraisForm.get('last_name')!.value,
            username: this.dadosGeraisForm.get('username')!.value,
            cpf: this.dadosGeraisForm.get('cpf')!.value,
            data_de_nascimento: this.dadosGeraisForm.get('data_de_nascimento')!.value,
            password: this.dadosGeraisForm.get('password')!.value,
            confirm_password: this.dadosGeraisForm.get('confirm_password')!.value,
            telefone: this.dadosGeraisForm.get('telefone')!.value,
            // tipo: this.dadosGeraisForm.get('tipo')!.value,
            email: this.dadosGeraisForm.get('email')!.value,
          },
          atribuicao: this.atribuicoesForms.map(form => ({
            departamento: form.get('departamento')!.value,
            cargo: form.get('cargo')!.value,
            funcao: form.get('funcao')!.value,
            unidade: form.get('unidade')!.value,
            perfil: form.get('perfil')!.value,
          }))
        };
        console.log(usuarioData);
        
        // Use JSON.stringify para converter o objeto JSON em uma string JSON
        const jsonData = JSON.stringify(usuarioData);
  
        // Em seguida, passe httpOptions como terceiro argumento na sua solicitação POST
        this.userService.salvarUsuario(jsonData).subscribe(
          (response) => {
            // Lide com a resposta do backend após salvar os dados
            this.toastService.open("Usuario cadastrado com sucesso", "Fechar");
            this.router.navigate(['/user']);
          },
          (error) => {
            // Lide com erros, se houver algum
            this.toastService.open("Houve um ERRO ao criar um Usuário", "Fechar");
          }
        );
      } else {
        console.error('Dados do usuário não encontrados no Local Storage.');
      }
    }
  }

    // Função para adicionar um formulário de atribuicao
    adicionarAtribuicao() {
      const novoContatoForm = this.fb.group({
        departamento: ["", [Validators.required]],
        cargo: ["", [Validators.required]],
        funcao: ["", [Validators.required]],
        unidade: ["", [Validators.required]],
        perfil: ["", [Validators.required]],
      });
  
      this.atribuicoesForms.push(novoContatoForm);
    }
  
    // Função para remover o último formulário de atribuicao
    removerAtribuicao() {
      if (this.atribuicoesForms.length > 0) {
        this.atribuicoesForms.pop(); // Remove o último formulário de contato da lista
      }
    }
}
