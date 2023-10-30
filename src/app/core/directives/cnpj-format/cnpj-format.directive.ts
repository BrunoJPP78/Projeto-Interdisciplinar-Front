import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCnpjFormat]'
})
export class CnpjFormatDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 12) {
      value = value.substring(0, 12) + '/' + value.substring(12, 16) + '-' + value.substring(16, 18);
    } else if (value.length > 8) {
      value = value.substring(0, 8) + '/' + value.substring(8, 12);
    } else if (value.length > 5) {
      value = value.substring(0, 5) + '.' + value.substring(5, 8);
    } else if (value.length > 2) {
      value = value.substring(0, 2) + '.' + value.substring(2, 5);
    }

    this.renderer.setProperty(input, 'value', value);
  }
}
