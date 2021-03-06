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
const DATETIME_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => DateTimeEditorComponent),
    multi: true
};
let DateTimeEditorComponent = class DateTimeEditorComponent {
    constructor(element) {
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.format = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.preValue = ''; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.dateReqflag = false;
        this.selectedDateTime = false;
        this.showTimePicker = false;
    }
    SelectedDate() {
        // check if value is null or undefined
        if (this.showTimePicker == false)
            this.showTimePicker = true;
        else
            this.showTimePicker = false;
        //this.showTimePicker = !this.showTimePicker;
        this.selectedTime = this.value;
    }
    SelectDateTime() {
        this._value = new Date(this._value.toDateString() + ' ' + this.selectedTime.toTimeString());
        this.SelectedDate();
    }
    onSaveDateTime() {
        if (this.required == "true") {
            if (this.datetimeEditorControl.nativeElement.value == null || this.datetimeEditorControl.nativeElement.value === undefined || this.datetimeEditorControl.nativeElement.value === "") {
                this.dateReqflag = true;
                return;
            }
            else {
                this.dateReqflag = false;
            }
        }
        else {
            this.dateReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    }
    onCancelDateTime() {
        this.editing = false;
        this._value = this._originalValue;
        this.dateReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    ShowCalendar() {
        if (this.showTimePicker)
            return;
        else
            this.ctrldp.show();
    }
    onCloseDate() {
        this.editing = false;
        this.dateReqflag = false;
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
};
__decorate([
    core_1.ViewChild('datetimeEditorControl'),
    __metadata("design:type", core_1.ElementRef)
], DateTimeEditorComponent.prototype, "datetimeEditorControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimeEditorComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimeEditorComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimeEditorComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimeEditorComponent.prototype, "requiredMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimeEditorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimeEditorComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimeEditorComponent.prototype, "format", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DateTimeEditorComponent.prototype, "onSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DateTimeEditorComponent.prototype, "onCancel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DateTimeEditorComponent.prototype, "onEditing", void 0);
__decorate([
    core_1.ViewChild('dp'),
    __metadata("design:type", Object)
], DateTimeEditorComponent.prototype, "ctrldp", void 0);
DateTimeEditorComponent = __decorate([
    core_1.Component({
        selector: 'datetime-editor',
        template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #datetimeEditorControl type="datetime" (click)="ShowCalendar()"  [class.is-invalid]="dateReqflag" [ngModel]="value | date:'short'" (ngModelChange)="value=$event" class="form-control" [id]="id" type="text" [placeholder]="placeholder" >
      <span #dp="bsDatepicker" bsDatepicker (onHidden)="SelectedDate()" [(bsValue)]="value"></span>
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveDateTime()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelDateTime()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
  </div>
  <div class="time-picker-container" *ngIf="showTimePicker">
      <div class="time-picker">
          <div class="time-picker-body">
              <timepicker [(ngModel)]="selectedTime" [hourStep]=1 [minuteStep]=1></timepicker>
              <br/>
              <button class="btn btn-block btn-success" (click)="SelectDateTime()">OK</button>
          </div>
      </div>
  </div>
  <div *ngIf="dateReqflag" class="text-danger">
      {{requiredMessage}}
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
            '.bs-datepicker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }',
            '.time-picker-container { position: absolute; display: block; top: 70px; left: 75px; z-index: 1080; }',
            '.time-picker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }',
            '.time-picker-body { padding: 15px; }',
            '.bs-timepicker-field { width: 50px !important; }'
        ],
        providers: [DATETIME_EDIT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DateTimeEditorComponent);
exports.DateTimeEditorComponent = DateTimeEditorComponent;
