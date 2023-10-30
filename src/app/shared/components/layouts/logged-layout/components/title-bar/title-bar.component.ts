import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BreadCrumb, LoggedLayoutService } from "../../logged-layout.service";
import { Observable, of } from "rxjs";
import { AdvancedFilterButtonComponent } from "src/app/shared/components/atoms/advanced-filter-button";

@Component({
  selector: "app-title-bar",
  templateUrl: "./title-bar.component.html",
  styleUrls: ["./title-bar.component.scss"],
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, RouterModule, TranslateModule, MatIconModule, AdvancedFilterButtonComponent],
})
export class TitleBarComponent implements OnInit {
  @Input() title: string = "Title";
  @Input() advancedFilter: boolean = false;

  breadcrumbs$: Observable<BreadCrumb[]> = of([]);
  constructor(private layoutService: LoggedLayoutService) {
    this.breadcrumbs$ = this.layoutService.breadcrumbs$;
  }

  ngOnInit() {}
}
