import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateTimeEditorComponent } from './datetimepicker-editor.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot()
    ],
    declarations: [
        DateTimeEditorComponent
    ],
    exports: [DateTimeEditorComponent]
})
export class DateTimeEditorModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DateTimeEditorModule,
        }
    }
}
