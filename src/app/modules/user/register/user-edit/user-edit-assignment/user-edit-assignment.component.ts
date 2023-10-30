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
import { UserService } from "../../../service/user.service";
import { Router } from "@angular/router";
import { CepService } from "src/app/core/services/cep.service";
import { ToastService } from "src/app/core/services/toast.service";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { SelectService } from "src/app/service/select/select.service";

@Component({
  selector: 'app-user-edit-assignment',
  templateUrl: './user-edit-assignment.component.html',
  styleUrls: ['./user-edit-assignment.component.scss'],
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
export class UserEditAssignmentComponent {
  @Input() id!: number;
  atribuicoesForms: FormGroup[] = [];
  form!: FormGroup;
  isEditMode = false; // Variável de controle para o modo de edição
  usuario: any; // Armazenar os dados do fornecedor a ser editado
  usuarioId: number = 0; // Variável para armazenar o ID do fornecedor
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
     private route: ActivatedRoute ,
     private userService: UserService,
     private cepService: CepService,
     private router: Router,
     private toastService: ToastService,
     private selectService: SelectService
     ) {
  }

  carregarUsuariosAtribuicao() {
    console.log("Chamando");
    // Chame o serviço para buscar endereços com base no nome_fantasia
    this.userService.getUsuarioAtribuicaoById(this.usuarioId).subscribe(
      (atribuicoes: any[]) => {
        // Limpe os formulários existentes
        this.atribuicoesForms = [];
  
        // Crie um formulário para cada endereço e preencha com os dados
        for (const atribuicao of atribuicoes) {
          const atribuicaoForm = this.fb.group({
            departamento: [atribuicao.departamento, [Validators.required]],
            cargo: [atribuicao.cargo, [Validators.required]],
            funcao: [atribuicao.funcao, [Validators.required]],
            unidade: [atribuicao.unidade, [Validators.required]],
            perfil: [atribuicao.perfil, [Validators.required]],
          });
  
          this.atribuicoesForms.push(atribuicaoForm);
        }
      },
      (error) => {
        console.error('Erro ao carregar atribuições:', error);
      }
    );
  }

  ngOnInit() {
    this.selectService.createSelect('cargo', '/select/cargo', 'Cargos', false).subscribe(
      (data: any[]) => {
        this.cargos = data;
      },
      (error) => {
        console.error('Erro ao buscar opções:', error);
      }
    );

    this.selectService.createSelect('funcao', '/select/funcao', 'Função', false).subscribe(
      (data: any[]) => {
        this.funcoes = data;
      },
      (error) => {
        console.error('Erro ao buscar opções:', error);
      }
    );

    this.selectService.createSelect('unidades', '/select/unidadecit', 'Unidade', false).subscribe(
      (data: any[]) => {
        this.unidades = data;
      },
      (error) => {
        console.error('Erro ao buscar opções:', error);
      }
    );

    this.selectService.createSelect('perfil', '/select/perfil', 'Perfil', false).subscribe(
      (data: any[]) => {
        this.perfis = data;
      },
      (error) => {
        console.error('Erro ao buscar opções:', error);
      }
    );

    this.atribuicoesForms = [];
    // Obtenha o ID do usuário a partir da rota atual
    this.route.params.subscribe(params => {
      this.usuarioId = +params['id']; // "+" converte para número
    });

    // Inicialize o formulário principal

    this.form = this.fb.group({
      departamento: ["", [Validators.required]],
      cargo: ["", [Validators.required]],
      funcao: ["", [Validators.required]],
      unidade: ["", [Validators.required]],
      perfil: ["", [Validators.required]],
    });
  
    // Recupere os dados do usuário pelo ID
    this.userService.getUsuarioAtribuicaoById(this.usuarioId).subscribe(
      (data: any) => {
        this.usuario = data
  
      // Preencha o formulário principal com os dados do usuário
      this.form.patchValue({
        departamento: data.departamento,
        cargo: data.cargo,
        funcao: data.funcao,
        unidade: data.unidade,
        perfil: data.perfil,
      });
  
          // Carregue os endereços com base no array de atribuições
          this.carregarUsuariosAtribuicao();
        },
        (error) => {
          console.error('Erro ao carregar atribuições do usuário:', error);
        }
    );
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

  // Implemente a lógica para salvar as alterações no fornecedor
  salvarAlteracoes() {
    const formData = {
      atribuicao: this.atribuicoesForms.map((atribuicaoForm) => atribuicaoForm.value)
    }
    console.log(formData);

    // Faça a chamada ao serviço para atualizar os dados do fornecedor
    this.userService.updateUsuarioAtribuicao(this.usuarioId, formData).subscribe(
      (response: any) => {
        // Lide com a resposta da atualização, por exemplo, exiba uma mensagem de sucesso
        this.toastService.open("Edição realizada com sucesso", "Fechar");

        // Redirecione ou faça outra ação adequada após a atualização
        this.router.navigate(['/user']);
      },
      (error) => {
        // Lide com erros de atualização, se necessário
        this.toastService.open("ERRO na edição de atribuições", "Fechar");
      }
    );
  }
}
