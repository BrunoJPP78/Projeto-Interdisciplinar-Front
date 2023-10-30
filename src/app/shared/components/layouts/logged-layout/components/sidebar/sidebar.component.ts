import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { LoggedLayoutService } from "../../logged-layout.service";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  standalone: true,
  imports: [NgIf, NgFor, NgClass, MatExpansionModule, MatIconModule, RouterModule, MatListModule, MatMenuModule],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit, OnDestroy {
  opened?: boolean = undefined;
  ngSubscribe = new Subject();
  menuItems = [
    // {
    //   icon: "badge",
    //   label: "Colaboradores",
    //   link: "/employer",
    // },
    {
      icon: "app_registration",
      label: "Cadastros",
      link: "/Cadastros",
      children: [
        {icon: "account_circle", label: "Usuário", link: "/user"},
        {icon: "business", label: "Empresa", link: "/company",},
        {icon: "work_outline", label: "Funcionario", link: "/employer",},
      ],
    },
    {
      icon: "build",
      label: "Operações",
      link: "/Oprecoes",
      children: [
        {icon: "event", label: "Agenda", link: "/schedule"},
        {icon: "payment", label: "Pagamentos", link: "/payment"},
        {icon: "add_box", label: "Estoque", link: "/stock"},
      ],
    },
  ];

  constructor(private layoutService: LoggedLayoutService) {}

  ngOnDestroy(): void {
    this.ngSubscribe.complete();
  }

  ngOnInit() {
    this.layoutService.toolbarOpen$
      .asObservable()
      .pipe(takeUntil(this.ngSubscribe))
      .subscribe((opened) => {
        if (opened === null) return;
        this.opened = !!opened;
      });
  }

  expand() {
    this.layoutService.toolbarOpen$.next(true);
  }

  currentRoute(route: string): boolean {
    return true;
  }

  isActive(route: string): boolean {
    return window.location.href.includes(route);
  }
}
