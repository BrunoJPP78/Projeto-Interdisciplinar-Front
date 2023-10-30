import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { BasicPageComponent } from "src/app/shared/components/layouts/basic-page/basic-page.component";
import { MatTableModule } from "@angular/material/table";
import { of } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ModalService } from "src/app/shared/components/molecules/modal/modal.service";
import { ConfirmModalComponent } from "src/app/shared/components/molecules/confirm-modal/confirm-modal.component";

import { UserService } from "../../../service/user.service";
import { ToastService } from "src/app/core/services/toast.service";

interface Usuario {

}

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss'],
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
export class DataUserComponent {
  displayedColumns: string[] = ["login", "nome", "cpf", "data_de_nascimento", "telefone", "email"];
  displayedColumnsAtribuicao: string [] = ["departamento", "cargo", "funcao", "unidade", "perfil"];
  dataSource: Usuario[] = [];
  usuarios: any[] = [];
  atribuicoes: any[] = [];
  filterForm!: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private modalService: ModalService,
    private usuarioService: UserService,
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      const userId = params['id']; // Obtém o ID da rota
      if (userId) {
        // Fazer a solicitação à API para obter os dados do usuário com base no ID
        this.usuarioService.getUsuarioById(userId).subscribe(
          (usuarioData: any) => {
            this.usuarios = [usuarioData]; // Use um array para manter a estrutura de dados consistente com a sua tabela
          },
          (error) => {
            console.error('Erro ao buscar usuário:', error);
          }
        );
  
        // Fazer a solicitação à API para obter as atribuições do usuário com base no ID
        this.usuarioService.getUsuarioAtribuicaoById(userId).subscribe(
          (atribuicoesData: any) => {
            this.atribuicoes = atribuicoesData;
          },
          (error) => {
            console.error('Erro ao buscar atribuições do usuário:', error);
          }
        );
      }
    });
  }
  
}
