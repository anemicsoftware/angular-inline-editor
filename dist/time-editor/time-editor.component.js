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
const TIME_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => TimeEditorComponent),
    multi: true
};
let TimeEditorComponent = class TimeEditorComponent {
    constructor(element) {
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.type = 'text'; // The type of input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.format = '';
        this.stringlength = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.preValue = ''; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.timeReqflag = false;
        this.showTimePicker = false;
    }
    onSaveTime() {
        if (this.required == "true") {
            if (this.timeEditorControl.nativeElement.value == null || this.timeEditorControl.nativeElement.value === undefined || this.timeEditorControl.nativeElement.value == "") {
                this.timeReqflag = true;
                return;
            }
            else {
                this.timeReqflag = false;
            }
        }
        else {
            this.timeReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    }
    onCancelTime() {
        this.editing = false;
        this._value = this._originalValue;
        this.timeReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseTime() {
        this.editing = false;
        this.timeReqflag = false;
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
    }
    IsDateEmpty() {
        return (this._value === undefined || this._value == null);
    }
    ngOnInit() {
    }
    ShowTimePicker() {
        this.showTimePicker = !this.showTimePicker;
    }
};
__decorate([
    core_1.ViewChild('timeEditorControl'),
    __metadata("design:type", core_1.ElementRef)
], TimeEditorComponent.prototype, "timeEditorControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "requiredMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "format", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeEditorComponent.prototype, "stringlength", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeEditorComponent.prototype, "onSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeEditorComponent.prototype, "onCancel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeEditorComponent.prototype, "onEditing", void 0);
TimeEditorComponent = __decorate([
    core_1.Component({
        selector: 'time-editor',
        template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #timeEditorControl type="time" [class.is-invalid]="timeReqflag" [ngModel]="value | date:'shortTime'" (ngModelChange)="value=$event"
          class="form-control" [id]="id" type="text" [placeholder]="placeholder" (click)="ShowTimePicker()">
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveTime()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelTime()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
     
  </div>
  <div *ngIf="timeReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div class="time-picker-container" *ngIf="showTimePicker">
          <div class="time-picker">
              <div class="time-picker-body">
                  <timepicker [(ngModel)]="value" [(ngModel)]="value" [hourStep]=1 [minuteStep]=1></timepicker>
                  <br/>
                  <button class="btn btn-block btn-success" (click)="ShowTimePicker()">SET</button>
              </div>
          </div>
      </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsDateEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsDateEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value | date:format}}&nbsp;</div>
  </div>
</div>`,
        styles: [
            '.col-form-label { padding-bottom: 0px !important; }',
            '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
            '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
            '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
            '.time-picker-container { position: absolute; display: block; top: 70px; left: 75px; z-index: 1080; }',
            '.time-picker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }',
            '.time-picker-body { padding: 15px; }',
            '.bs-timepicker-field { width: 60px !important; }'
        ],
        providers: [TIME_EDIT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], TimeEditorComponent);
exports.TimeEditorComponent = TimeEditorComponent;
