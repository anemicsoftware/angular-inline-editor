"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TimeEditorModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const time_editor_component_1 = require("./time-editor.component");
const timepicker_1 = require("ngx-bootstrap/timepicker");
let TimeEditorModule = TimeEditorModule_1 = class TimeEditorModule {
    static forRoot() {
        return {
            ngModule: TimeEditorModule_1,
        };
    }
};
TimeEditorModule = TimeEditorModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            timepicker_1.TimepickerModule.forRoot()
        ],
        declarations: [
            time_editor_component_1.TimeEditorComponent
        ],
        exports: [time_editor_component_1.TimeEditorComponent]
    })
], TimeEditorModule);
exports.TimeEditorModule = TimeEditorModule;
