import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[editable]',
})
export class ContentEditableDirective {
  @Input() set editable(value) {
    this.elementRef.nativeElement.innerText = value;
  }

  @Output() onContentBlur = new EventEmitter<string>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'contentEditable',
      'true'
    );
    this.elementRef.nativeElement.focus();
  }

  @HostListener('blur') onBlur() {
    this.renderer.removeAttribute(
      this.elementRef.nativeElement,
      'contentEditable'
    );
    this.onContentBlur.emit(this.elementRef.nativeElement.innerText);
  }
}
