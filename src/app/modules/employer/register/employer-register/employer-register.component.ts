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
import { EmployerService } from "../../service/employer.service";
import { SelectService } from "src/app/service/select/select.service";
import { CepService } from "src/app/core/services/cep.service";

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.scss'],
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
export class EmployerRegisterComponent {
  @Input() id!: number;
  dadosGeraisForm: FormGroup;
  atribuicaoForm: FormGroup;
  contatosForms: FormGroup[] = []; // Array para armazenar os formulários de contato
  enderecosForms: FormGroup[] = []; // Array para armazenar os formulários de endereço
  isEditMode = false; // Variável de controle para o modo de edição
  funcionario: any; // Armazenar os dados do fornecedor a ser editado
  atribuicao: any;
  tiposTelefone: string[] = ['Fixo', 'Fax', 'Celular'];
  dadosPagamentoOpcoes: string[] = ['PIX', 'Transferência Bancária'];
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
    private funcionarioService: EmployerService,
    private cepService: CepService,
    private http: HttpClient,
    private router: Router
    ) {
    this.dadosGeraisForm = this.fb.group({
      nome: ["", [Validators.required]],
      sobrenome: ["", [Validators.required]],
      cpf: ["", [Validators.required]],
    });
    this.atribuicaoForm = this.fb.group({
      cargo: ['', Validators.required],
      salario: ['', Validators.required],
      dados_pagamento: ['', Validators.required],
      tipo_pix: [''], // Valor padrão para tipo PIX
      chave_pix: [''], // Valor padrão para valor PIX
      banco: [''], // Valor padrão para operação (Transferência Bancária)
      operacao: [''], // Valor padrão para operação (Transferência Bancária)
      agencia: [''],  // Valor padrão para agência (Transferência Bancária)
      conta: ['']     // Valor padrão para conta (Transferência Bancária)
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
      this.atribuicaoForm &&
      this.atribuicaoForm.valid &&
      this.contatosForms &&
      this.enderecosForms &&
      this.contatosForms.every(form => form && form.valid) &&
      this.enderecosForms.every(form => form && form.valid)
    ) {
      const userData = localStorage.getItem('user');
      
      if (userData) {       
        const data = {
          funcionario: {
            nome: this.dadosGeraisForm.get('nome')!.value,
            sobrenome: this.dadosGeraisForm.get('sobrenome')!.value,
            cpf: this.dadosGeraisForm.get('cpf')!.value,
          },
          atribuicao: {
            cargo: this.atribuicaoForm.get('cargo')!.value,
            salario: this.atribuicaoForm.get('salario')!.value,
            tipo_pix: this.atribuicaoForm.get('tipo_pix')!.value,
            chave_pix: this.atribuicaoForm.get('chave_pix')!.value,
            banco: this.atribuicaoForm.get('banco')!.value,
            operacao: this.atribuicaoForm.get('operacao')!.value,
            agencia: this.atribuicaoForm.get('agencia')!.value,
            conta: this.atribuicaoForm.get('conta')!.value,
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
  
        const jsonData = JSON.stringify(data);
        
        this.funcionarioService.salvar(jsonData).subscribe(
          (response) => {
            console.log('Dados salvos com sucesso', response);
            this.router.navigate(['/fornecedor']);
          },
          (error) => {
            console.error('Erro ao salvar dados', error);
          }
        );
      } else {
        console.error('Dados do usuário não encontrados no Local Storage.');
      }
    } else {
      console.error('Formulários inválidos ou não inicializados corretamente.');
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
