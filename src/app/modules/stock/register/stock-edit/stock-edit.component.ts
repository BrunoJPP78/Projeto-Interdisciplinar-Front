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
import { Router } from "@angular/router";
import { StockService } from "../../service/stock.service";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss'],
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
export class StockEditComponent {
  @Input() id!: number;
  data: any; // Variável para armazenar os dados do rota
  dataid: number = 0; // Variável para armazenar o ID do rota
  dadosGeraisForm: FormGroup;

  constructor(private fb: FormBuilder,
    private estoqueService: StockService,
    private route: ActivatedRoute ,
    private router: Router,
    private toastService: ToastService
    ) {
    this.dadosGeraisForm = this.fb.group({
      nome: ["", [Validators.required]],
      marca: ["", [Validators.required]],
      modelo: ["", [Validators.required]],
      material: ["", [Validators.required]],
      valor: ["", [Validators.required]],
      quantidade: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    // Obtenha o ID do produto a partir da rota atual
    this.route.params.subscribe(params => {
      this.dataid = +params['id']; // "+" converte para número
    });
    // Recupere os dados do produto pelo ID
    this.estoqueService.getProdutoById(this.dataid).subscribe((data: any) => {
      this.data = data; // Armazene os dados do produto
      this.dadosGeraisForm.patchValue(data); // Preencha o formulário com os dados do produto
    });
  }

  // Implemente a lógica para salvar as alterações no produto
  onSubmit() {
    const formData = this.dadosGeraisForm.value;

    // Faça a chamada ao serviço para atualizar os dados do produto
    this.estoqueService.update(this.dataid, formData).subscribe(
      (response: any) => {
        console.log('Produto atualizado com sucesso:', response);
        this.toastService.open("Produto atualizado com sucesso.", "Fechar")
        this.router.navigate(['/stock']);
      },
      (error) => {
        console.error('Erro ao atualizar o produto:', error);
        this.toastService.open("Erro na atualização do Produto.", "Fechar")
      }
    );
  }
}
