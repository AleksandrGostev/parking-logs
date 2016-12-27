import {Component} from '@angular/core';
import {HttpService} from "../service/http.service";
import * as moment from 'moment';
import {LogItem} from "./log-item";
import * as _ from "lodash";
import {Intersection} from "./intersection";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'log-chart',
    templateUrl: './log-chart.component.html',
    styles: [`
        .row {
            margin-top: 10px;
        }
        
        chart {
            display: block;
        }
        
        .loading {
            width: 40px;
            height: 40px;
            background: url('../../assets/spin.gif') 0 0 no-repeat;
        }
    `]
})
export class LogChartComponent {
    logItems: LogItem[] = [];
    options: Object;
    chartSeries: any[] = [];
    maxCarsCount: Intersection = new Intersection('', 0);
    model: Object;
    filterDateStart: any = "";
    filterDateEnd: any = "";
    minLogItem: LogItem;
    maxLogItem: LogItem;
    showSpinner = false;


    constructor(private httpService: HttpService) {
        this.httpService.logItemsChanged.subscribe(
            (logItems: LogItem[]) => this.redrawChart(logItems)
        );
        this.model = {
            apiUrl: this.httpService.apiUrl
        };
    }

    onSubmit(form: NgForm) {
        this.showSpinner = true;
        this.httpService.apiUrl = form.value.apiUrl;
        this.httpService.getLogs();
        this.filterDateStart = '';
        this.filterDateEnd = '';
    }

    filterResults() {
        let minLogItem = this.minLogItem;
        let maxLogItem = this.maxLogItem;
        if (this.filterDateStart !== '') {
            minLogItem = new LogItem(0, moment.utc(this.filterDateStart.toString()).format(), "");
        }
        if (this.filterDateEnd !== '') {
            maxLogItem = new LogItem(0, "", moment.utc(this.filterDateEnd.toString()).format());
        }
        this.processLogs(minLogItem, maxLogItem);
    }

    clearFilers() {
        this.processLogs(this.minLogItem, this.maxLogItem);
        this.filterDateStart = '';
        this.filterDateEnd = '';
    }

    redrawChart(logItems: LogItem[]) {
        this.logItems = logItems;
        _.forEach(this.logItems, function (item, key) {
            item.arrivalTimeSeconds = moment(item.ArrivalTime).unix();
            item.leaveTimeSeconds = moment(item.LeaveTime).unix();
        });
        this.logItems = _.sortBy(this.logItems, 'ArrivalTimeSeconds');
        this.minLogItem = _.minBy(this.logItems, function (o) {
            return o.ArrivalTime
        });
        this.maxLogItem = _.maxBy(this.logItems, function (o) {
            return o.LeaveTime
        });
        this.processLogs(this.minLogItem, this.maxLogItem);
    }

    processLogs(minLogItem: LogItem, maxLogItem: LogItem) {
        this.chartSeries = [];
        let ms = moment(maxLogItem.LeaveTime).diff(minLogItem.ArrivalTime);
        let duration = moment.duration(ms);
        let minutes = duration.asMinutes();
        let totalIntersections = [];
        for (let i = 0; i <= minutes; i++) {
            let compareToTimeStart = moment(minLogItem.ArrivalTime).add(i, "minutes").unix();
            totalIntersections[i] = {
                count: 0,
                dateTime: compareToTimeStart
            };
            _.forEach(this.logItems, function (item, key) {
                if (item.arrivalTimeSeconds <= compareToTimeStart && item.leaveTimeSeconds >= compareToTimeStart) {
                    totalIntersections[i].count = totalIntersections[i].count + 1;
                }
            });
            if (totalIntersections[i].count > 0 && (i >= 1 && totalIntersections[i].count != totalIntersections[i - 1].count)) {
                this.chartSeries.push([compareToTimeStart * 1000, totalIntersections[i].count]);
            }
        }

        let maxValue = _.maxBy(totalIntersections, function (o) {
            return o["count"];
        });
        if (maxValue === undefined) {
            this.maxCarsCount = new Intersection('', 0);
        } else {
            this.maxCarsCount = new Intersection(moment.utc(maxValue['dateTime'] * 1000).format('DD/MM/YYYY HH:mm'), maxValue['count']);
        }
        this.setChartOptions();
    }

    setChartOptions() {
        this.options = {
            type: 'linear',
            chart: {zoomType: 'x'},
            xAxis: [{
                title: {
                    text: 'Time'
                },
                type: 'datetime',
                ordinal: false
            }],
            yAxis: [{
                title: {
                    text: 'Cars'
                }
            }],
            title: {text: 'Parking history'},
            series: [
                {name: 'history log', data: this.chartSeries}
            ]
        }
        this.showSpinner = false;
    }
}
