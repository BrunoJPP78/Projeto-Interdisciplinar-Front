import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
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
import { ToastService } from "src/app/core/services/toast.service";
import { SelectService } from "src/app/service/select/select.service";

import { EmployerService } from "../../service/employer.service";

@Component({
  selector: 'app-employer-edit',
  templateUrl: './employer-edit.component.html',
  styleUrls: ['./employer-edit.component.scss'],
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
export class EmployerEditComponent {
  @Input() id!: number;
  data: any; // Variável para armazenar os dados do rota
  dataid: number = 0; // Variável para armazenar o ID do rota
  dadosGeraisForm: FormGroup;
  areas: any [] = [];
  setores: any [] = [];
  equipamentos: any [] = [];
  conjuntos: any [] = [];

  constructor(private fb: FormBuilder,
    private service: EmployerService,
    private route: ActivatedRoute ,
    private router: Router,
    private selectService: SelectService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
    ) {
    this.dadosGeraisForm = this.fb.group({
      nome: ["", [Validators.required]],
      sobrenome: ["", [Validators.required]],
      cpf: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    // Obtenha o ID do fornecedor a partir da rota atual
    this.route.params.subscribe(params => {
      this.dataid = +params['id']; // "+" converte para número
    });
    // Recupere os dados do fornecedor pelo ID
    this.service.getFuncionarioById(this.dataid).subscribe((data: any) => {
      this.data = data; // Armazene os dados do fornecedor
      this.dadosGeraisForm.patchValue(data); // Preencha o formulário com os dados do fornecedor
      console.log(data);
    });
  }
  
  // Implemente a lógica para salvar as alterações no fornecedor
  onSubmit() {
    const formData = this.dadosGeraisForm.value;
    formData.setor = formData.setor_id;

    // Faça a chamada ao serviço para atualizar os dados do fornecedor
    this.service.update(this.dataid, formData).subscribe(
      (response: any) => {
        // Lide com a resposta da atualização, por exemplo, exiba uma mensagem de sucesso
        console.log('Dados atualizados com sucesso:', response);

        // Redirecione ou faça outra ação adequada após a atualização
        this.router.navigate(['/employer']);
        this.toastService.open("Dados salvos com sucesso", "Fechar");
      },
      (error) => {
        // Lide com erros de atualização, se necessário
        this.toastService.open("Erro ao salvar dados", "Fechar");
        console.error('Erro ao atualizar os dados:', error);
      }
    );
  }
}
