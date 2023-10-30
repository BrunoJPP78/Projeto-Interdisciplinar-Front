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
import { PaymentService } from "../../service/payment.service";
import { SelectService } from "src/app/service/select/select.service";
import { CepService } from "src/app/core/services/cep.service";

@Component({
  selector: 'app-payment-register',
  templateUrl: './payment-register.component.html',
  styleUrls: ['./payment-register.component.scss'],
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
export class PaymentRegisterComponent {
  @Input() id!: number;
  dadosGeraisForm: FormGroup;
  isEditMode = false; // Variável de controle para o modo de edição
  funcionario: any; // Armazenar os dados do fornecedor a ser editado
  tiposTelefone: string[] = ['Fixo', 'Fax', 'Celular'];
  dadosPagamentoOpcoes: string[] = ['PIX', 'Transferência Bancária'];

  apiUrl= environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private fb: FormBuilder,
    private pagamentoService: PaymentService,
    private cepService: CepService,
    private http: HttpClient,
    private router: Router
    ) {
    this.dadosGeraisForm = this.fb.group({
      falta: ["", [Validators.required]],
      vale: ["", [Validators.required]],
      outro_desconto: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    if (
      this.dadosGeraisForm &&
      this.dadosGeraisForm.valid
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
            nome_empresarial: this.dadosGeraisForm.get('nome_empresarial')!.value,
            nome_fantasia: this.dadosGeraisForm.get('nome_fantasia')!.value,
            cnpj: this.dadosGeraisForm.get('cnpj')!.value,
            inscricao_estadual: this.dadosGeraisForm.get('inscricao_estadual')!.value,
            inscricao_municipal: this.dadosGeraisForm.get('inscricao_municipal')!.value,
            cnae: this.dadosGeraisForm.get('cnae')!.value,
            unidade: unidadePadrao, // Use a unidade padrão recuperada
          },
        };
        console.log(fornecedorData);
        
        // Use JSON.stringify para converter o objeto JSON em uma string JSON
        const jsonData = JSON.stringify(fornecedorData);
  
        // Em seguida, passe httpOptions como terceiro argumento na sua solicitação POST
        this.http.post(`${this.apiUrl}/novo-fornecedor/`, jsonData, this.httpOptions).subscribe(
          (response) => {
            // Lide com a resposta do backend após salvar os dados
            console.log('Dados salvos com sucesso', response);
            this.router.navigate(['/fornecedor']);
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

}
