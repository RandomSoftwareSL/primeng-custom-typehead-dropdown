import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnDestroy,
} from "@angular/core";

@Directive({
  selector: "[appNumbersOnly]",
})
export class NumbersOnlyDirective implements OnDestroy {
  regexStr = "^[0-9]+$";
  keypressListener: Function | null = null;
  pasteListener: Function | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set appNumbersOnly(value: boolean) {
    if (value) {
      // Attach the event listeners when the directive is applied
      this.keypressListener = this.renderer.listen(
        this.el.nativeElement,
        "keypress",
        (event: KeyboardEvent) => {
          this.onKeyPress(event);
        }
      );

      this.pasteListener = this.renderer.listen(
        this.el.nativeElement,
        "paste",
        (event: ClipboardEvent) => {
          this.blockPaste(event);
        }
      );
    }
  }

  onKeyPress(event: KeyboardEvent) {
    // Check if the pressed key is a number or another allowed key
    const isNumber = new RegExp(this.regexStr).test(event.key);
    // Prevent input if the pressed key is not a number
    if (!isNumber) {
      event.preventDefault();
    }
  }

  blockPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event?.clipboardData
      ?.getData("text/plain")
      .replace(/[^0-9]/g, "");
    document.execCommand("insertHTML", false, pasteData);
  }

  ngOnDestroy() {
    // Remove the event listeners when the directive is destroyed
    if (this.keypressListener) {
      this.keypressListener();
    }

    if (this.pasteListener) {
      this.pasteListener();
    }
  }
}
