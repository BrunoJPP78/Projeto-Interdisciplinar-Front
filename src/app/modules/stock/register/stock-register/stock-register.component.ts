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
import { SelectService } from "src/app/service/select/select.service";
import { StockService } from "../../service/stock.service";
import { CepService } from "src/app/core/services/cep.service";

@Component({
  selector: 'app-stock-register',
  templateUrl: './stock-register.component.html',
  styleUrls: ['./stock-register.component.scss'],
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
export class StockRegisterComponent {
  @Input() id!: number;
  dadosGeraisForm: FormGroup;
  isEditMode = false; // Variável de controle para o modo de edição
  estoque: any; // Armazenar os dados do fornecedor a ser editado

  apiUrl= environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private fb: FormBuilder,
    private estoqueService: StockService,
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
    ) {
    this.dadosGeraisForm = this.fb.group({
      nome_produto: ["", [Validators.required]],
      marca: ["", [Validators.required]],
      modelo: ["", [Validators.required]],
      material: ["", [Validators.required]],
      valor: ["", [Validators.required]],
      quantidade: ["", [Validators.required]],
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
        const data = {
            nome: this.dadosGeraisForm.get('nome_produto')!.value,
            marca: this.dadosGeraisForm.get('marca')!.value,
            modelo: this.dadosGeraisForm.get('modelo')!.value,
            material: this.dadosGeraisForm.get('material')!.value,
            valor: this.dadosGeraisForm.get('valor')!.value,
            quantidade: this.dadosGeraisForm.get('quantidade')!.value,
        };
        console.log(data);
        
        // Use JSON.stringify para converter o objeto JSON em uma string JSON
        const jsonData = JSON.stringify(data);
  
        // Em seguida, passe httpOptions como terceiro argumento na sua solicitação POST
        this.estoqueService.salvarProduto(jsonData).subscribe(
          (response) => {
            // Lide com a resposta do backend após salvar os dados
            this.toastService.open("Produto salvo com sucesso.", "Fechar");
            this.router.navigate(['/stock']);
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
