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
        .bold {
            font-weight: 900;
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
    seriesData: any[] = [];


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

        this.processLogs();
    }

    clearFilers() {
        this.processLogs();
        this.filterDateStart = '';
        this.filterDateEnd = '';
    }

    redrawChart(logItems: LogItem[]) {
        this.logItems = logItems;
        console.time("Mapping");
        _.forEach(this.logItems, function(item: LogItem) {
            item.ArrivalTimeUnix = moment.utc(item.ArrivalTime).unix();
            item.LeaveTimeUnix = moment.utc(item.LeaveTime).unix();
        });
        console.timeEnd("Mapping");

        this.seriesData = _.union(_.map(this.logItems, 'ArrivalTime'), _.map(this.logItems, 'LeaveTime'));

        this.seriesData= _.sortBy(this.seriesData, function(o) {
            return moment.utc(o).unix();
        });
        this.seriesData = _.uniqBy(this.seriesData, function(o) {
            return moment.utc(o).unix();
        });
        this.processLogs();
    }

    filterTest(logItem: LogItem) {
        return
    }

    processLogs() {
        this.chartSeries = [];
        let intersection: any[] = [];
        console.time("ProcessingData");

        for (let i = 0; i < this.seriesData.length-1; i++) {
            var arrivalTime = this.seriesData[i];
            var leaveTime = this.seriesData[i+1];
            var arrivalTimeUnix = moment.utc(arrivalTime).unix();
            var leaveTimeUnix = moment.utc(leaveTime).unix();
            let carsCount = _.filter(this.logItems, function(o: LogItem) {
                return o.ArrivalTimeUnix <= arrivalTimeUnix && o.LeaveTimeUnix >= leaveTimeUnix;
            }).length;
            this.chartSeries.push(
                [moment.utc(arrivalTime).unix() * 1000, carsCount]);
            intersection.push({
                arrivalTime: arrivalTime,
                leaveTime: leaveTime,
                carsCount: carsCount
            });
        }

        this.maxCarsCount = _.maxBy(intersection, function (o) {
            return o["carsCount"];
        });

        console.timeEnd("ProcessingData");

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
