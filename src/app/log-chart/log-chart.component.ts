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
    styleUrls: ['./log-chart.component.css']
})
export class LogChartComponent {
    logItems: LogItem[] = [];
    options: Object;
    chartSeries: any[] = [];
    maxCarsCount: Intersection;
    apiUrl: string;
    filterDateStart: any = "";
    filterDateEnd: any = "";
    showSpinner = false;
    seriesData: any[] = [];
    errorMessage: any;
    showMobileInput = false;


    constructor(private httpService: HttpService) {
        this.httpService.logItemsChanged.subscribe(
            (logItems: LogItem[]) => this.redrawChart(logItems)
        );
        this.httpService.jsonError.subscribe(
            error => {
                this.errorMessage = error;
                this.showSpinner = false;
            }
        );

        this.apiUrl = this.httpService.apiUrl;

    }

    getData() {
        this.showSpinner = true;
        this.httpService.apiUrl = this.apiUrl;
        this.httpService.getLogs();
        this.filterDateStart = '';
        this.filterDateEnd = '';
        this.errorMessage = '';
    }

    filterResults() {
        let filteredSeriesData = this.seriesData;
        if (this.filterDateStart != '') {
            let filteredDateStartUnix = moment.utc(this.filterDateStart).unix();
            filteredSeriesData = _.filter(filteredSeriesData, function (o) {
                return moment.utc(o).unix() >= filteredDateStartUnix;
            });
        }
        if (this.filterDateEnd != '') {
            let filteredDateEndUnix = moment.utc(this.filterDateEnd).unix();
            filteredSeriesData = _.filter(filteredSeriesData, function (o) {
                return moment.utc(o).unix() <= filteredDateEndUnix;
            });
        }

        this.processLogs(filteredSeriesData);
    }

    clearFilers() {
        this.filterDateStart = '';
        this.filterDateEnd = '';
        this.processLogs(this.seriesData);
    }

    redrawChart(logItems: LogItem[]) {
        this.logItems = logItems;
        _.forEach(this.logItems, function (item: LogItem) {
            item.ArrivalTimeUnix = moment.utc(item.ArrivalTime).unix();
            item.LeaveTimeUnix = moment.utc(item.LeaveTime).unix();
        });

        this.seriesData = _.union(_.map(this.logItems, 'ArrivalTime'), _.map(this.logItems, 'LeaveTime'));

        this.seriesData = _.sortBy(this.seriesData, function (o) {
            return moment.utc(o).unix();
        });
        this.seriesData = _.uniqBy(this.seriesData, function (o) {
            return moment.utc(o).unix();
        });
        this.processLogs(this.seriesData);
    }

    processLogs(seriesData: any[]) {
        this.chartSeries = [];
        let intersection: Intersection[] = [];

        for (let i = 0; i < seriesData.length - 1; i++) {
            var arrivalTime = seriesData[i];
            var leaveTime = seriesData[i + 1];
            var arrivalTimeUnix = moment.utc(arrivalTime).unix();
            var leaveTimeUnix = moment.utc(leaveTime).unix();
            let carsCount = _.filter(this.logItems, function (o: LogItem) {
                return o.ArrivalTimeUnix <= arrivalTimeUnix && o.LeaveTimeUnix >= leaveTimeUnix;
            }).length;
            this.chartSeries.push(
                [moment.utc(arrivalTime).unix() * 1000, carsCount]);
            intersection.push(new Intersection(arrivalTime, leaveTime, carsCount));
        }

        this.maxCarsCount = _.maxBy(intersection, function (o: Intersection) {
            return o.carsCount;
        });

        if (this.maxCarsCount != undefined) {
            this.maxCarsCount['arrivalTime'] = moment.utc(this.maxCarsCount['arrivalTime']).format('LLL');
            this.maxCarsCount['leaveTime'] = moment.utc(this.maxCarsCount['leaveTime']).format('LLL');
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
        };
        this.showSpinner = false;
    }
}
