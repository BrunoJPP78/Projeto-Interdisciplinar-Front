import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AutocompleteComponent } from "src/app/shared/components/atoms/autocomplete/autocomplete.component";
import { ModalComponent } from "src/app/shared/components/molecules/modal/modal.component";

@Component({
  selector: "app-trocar-unidade-modal",
  templateUrl: "./trocar-unidade-modal.component.html",
  styleUrls: ["./trocar-unidade-modal.component.scss"],
  standalone: true,
  imports: [NgIf, ModalComponent, AutocompleteComponent],
})
export class TrocarUnidadeModalComponent implements OnInit {
  unidades: any[] = [];
  constructor() {}

  ngOnInit() {
    this.getUnidades();
  }

  getUnidades() {
    // Mock
    this.unidades = [
      {
        id: 1,
        name: "Matriz",
      },
      {
        id: 2,
        name: "Filial 1",
      },
      {
        id: 3,
        name: "Filial 2",
      },
    ];
  }
}
