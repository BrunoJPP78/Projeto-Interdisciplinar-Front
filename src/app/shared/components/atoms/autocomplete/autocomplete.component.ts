import { NgFor, NgIf } from "@angular/common";
import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { startWith } from "rxjs";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule, MatSelectModule, NgxMatSelectSearchModule],
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {
  @Input() labelKey: string = "nome";
  @Input() valueKey: string = "id";
  @Input() label: string = "label";
  @Input() multi: boolean = false;
  @Input() searchable: boolean = true;
  @Input() options: any[] = [];

  searchCtrl = new FormControl();

  selectedOptions: any[] = [];
  filteredOptions: any[] = [];

  constructor() {}

  ngOnInit() {
    this.searchCtrl.valueChanges.pipe(startWith("")).subscribe((value) => {
      this.filteredOptions = this.filterOptions(value);
    });
  }

  private filterOptions(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option[this.labelKey].toLowerCase().includes(filterValue));
  }

  // Implementação dos métodos do ControlValueAccessor
  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.selectedOptions = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implemente isso se necessário
  }

  // Método chamado quando há mudanças nas opções selecionadas
  optionChanged(selectedOptions: any[]) {
    this.selectedOptions = selectedOptions;
    this.onChange(this.selectedOptions);
    this.onTouched();
  }

  // Getter para a string das opções selecionadas separadas por vírgulas
  get selectedOptionsString(): string {
    const selectedOptions = this.options.filter((option) =>
      this.selectedOptions.some((selectedOption) => selectedOption === option[this.valueKey])
    );
    return selectedOptions.map((option) => option[this.labelKey]).join(", ");
  }

  // Métodos vazios que serão sobrescritos
  private onChange: (selectedOptions: any[]) => void = () => {};
  private onTouched: () => void = () => {};
}
