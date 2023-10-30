import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

import ptTranslate from "./translate/pt";
import enTranslate from "./translate/en";
import esTranslate from "./translate/es";
import { TranslateService } from "@ngx-translate/core";
import { AdvancedFilterService } from "../advanced-filter/advanced-filter.service";
import { NgIf } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "advanced-filter-button",
  standalone: true,
  imports: [NgIf, MatIconModule],
  templateUrl: "./advanced-filter-button.component.html",
  styleUrls: ["./advanced-filter-button.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AdvancedFilterButtonComponent implements OnInit {
  @Input() desabilitado: boolean = false;

  constructor(private translateService: TranslateService, private advancedFilterService: AdvancedFilterService) {}

  ngOnInit(): void {
    this.definirTraducoes(ptTranslate, enTranslate, esTranslate);
  }

  definirTraducoes(ptTranslate: any, enTranslate: any, esTranslate: any): void {
    this.translateService.setDefaultLang("pt");
    const traducoes = [
      { sigla: "pt", arquivo: ptTranslate },
      { sigla: "en", arquivo: enTranslate },
      { sigla: "es", arquivo: esTranslate },
    ];
    const DEVE_FAZER_MERGE = true;
    traducoes.forEach((traducao) => {
      this.translateService.setTranslation(traducao.sigla, traducao.arquivo, DEVE_FAZER_MERGE);
    });
  }

  abrirOuFecharFiltro(): void {
    this.advancedFilterService.abrirOuFecharFiltro();
  }
}
