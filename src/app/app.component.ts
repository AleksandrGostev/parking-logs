import {Component, OnInit, EventEmitter} from '@angular/core';
import {HttpService} from "./service/http.service";
import {LogItem} from "./log-chart/log-item";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
        this.httpService.getLogs();
    }

    onResize(event) {
    }
}
