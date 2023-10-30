import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { BasicPageComponent } from "src/app/shared/components/layouts/basic-page/basic-page.component";
import { MatTableModule } from "@angular/material/table";
import { of } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { ModalService } from "src/app/shared/components/molecules/modal/modal.service";
import { ConfirmModalComponent } from "src/app/shared/components/molecules/confirm-modal/confirm-modal.component";

import { CompanyService } from "../../service/company.service";
import { ToastService } from "src/app/core/services/toast.service";

interface Usuario {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BasicPageComponent,
    MatIconModule,
    MatButtonModule,
    MatButtonModule,
    MatTableModule,
    RouterModule
  ],
})
export class CompanyComponent {
  displayedColumns: string[] = ["razao_social", "nome_fantasia", "cnpj", "telefone", "email", "acoes"];
  dataSource: Usuario[] = [];
  usuarios: any[] = [];

  user = {
    name: "", // Inicialize com uma string vazia
  };
  
  filterForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private modalService: ModalService,
    private empresaService: CompanyService,
    private toastService: ToastService
    ) {
    this.createForm();
  }

  createForm(): void {
    this.filterForm = this.fb.group({
      name: [""],
    });
  }

  ngOnInit() {
    // Recuperar os dados do usuário da Local Storage
    const userDataString = localStorage.getItem('user');
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);

      // Verificar se os dados do usuário e a unidade existem
      if (userData && userData.unidade_padrao && userData.unidade_padrao.id) {
        const unidadeId = userData.unidade_padrao.id;

        // Fazer a solicitação à API
        this.empresaService.list().subscribe(
          (data: any) => {
            this.usuarios = data;
          },
          (error) => {
            // Lidar com erros, se necessário
            console.error('Erro ao buscar usuários:', error);
          }
        );
      } else {
        // Caso a estrutura dos dados não seja a esperada
        console.error('Estrutura de dados inválida na Local Storage.');
      }
    } else {
      // Caso os dados do usuário não estejam na Local Storage
      console.error('Dados do usuário não encontrados na Local Storage.');
    }
  }
  
  editItem(usuario: Usuario): void {
    this.router.navigate([`/usuario/:id/edit`]);
  }

  deleteItem(id: number) {
    const dialogRef = this.modalService.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Acessando o ID do objeto antes de passá-lo para a função deleteUsuario
        const userId = id; // ou data.id, dependendo de onde o ID está armazenado
        this.empresaService.delete(userId).subscribe(
          () => {
            this.usuarios = this.usuarios.filter((data) => data.id !== userId);
            this.toastService.open("Usuário Excluído com Sucesso", "Fechar");
          },
          (error) => {
            this.toastService.open("ERRO ao excluir", "Fechar");
          }
        );
      }
    });
  }
}
