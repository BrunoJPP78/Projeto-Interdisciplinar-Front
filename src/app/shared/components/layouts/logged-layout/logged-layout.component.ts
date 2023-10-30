import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Subject, takeUntil } from "rxjs";
import { LoggedLayoutService } from "./logged-layout.service";
import { NgClass, NgStyle } from "@angular/common";
import { TitleBarComponent } from "./components/title-bar/title-bar.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-logged-layout",
  templateUrl: "./logged-layout.component.html",
  styleUrls: ["./logged-layout.component.scss"],
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    RouterModule,
    TitleBarComponent,
    ToolbarComponent,
    SidebarComponent,
    MatSidenavModule,
    TranslateModule,
  ],
})
export class LoggedLayoutComponent implements OnInit, OnDestroy {
  opened?: boolean = undefined;
  clear: boolean = true;
  ngSubscribe = new Subject();

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
        this.clear = false;
      });
  }
}
