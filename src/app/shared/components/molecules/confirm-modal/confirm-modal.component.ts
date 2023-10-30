import { Component, Input, OnInit } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
  standalone: true,
  imports: [ModalComponent, CommonModule, MatIconModule],
})
export class ConfirmModalComponent implements OnInit {
  @Input() description = "Você tem certeza que deseja realizar essa ação?";
  constructor() {}

  ngOnInit() {}
}
