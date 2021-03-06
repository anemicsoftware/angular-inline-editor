"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DateTimeEditorModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const datetimepicker_editor_component_1 = require("./datetimepicker-editor.component");
const datepicker_1 = require("ngx-bootstrap/datepicker");
const timepicker_1 = require("ngx-bootstrap/timepicker");
let DateTimeEditorModule = DateTimeEditorModule_1 = class DateTimeEditorModule {
    static forRoot() {
        return {
            ngModule: DateTimeEditorModule_1,
        };
    }
};
DateTimeEditorModule = DateTimeEditorModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            datepicker_1.BsDatepickerModule.forRoot(),
            timepicker_1.TimepickerModule.forRoot()
        ],
        declarations: [
            datetimepicker_editor_component_1.DateTimeEditorComponent
        ],
        exports: [datetimepicker_editor_component_1.DateTimeEditorComponent]
    })
], DateTimeEditorModule);
exports.DateTimeEditorModule = DateTimeEditorModule;
