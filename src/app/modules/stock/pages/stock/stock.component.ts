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

import { ToastService } from "src/app/core/services/toast.service";
import { StockService } from "../../service/stock.service";


interface Estoque {
  id: number;
  name: string;
  age: number;
}


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
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
export class StockComponent {
  displayedColumns: string[] = ["nome", "marca", "modelo", "material", "valor", "quantidade", "acoes"];
  dataSource: Estoque[] = [];
  estoques: any[] = [];

  user = {
    name: "", // Inicialize com uma string vazia
  };
  
  filterForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private modalService: ModalService,
    private estoqueService: StockService,
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
        this.estoqueService.listEstoque().subscribe(
          (data: any) => {
            this.estoques = data;
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

  deleteItem(id: number) {
    const dialogRef = this.modalService.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Acessando o ID do objeto antes de passá-lo para a função deleteUsuario
        const userId = id; // ou data.id, dependendo de onde o ID está armazenado
        this.estoqueService.delete(userId).subscribe(
          () => {
            this.estoques = this.estoques.filter((data) => data.id !== userId);
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
