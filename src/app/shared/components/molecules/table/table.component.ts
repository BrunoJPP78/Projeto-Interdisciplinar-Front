import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SelectionModel } from "@angular/cdk/collections";
import { NgFor, NgIf } from "@angular/common";

export interface TableColumns {
  [key: string]: {
    title: string;
  };
}

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatTableModule, MatPaginatorModule, RouterModule, MatCheckboxModule],
})
export class TableComponent implements OnInit{
  @Input() dataSource: any[] = [];
  @Input() set columns(newColumns: TableColumns) {
    this._columns = newColumns;
    if (this._select) this._columns["select"] = { title: "" };
  }
  @Input() set select(canSelect: boolean | undefined) {
    this._select = !!canSelect;
    if (canSelect) this._columns["select"] = { title: "" };
    else if (this.columns["select"]) delete this._columns["select"];
  }
  @Output() deleteItemEvent = new EventEmitter<any>();
  @Output() pageChangeEvent = new EventEmitter<number>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Output() onSelect = new EventEmitter<any[]>();
  selection = new SelectionModel<any>(true, []);
  _select: boolean = true;
  _columns: TableColumns = {};

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Per page';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return ``;
    };
  }

  deleteItem(item: any): void {
    this.deleteItemEvent.emit(item);
  }
  onPageChange(event: any): void {
    this.pageChangeEvent.emit(event.pageIndex);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
    this.onSelect.emit(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1}`;
  }

  get displayedColumns(): string[] {
    return Object.keys(this._columns ?? {});
  }
}
