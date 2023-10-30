import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cepFormat]'
})
export class CepFormatDirective {
 
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (value.length > 5) {
      value = `${value.substring(0, 5)}-${value.substring(5, 8)}`;
    } else if (value.length > 5) {
      value = `${value.substring(0, 5)}`;
    }

    input.value = value;
    // Atualize o valor do controle do formulário para refletir o valor formatado
    input.dispatchEvent(new Event('input'));
  }

}
