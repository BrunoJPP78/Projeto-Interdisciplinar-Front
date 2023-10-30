import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvancedFilterService {
  filtroAberto$ = new BehaviorSubject<boolean>(false);
  filtroFixado$ = new BehaviorSubject<boolean>(false);
  filtrar$ = new BehaviorSubject<void>(undefined);
  reiniciarFiltro$ = new BehaviorSubject<void>(undefined);

  constructor() {}

  abrirOuFecharFiltro(filtroAberto?: boolean): void {
    this.filtroAberto$.next(filtroAberto ?? !this.filtroAberto$.value);
  }
}
