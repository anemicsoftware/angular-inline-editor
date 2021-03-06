"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NumberEditorModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const number_editor_component_1 = require("./number-editor.component");
let NumberEditorModule = NumberEditorModule_1 = class NumberEditorModule {
    static forRoot() {
        return {
            ngModule: NumberEditorModule_1,
        };
    }
};
NumberEditorModule = NumberEditorModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        declarations: [
            number_editor_component_1.NumberEditorComponent
        ],
        exports: [number_editor_component_1.NumberEditorComponent]
    })
], NumberEditorModule);
exports.NumberEditorModule = NumberEditorModule;
