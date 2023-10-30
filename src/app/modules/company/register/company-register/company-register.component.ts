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
import { CompanyService } from "../../service/company.service";
import { SelectService } from "src/app/service/select/select.service";
import { CepService } from "src/app/core/services/cep.service";

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss'],
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
export class CompanyRegisterComponent {
  @Input() id!: number;
  dadosGeraisForm: FormGroup;
  contatosForms: FormGroup[] = []; // Array para armazenar os formulários de contato
  enderecosForms: FormGroup[] = []; // Array para armazenar os formulários de endereço
  isEditMode = false; // Variável de controle para o modo de edição
  fornecedor: any; // Armazenar os dados do fornecedor a ser editado
  tiposTelefone: string[] = ['Fixo', 'Fax', 'Celular'];

  apiUrl= environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private fb: FormBuilder,
    private empresaService: CompanyService,
    private cepService: CepService,
    private http: HttpClient,
    private router: Router
    ) {
    this.dadosGeraisForm = this.fb.group({
      razao_social: ["", [Validators.required]],
      nome_fantasia: ["", [Validators.required]],
      cnpj: ["", [Validators.required]],
      inscricao_estadual: [""],
      inscricao_municipal: [""],
    });
  }

  ngOnInit() {
    
  }

  // Função para adicionar um formulário de contato
  adicionarContato() {
    const novoContatoForm = this.fb.group({
      telefone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      tipoTelefone: ["", [Validators.required]]
    });

    this.contatosForms.push(novoContatoForm);
  }

  // Função para adicionar um formulário de endereço
  adicionarEndereco() {
    const novoEnderecoForm = this.fb.group({
      cep: ["", [Validators.required]],
      logradouro: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      complemento: [""],
      bairro: ["", [Validators.required]],
      municipio: ["", [Validators.required]],
      estado: ["", [Validators.required]],
    });

    this.enderecosForms.push(novoEnderecoForm);
  }

  // Função para remover o último formulário de contato
  removerContato() {
    if (this.contatosForms.length > 0) {
      this.contatosForms.pop(); // Remove o último formulário de contato da lista
    }
  }

  // Função para remover o último formulário de endereço
  removerEndereco() {
    if (this.enderecosForms.length > 0) {
      this.enderecosForms.pop(); // Remove o último formulário de endereço da lista
    }
  }

  onSubmit() {
    if (
      this.dadosGeraisForm &&
      this.dadosGeraisForm.valid &&
      this.contatosForms.every(form => form.valid) && // Verifica se todos os formulários de contato são válidos
      this.enderecosForms.every(form => form.valid) // Verifica se todos os formulários de endereço são válidos
    ) {
      // Recupere os dados do Local Storage com a chave "user"
      const userData = localStorage.getItem('user');
      
      if (userData) {
        // Parse os dados JSON do Local Storage
        const userDataParsed = JSON.parse(userData);
        
        // Acesse a chave "unidade_padrao" dentro dos dados do usuário
        const unidadePadrao = userDataParsed.unidade_padrao.id;
        
        // Crie um objeto JSON com os dados do fornecedor
        const fornecedorData = {
          fornecedor: {
            razao_social: this.dadosGeraisForm.get('razao_social')!.value,
            nome_fantasia: this.dadosGeraisForm.get('nome_fantasia')!.value,
            cnpj: this.dadosGeraisForm.get('cnpj')!.value,
            inscricao_estadual: this.dadosGeraisForm.get('inscricao_estadual')!.value,
            inscricao_municipal: this.dadosGeraisForm.get('inscricao_municipal')!.value,
          },
          telefones: this.contatosForms.map(form => ({
            telefone: form.get('telefone')!.value,
            email: form.get('email')!.value,
            tipo: 'Fixo', // Você pode ajustar o tipo conforme necessário
          })),
          enderecos: this.enderecosForms.map(form => ({
            cep: form.get('cep')!.value,
            tipo: 'Entrega NF-E', // Você pode ajustar o tipo conforme necessário
            endereco: form.get('logradouro')!.value,
            numero: form.get('numero')!.value,
            complemento: form.get('complemento')!.value,
            bairro: form.get('bairro')!.value,
            municipio: form.get('municipio')!.value,
            estado: form.get('estado')!.value,
          }))
        };
        console.log(fornecedorData);
        
        // Use JSON.stringify para converter o objeto JSON em uma string JSON
        const jsonData = JSON.stringify(fornecedorData);
  
        // Em seguida, passe httpOptions como terceiro argumento na sua solicitação POST
        this.empresaService.salvar(jsonData).subscribe(
          (response) => {
            // Lide com a resposta do backend após salvar os dados
            console.log('Dados salvos com sucesso', response);
            this.router.navigate(['/company']);
          },
          (error) => {
            // Lide com erros, se houver algum
            console.error('Erro ao salvar dados', error);
          }
        );
      } else {
        console.error('Dados do usuário não encontrados no Local Storage.');
      }
    }
  }

  buscarEnderecoPorCep(index: number) {
    const cep = this.enderecosForms[index].get('cep')?.value;
    if (cep) {
      this.cepService.buscarCep(cep).subscribe((endereco) => {
        if (!endereco.erro) {
          this.enderecosForms[index].patchValue({
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            municipio: endereco.localidade,
            estado: endereco.uf,
          });
        } else {
          console.error('CEP não encontrado');
        }
      });
    }
  }  
}
