import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private matSnackBar: MatSnackBar) {}

  open(message: string, action: string, className?: any, hPosition?: any, vPosition?: any) {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: hPosition ? hPosition : "end",
      verticalPosition: vPosition ? vPosition : "top",
      panelClass: className,
    });
  }
}
