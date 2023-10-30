import { Component, Input, OnInit } from "@angular/core";
import { TitleBarComponent } from "../logged-layout/components/title-bar/title-bar.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AdvancedFilterComponent, AdvancedFilterService } from "../../atoms/advanced-filter";
import { NgClass } from "@angular/common";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "basic-page",
  templateUrl: "./basic-page.component.html",
  styleUrls: ["./basic-page.component.scss"],
  standalone: true,
  imports: [NgClass, TitleBarComponent, MatSidenavModule, AdvancedFilterComponent],
})
export class BasicPageComponent implements OnInit {
  @Input() title: string = "";
  @Input() advancedFilter: boolean = false;
  advancedFilterOpened = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private advancedFilterService: AdvancedFilterService) {}

  ngOnInit(): void {
    this.inicializarFiltroAvancado();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
  }

  private inicializarFiltroAvancado(): void {
    this.advancedFilterService.filtroAberto$.pipe(takeUntil(this.unsubscribe$)).subscribe((filtroAberto) => {
      this.advancedFilterOpened = filtroAberto;
    });
  }

  abrirOufecharFiltroAvancado(): void {
    this.advancedFilterService.filtroAberto$.next(!this.advancedFilterOpened);
  }
}
