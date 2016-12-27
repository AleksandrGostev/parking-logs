import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HttpService} from "./service/http.service";
import {LogChartComponent} from './log-chart/log-chart.component';
import { ChartModule } from 'angular2-highcharts';
import {Ng2DatetimePickerModule} from "ng2-datetime-picker";

@NgModule({
    declarations: [
        AppComponent,
        LogChartComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ChartModule,
        Ng2DatetimePickerModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}