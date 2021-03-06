"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => InputEditorComponent),
    multi: true
};
let InputEditorComponent = class InputEditorComponent {
    constructor(element) {
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.type = 'text'; // The type of input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.stringlength = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false; // Is Component in edit mode?
        this.preValue = ''; // The value before clicking to edit
        this.inputReqflag = false;
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this._value = ''; // Private variable for input value
    }
    onSaveInput() {
        if (this.required == "true") {
            if (this.inputEditorControl.nativeElement.value == null || this.inputEditorControl.nativeElement.value === undefined || this.inputEditorControl.nativeElement.value === "") {
                this.inputReqflag = true;
                return;
            }
            else {
                this.inputReqflag = false;
            }
        }
        else {
            this.inputReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    }
    onCancelInput() {
        this.editing = false;
        this._value = this._originalValue;
        this.inputReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseInput() {
        this.editing = false;
        this.inputReqflag = false;
    }
    // Control Value Accessors for ngModel
    get value() {
        return this._value;
    }
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    // Required for ControlValueAccessor interface
    writeValue(value) {
        this._value = value;
    }
    // Required forControlValueAccessor interface
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Required forControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Do stuff when the input element loses focus
    onBlur($event) {
        this.editing = false;
    }
    // Start the editting process for the input element
    edit(value) {
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
        setTimeout(() => { this.inputEditorControl.nativeElement.focus(); }, 300);
    }
    IsInputTextEmpty() {
        return (this._value === undefined || this._value == '');
    }
    ngOnInit() {
    }
};
__decorate([
    core_1.ViewChild('inputEditorControl'),
    __metadata("design:type", core_1.ElementRef)
], InputEditorComponent.prototype, "inputEditorControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "requiredMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputEditorComponent.prototype, "stringlength", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputEditorComponent.prototype, "onSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputEditorComponent.prototype, "onCancel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputEditorComponent.prototype, "onEditing", void 0);
InputEditorComponent = __decorate([
    core_1.Component({
        selector: 'input-editor',
        template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #inputEditorControl class="form-control" [class.is-invalid]="inputReqflag" [required]="required" [id]="id" [(ngModel)]="value" type="text" [placeholder]="placeholder"
          [maxlength]="stringlength">
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveInput()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelInput()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
  </div>
  <div *ngIf="inputReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsInputTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsInputTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value}}&nbsp;</div>
  </div>
</div>`,
        styles: [
            '.col-form-label { padding-bottom: 0px !important; }',
            '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
            '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
            '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
        ],
        providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], InputEditorComponent);
exports.InputEditorComponent = InputEditorComponent;
