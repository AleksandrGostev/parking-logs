import {Injectable, EventEmitter} from '@angular/core';
import {Response, Headers, Jsonp} from "@angular/http";
import 'rxjs/Rx';
import {LogItem} from "../log-chart/log-item";

@Injectable()
export class HttpService {
    logItemsChanged = new EventEmitter<LogItem[]>();
    logItems: LogItem[] = [];
    public apiUrl = 'https://parkingapi.gear.host/v1/parking';

    constructor(private jsonp: Jsonp) {
    }

    getLogs() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let questionMarkIndex = this.apiUrl.indexOf('?');
        let additionalSign = questionMarkIndex > 0 ? '&' : '?';
        this.jsonp.get(this.apiUrl + additionalSign + 'callback=JSONP_CALLBACK')
            .map((response: Response) => response.json())
            .subscribe(
                (logItems: LogItem[]) => {
                    this.logItems = logItems;
                    this.logItemsChanged.emit(this.logItems);
                },
                error => {
                    console.log(error);
                }
            );
    }
}
