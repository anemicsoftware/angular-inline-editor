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
const CHECKBOX_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => CheckBoxEditorComponent),
    multi: true
};
let CheckBoxEditorComponent = class CheckBoxEditorComponent {
    constructor(element) {
        this.label = ''; // Placeholder value for input element
        this.required = false; // Is input requried?
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.checkedDisplayValue = '';
        this.uncheckedDisplayValue = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.display = '';
        this.preValue = ''; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
    }
    onSaveCheckBox() {
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    }
    onCancelCheckBox() {
        this.editing = false;
        this._value = this._originalValue;
        this.onCancel.emit('clicked cancel');
    }
    onCloseInput() {
        this.editing = false;
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
        if (this.disabled === 'true')
            return;
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    }
    checkedChange(event) {
        this.value = event.target.checked;
    }
    ngOnInit() {
    }
};
__decorate([
    core_1.ViewChild('checkboxEditorControl'),
    __metadata("design:type", core_1.ElementRef)
], CheckBoxEditorComponent.prototype, "checkboxEditorControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckBoxEditorComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CheckBoxEditorComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckBoxEditorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckBoxEditorComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckBoxEditorComponent.prototype, "checkedDisplayValue", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckBoxEditorComponent.prototype, "uncheckedDisplayValue", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CheckBoxEditorComponent.prototype, "onSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CheckBoxEditorComponent.prototype, "onCancel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CheckBoxEditorComponent.prototype, "onEditing", void 0);
CheckBoxEditorComponent = __decorate([
    core_1.Component({
        selector: 'checkbox-editor',
        template: '<div *ngIf="editing">' +
            '<div class="row">' +
            '<div class="col-md-6">' +
            '<div class="form-check">' +
            '<label #checkboxEditorControl class="form-check-label">' +
            '<input type="checkbox" class="form-check-input" [(checked)]="value" (change)="checkedChange($event)" />&nbsp;{{label}}' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-6 text-right">' +
            '<button class="btn btn-sm btn-success" type="button" (click)="onSaveCheckBox()">' +
            '<i class="fa fa-check" aria-hidden="true"></i>' +
            '</button>' +
            '<button class="btn btn-sm btn-danger" type="button" (click)="onCancelCheckBox()">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div *ngIf="!editing">' +
            '<div class="form-group">' +
            '<div (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == \'true\' ? \'inline-no-edit\' : \'inline-edit\'">{{value == true ? checkedDisplayValue : uncheckedDisplayValue}}&nbsp;</div>' +
            '</div>' +
            '</div>',
        styles: [
            '.col-form-label { padding-bottom: 0px !important; }',
            '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
            '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
            '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
        ],
        providers: [CHECKBOX_EDIT_CONTROL_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CheckBoxEditorComponent);
exports.CheckBoxEditorComponent = CheckBoxEditorComponent;
