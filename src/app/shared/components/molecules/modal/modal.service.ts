import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
export const defaultOptionsDialog: MatDialogConfig = {
  width: "80%",
  maxWidth: "720px",
};
@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private readonly dialog: MatDialog) {}

  open(component: ComponentType<any>, config: MatDialogConfig = {}): MatDialogRef<any, any> {
    if (!config.width) {
      config = { ...defaultOptionsDialog, ...config };
    }
    return this.dialog.open(component, config);
  }
}
