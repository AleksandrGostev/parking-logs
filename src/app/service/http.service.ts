import {Injectable, EventEmitter} from '@angular/core';
import {Response, Headers, Jsonp} from "@angular/http";
import 'rxjs/Rx';
import {LogItem} from "../log-chart/log-item";
import {Observable} from "rxjs";

@Injectable()
export class HttpService {
    logItemsChanged = new EventEmitter<LogItem[]>();
    jsonError = new EventEmitter<any>();
    logItems: LogItem[] = [];
    public apiUrl = 'https://parkingapi.gear.host/v1/parking?items=100';


    constructor(private jsonp: Jsonp) {
    }

    getLogs() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let questionMarkIndex = this.apiUrl.indexOf('?');
        let additionalSign = questionMarkIndex > 0 ? '&' : '?';
        this.jsonp.get(this.apiUrl + additionalSign + 'callback=JSONP_CALLBACK')
            .map((response: Response) => response.json())
            .catch(this.handleError)
            .subscribe(
                (logItems: LogItem[]) => {
                    this.logItems = logItems;
                    this.logItemsChanged.emit(this.logItems);
                },
                error =>  {
                    this.jsonError.emit(error);
                }
            );
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
