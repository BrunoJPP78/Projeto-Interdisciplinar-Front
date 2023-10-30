import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "modal",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() title: string = "";
  @Input() labelConfirm: string = "Confirmar";
  @Input() labelCancel: string = "Cancelar";
  @Input() disabled: boolean = false;
  @Input() actions: TemplateRef<any> | undefined;
  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  constructor(private dialogRef: MatDialogRef<ModalComponent>, private translateService: TranslateService) {}

  ngOnInit(): void {}

  close(): void {
    this.onClose.emit();
    this.dialogRef.close(false);
  }

  confirm(): void {
    if (!this.disabled) {
      this.dialogRef.close(true);
      this.onConfirm.emit();    }
  }
}
