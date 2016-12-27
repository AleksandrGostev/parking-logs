import {Component} from '@angular/core';
import {HttpService} from "../service/http.service";
import * as moment from 'moment';
import {LogItem} from "./log-item";
import * as _ from "lodash";
import {Intersection} from "./intersection";
import {Input} from "@angular/core/src/metadata/directives";
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
    `]
})
export class LogChartComponent {
    logItems: LogItem[] = [];
    options: Object;
    chartData: any[] = [];
    maxCarsCount: Intersection = new Intersection('', 0);
    model: Object;
    dateStart: any = "";
    dateEnd: any = "";
    minLogItem: LogItem;
    maxLogItem: LogItem;


    constructor(private httpService: HttpService) {
        this.httpService.logItemsChanged.subscribe(
            (logItems: LogItem[]) => this.redrawChart(logItems)
        );
        this.model = {
            apiUrl: this.httpService.apiUrl
        };
    }

    onSubmit(form: NgForm) {
        this.httpService.apiUrl = form.value.apiUrl;
        this.httpService.getLogs();
        this.dateStart = '';
        this.dateEnd = '';
    }

    filterResults() {
        let minLogItem = this.minLogItem;
        let maxLogItem = this.maxLogItem;
        if (this.dateStart !== '') {
            minLogItem = new LogItem(0, moment.utc(this.dateStart.toString()).format(), "");
        }
        if (this.dateEnd !== '') {
            maxLogItem = new LogItem(0, "", moment.utc(this.dateEnd.toString()).format());
        }
        this.processLogs(minLogItem, maxLogItem);
    }

    clearFilers() {
        this.processLogs(this.minLogItem, this.maxLogItem);
        this.dateStart = '';
        this.dateEnd = '';
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
        this.chartData = [];
        var ms = moment(maxLogItem.LeaveTime).diff(minLogItem.ArrivalTime);
        var duration = moment.duration(ms);
        var minutes = duration.asMinutes();
        var totalIntersections = [];
        for (var i = 0; i <= minutes; i++) {
            let compareToTimeStart = moment(minLogItem.ArrivalTime).add(i, "minutes").unix();
            totalIntersections[i] = {
                count: 0,
                items: [],
                dateTime: compareToTimeStart
            };
            _.forEach(this.logItems, function (item, key) {
                if (item.arrivalTimeSeconds <= compareToTimeStart && item.leaveTimeSeconds >= compareToTimeStart) {
                    totalIntersections[i].items.push(item);
                    totalIntersections[i].count = totalIntersections[i].count + 1;
                }
            });
            if (totalIntersections[i].items.length > 0) {
                this.chartData.push([compareToTimeStart * 1000, totalIntersections[i].items.length]);
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
            width: 250,
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
                {name: 'history log', data: this.chartData}
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -2
                            },
                            title: {
                                text: ''
                            }
                        }
                    }
                }]
            }
        }
    }
}
