import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { AdvancedFilterService } from "./advanced-filter.service";
import { MatCheckboxModule } from "@angular/material/checkbox";

import ptTranslate from "./translate/pt";
import enTranslate from "./translate/en";
import esTranslate from "./translate/es";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "advanced-filter",
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatCheckboxModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: "./advanced-filter.component.html",
  styleUrls: ["./advanced-filter.component.scss"],
})
export class AdvancedFilterComponent implements OnInit {
  @Input() fixarOpcoes: boolean = false;
  @Input() desabilitado: boolean = false;

  private unsubscribe$ = new Subject<void>();

  tituloLabel: string = "";
  fixarOpcoesLabel: string = "";
  filtrarLabel: string = "";
  reiniciarFiltrosLabel: string = "";

  constructor(private translateService: TranslateService, private advancedFilterService: AdvancedFilterService) {}

  ngOnInit(): void {
    this.definirTraducoes(ptTranslate, enTranslate, esTranslate);
    this.traduzirLabels();
    this.verificarFiltroFixado();
  }

  aoFixarOpcoes() {
    const valorAtual = this.advancedFilterService.filtroFixado$.value;
    this.advancedFilterService.filtroFixado$.next(!valorAtual);
  }

  reiniciarFiltro(): void {
    this.advancedFilterService.reiniciarFiltro$.next();
  }

  filtrar(): void {
    this.advancedFilterService.filtrar$.next();
  }

  fechar(): void {
    this.advancedFilterService.filtroAberto$.next(false);
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

  traduzirLabels(): void {
    this.tituloLabel = this.translateService.instant("advancedFilter.filtrosAvancados");
    this.fixarOpcoesLabel = this.translateService.instant("advancedFilter.fixarOpcoes");
    this.filtrarLabel = this.translateService.instant("advancedFilter.filtrar");
    this.reiniciarFiltrosLabel = this.translateService.instant("advancedFilter.reiniciarFiltros");
  }

  verificarFiltroFixado(): void {
    this.advancedFilterService.filtroFixado$.pipe(takeUntil(this.unsubscribe$)).subscribe((filtroFixado) => {
      this.fixarOpcoes = filtroFixado;
    });
  }
}
