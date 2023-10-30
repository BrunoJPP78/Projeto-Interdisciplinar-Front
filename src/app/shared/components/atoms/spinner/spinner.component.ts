import { Component } from "@angular/core";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ColorPipe } from "src/app/core/pipes/color.pipe";
import { RequestLoaderService } from "src/app/core/services/request-loader.service";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
  standalone: true,
  imports: [NgxSpinnerModule, ColorPipe],
})
export class SpinnerComponent {
  constructor(private requestLoaderService: RequestLoaderService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.requestLoaderService.isLoading.subscribe((isLoading) => {
      setTimeout(() => {
        isLoading ? this.spinner.show() : this.spinner.hide();
      }, 100);
    });
  }
}
