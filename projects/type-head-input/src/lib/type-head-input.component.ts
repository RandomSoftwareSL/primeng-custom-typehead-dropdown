import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  NgTypeHeadInputFilterTemplateDirective,
  NgTypeHeadInputItemTemplateDirective,
} from './directive/form-template.directive';
import { Dropdown } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'lib-typeHeadInput',
  templateUrl: './type-head-input.component.html',
  styleUrls: ['./type-head-input.component.scss'],
})
export class TypeHeadInputComponent {
  @ViewChild('select') select!: Dropdown;
  @Input() items!: SelectItem[];
  @Input() control!: UntypedFormControl;
  @Input() placeholder!: string;
  @Input() optionLabel: string = 'label';
  @Input() autoDisplayFirst: boolean = false;
  @Input() showClear: boolean = false;
  @Input() customClasses!: string;
  @Input() panelStyleClass!: string;
  @Input() customFieldText!: string;
  @Input() name!: string;
  @Input() disabled: boolean = false;
  @Input() isNumberInput: boolean = false;
  @Input() list$!: Observable<SelectItem[]>;
  @Input() enableServerSideData = false;
  @Input() isCaseInsensitive = false;
  @Input() noResultsFoundText: string = 'No results found';
  @Input() addNewText: string = '+ Add';
  @Input() requiredErrorMessage: string = `${
    this.customFieldText
      ? this.capitalizeString(this.customFieldText)
      : this.capitalizeString(this.placeholder)
  } field cannot be empty`;
  @Output() newValue = new EventEmitter();
  @Input() serverSideSearchCallback!: () => Observable<SelectItem[]>;
  selectedTypeHeadSource = new BehaviorSubject<any>(null);
  selectedTypeHead$ = this.selectedTypeHeadSource.asObservable();
  loading = false;
  newItem: SelectItem[] = [];
  _initialServerSideList: SelectItem[] = [];

  // custom templates
  @ContentChild(NgTypeHeadInputItemTemplateDirective, { read: TemplateRef })
  itemTemplate: TemplateRef<any> | undefined;
  @ContentChild(NgTypeHeadInputFilterTemplateDirective, { read: TemplateRef })
  filterTemplate: TemplateRef<any> | undefined;

  //Extract label data
  optionLabels!: (string | undefined)[];

  newCreatedValue!: string;
  newValueSource = new BehaviorSubject<any>(null);
  newValueObs$ = this.newValueSource.asObservable();
  isAvailability: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.isNumberInput) {
      this.allowNumberInput();
    }
    this.optionLabels = this.items?.map((item) => item.label);

    // server side call for the option data
    if (this.enableServerSideData) {
      this.list$ = combineLatest([
        this.selectedTypeHead$,
        this.newValueObs$,
      ]).pipe(
        tap(() => (this.loading = true)),
        switchMap(([res, newValue]) => {
          if (res) {
            this.loading = true;
            return this.serverSideSearchCallback().pipe(
              tap(() => {
                this.loading = false;
              }),
              map((data) => {
                this._initialServerSideList = data;
                return data;
              }),
              catchError(() => of([])),
              finalize(() => {
                this.loading = false;
                // finalize operator executed
              })
            );
          }
          const isAvailable = this._initialServerSideList?.some((item) => {
            return this.newCreatedValue === item.value;
          });
          if (!isAvailable) {
            return of(newValue);
          }
          this.loading = false;
          return of([]);
          // switchMap returned an observable
        }),
        finalize(() => {
          this.loading = false;
          // finalize operator executed
        })
      );
    }
  }

  onShowDropdown(event: any) {
    if (this.enableServerSideData) this.selectedTypeHeadSource.next(event);
  }

  addNewValue(inputValue?: any) {
    if (inputValue) {
      if (this.enableServerSideData) {
        this.newCreatedValue = inputValue;
        const isAvailable = this._initialServerSideList?.some((item) => {
          return inputValue === item.value;
        });

        if (!isAvailable) {
          this._initialServerSideList.push({
            label: inputValue,
            value: inputValue,
          });
          this.newValueSource.next(this._initialServerSideList);
        }
      } else {
        const newItem = { label: inputValue, value: inputValue };
        if (!this.items.find((item) => item.label === newItem.label)) {
          this.items.push(newItem);
        }
      }
    }
    const newList = {
      addedValue: inputValue,
      updatedList: this.items,
    };
    this.newValue.emit(newList);
    this.select.hide();
    this.select.value = '';
  }

  allowNumberInput() {
    setTimeout(() => {
      const input = this.select.editableInputViewChild.nativeElement;
      input.setAttribute('type', 'number');
      input.setAttribute('pattern', '[0-9]*');
    });
  }

  onChangeValue() {
    this.optionLabels = this.items?.map((item) => item.label);
  }

  checkInitialData(select: any) {
    return (
      select?.value?.length > 0 &&
      !this.items?.map((item) => item.label)?.includes(select?.value)
    );
  }

  onFilterEmitter(event: any) {
    if (this.enableServerSideData) {
      this.isAvailability = this.select.options.some((item) => {
        return this.isCaseInsensitive
          ? item.value.toLowerCase() === this.select.filterValue.toLowerCase()
          : item.value === this.select.filterValue;
      });
    } else {
      this.isAvailability = this.items.some((item) => {
        return this.isCaseInsensitive
          ? item.value.toLowerCase() === this.select.filterValue.toLowerCase()
          : item.value === this.select.filterValue;
      });
    }
  }

  capitalizeString(input: string): string {
    input = input.replaceAll(/[_-]/g, ' ');
    let inputSplit = input.split(' ');

    inputSplit = inputSplit.map((text) => {
      return `${text?.charAt(0).toUpperCase()}${text
        ?.slice(1)
        .toLocaleLowerCase()}`;
    });

    return inputSplit.join(' ');
  }
}
