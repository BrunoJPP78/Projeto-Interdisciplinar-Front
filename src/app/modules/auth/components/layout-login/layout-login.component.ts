import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  RouterModule,
  RoutesRecognized,
} from "@angular/router";
import { ColorPipe } from "src/app/core/pipes/color.pipe";
import { filter, map } from "rxjs";
@Component({
  selector: "app-layout-login",
  templateUrl: "./layout-login.component.html",
  styleUrls: ["./layout-login.component.scss"],
  standalone: true,
  imports: [RouterModule, ColorPipe],
})
export class LayoutLoginComponent implements OnInit {
  title: string = "Lubit";
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          return child?.snapshot.data["title"];
        })
      )
      .subscribe((title) => {
        this.title = title;
      });
  }

  ngOnInit() {}
}
