import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, filter } from "rxjs";
import { Location } from "@angular/common";

export interface BreadCrumb {
  label: string;
  url: string;
}

const homeBreadcrumb = {
  label: "Home",
  url: `/welcome`,
};

@Injectable({
  providedIn: "root",
})
export class LoggedLayoutService {
  //Breadcrumb
  private readonly _breadcrumbs$ = new BehaviorSubject<BreadCrumb[]>([]);
  get breadcrumbs$() {
    return this._breadcrumbs$.asObservable();
  }
  breadcrumbs: BreadCrumb[] = [
    {
      label: "Home",
      url: `/welcome`,
    },
  ];

  toolbarOpen$ = new BehaviorSubject<boolean | null>(null);

  constructor(private router: Router, private location: Location) {
    this._breadcrumbs$.next(this.breadcrumbs);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.verificaBreadcrumbs());
  }

  verificaBreadcrumbs(): void {
    this.breadcrumbs = [
      {
        label: "Home",
        url: `/welcome`,
      },
    ];
    const root = this.router.routerState.snapshot.root.children[0];
    this.addBreadcrumb(root);
    this._breadcrumbs$.next(this.breadcrumbs);
  }

  addBreadcrumb(route: ActivatedRouteSnapshot) {
    if (route.data?.["breadcrumb"]) {
      const label = route.data["breadcrumb"].label;
      const url = route.pathFromRoot.map((v) => v.url.map((segment) => segment.toString()).join("/")).join("/");
      const jaExiste = this.breadcrumbs.some((breadcrumb) => breadcrumb.label === label && breadcrumb.url === url);
      if (!jaExiste && label.length > 0) {
        this.breadcrumbs.push({ label, url });
      }
    }
    if (route.children.length) this.addBreadcrumb(route.children[0]);
  }

  saveBreadcrumbs(breadcrumbs: BreadCrumb[]) {
    this._breadcrumbs$.next(breadcrumbs);
  }
}
