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
const TEXTAREA_EDIT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => TextAreaEditorComponent),
    multi: true
};
let TextAreaEditorComponent = class TextAreaEditorComponent {
    constructor(element) {
        this.label = '';
        this.required = "false";
        this.requiredMessage = '';
        this.disabled = "false";
        this.id = '';
        this.stringlength = '';
        this.maxheight = 'auto';
        this.minheight = 'auto';
        this.placeholder = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false; // Is Component in edit mode?
        this.preValue = ''; // The value before clicking to edit
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.textareaReqflag = false;
        this._value = ''; // Private variable for input value
    }
    onSaveTextarea() {
        if (this.required == "true") {
            if (this.textareaEditorControl.nativeElement.value == null || this.textareaEditorControl.nativeElement.value === undefined || this.textareaEditorControl.nativeElement.value === "") {
                this.textareaReqflag = true;
                return;
            }
            else {
                this.textareaReqflag = false;
            }
        }
        else {
            this.textareaReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    }
    onCancelTextarea() {
        this.editing = false;
        this._value = this._originalValue;
        this.textareaReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseTextarea() {
        this.editing = false;
        this.textareaReqflag = false;
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
        setTimeout(() => { this.textareaEditorControl.nativeElement.focus(); }, 300);
    }
    IsTextareaEmpty() {
        return (this._value === undefined || this._value == '');
    }
    ngOnInit() {
    }
};
__decorate([
    core_1.ViewChild('textareaEditorControl'),
    __metadata("design:type", core_1.ElementRef)
], TextAreaEditorComponent.prototype, "textareaEditorControl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "requiredMessage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "stringlength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "maxheight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "minheight", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextAreaEditorComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TextAreaEditorComponent.prototype, "onSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TextAreaEditorComponent.prototype, "onCancel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TextAreaEditorComponent.prototype, "onEditing", void 0);
TextAreaEditorComponent = __decorate([
    core_1.Component({
        selector: 'textarea-editor',
        template: `<div *ngIf="editing">
    <label class="col-form-label">{{label}}</label>
    <div class="input-group">
        <textarea [id]="id" #textareaEditorControl [(ngModel)]="value" [class.is-invalid]="textareaReqflag" style="word-wrap: break-word;"
            [maxlength]="stringlength" [style.height]="maxheight" class="form-control" wrap="hard">
            </textarea>
    </div>
    <div *ngIf="textareaReqflag" class="text-danger">
        {{requiredMessage}}
    </div>
    <div class="text-right">
        <button class="btn btn-success" type="button" (click)="onSaveTextarea()">
            <i class="fa fa-check" aria-hidden="true"></i>
        </button>
        <button class="btn btn-danger" type="button" (click)="onCancelTextarea()">
            <i class="fa fa-times" aria-hidden="true"></i>
        </button>
    </div>

</div>
<div *ngIf="!editing">
    <div class="form-group">
        <label class="col-form-label">{{label}}</label>
        <div *ngIf="IsTextareaEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">{{placeholder}}&nbsp;</div>
        <div *ngIf="!IsTextareaEmpty()" (click)="edit(value)" (focus)="edit(value);" [style.height]="minheight" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value}}&nbsp;</div>
    </div>
</div>`,
        styles: [
            '.col-form-label { padding-bottom: 0px !important; }',
            '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
            '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
            '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
        ],
        providers: [TEXTAREA_EDIT_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], TextAreaEditorComponent);
exports.TextAreaEditorComponent = TextAreaEditorComponent;
