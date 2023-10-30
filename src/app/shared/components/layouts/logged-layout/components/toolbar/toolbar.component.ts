import { Component, OnInit } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LoggedLayoutService } from "../../logged-layout.service";
import { MatMenuModule } from "@angular/material/menu";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { MatBadgeModule } from "@angular/material/badge";
import { ModalService } from "src/app/shared/components/molecules/modal/modal.service";
import { TrocarUnidadeModalComponent } from "../trocar-unidade-modal/trocar-unidade-modal.component";
import { NgFor } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  standalone: true,
  imports: [NgFor, RouterModule, MatMenuModule, MatBadgeModule, MatToolbarModule, MatIconModule, MatButtonModule],
})
export class ToolbarComponent implements OnInit {
  notifications = [
    {
      title: "Notificação 1",
      description: "11/12/2023",
      link: "#",
    },
  ];
  user = {
    name: "Bruno Lima", // Inicialize com uma string vazia
    role: "Admin",
  };
  unidade = {
    name: "", // Inicialize com uma string vazia
  };
  constructor(
    private layoutService: LoggedLayoutService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    // Verifique se há um valor no Local Storage
    const userData = localStorage.getItem("user");

    if (userData) {
      // Parse do JSON armazenado no Local Storage para um objeto JavaScript
      const userObject = JSON.parse(userData);

      // Defina o nome do usuário e unidade com base nos dados do Local Storage
    }
  }

  toggleMenu() {
    this.layoutService.toolbarOpen$.next(!this.layoutService.toolbarOpen$.value);
  }

  logout(): void {
    this.authService.logout();
  }

  changeUnidade(): void {
    this.modalService.open(TrocarUnidadeModalComponent);
  }
}
