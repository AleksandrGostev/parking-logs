webpackJsonp([0,3],{225:function(t,e,n){"use strict";var i=n(1),o=n(316),r=n(691);n.n(r);n.d(e,"a",function(){return c});var a=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},s=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},c=function(){function t(t){this.jsonp=t,this.logItemsChanged=new i.EventEmitter,this.logItems=[],this.apiUrl="https://parkingapi.gear.host/v1/parking"}return t.prototype.getLogs=function(){var t=this,e=new o.a;e.append("Content-Type","application/json");var n=this.apiUrl.indexOf("?"),i=n>0?"&":"?";this.jsonp.get(this.apiUrl+i+"callback=JSONP_CALLBACK").map(function(t){return t.json()}).subscribe(function(e){t.logItems=e,t.logItemsChanged.emit(t.logItems)},function(t){console.log(t)})},t=a([n.i(i.Injectable)(),s("design:paramtypes",["function"==typeof(e="undefined"!=typeof o.b&&o.b)&&e||Object])],t);var e}()},407:function(t,e){function n(t){throw new Error("Cannot find module '"+t+"'.")}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=407},408:function(t,e,n){"use strict";var i=n(520),o=(n.n(i),n(494)),r=n(1),a=n(519),s=n(515);a.a.production&&n.i(r.enableProdMode)(),n.i(o.a)().bootstrapModule(s.a)},514:function(t,e,n){"use strict";var i=n(1),o=n(225);n.d(e,"a",function(){return s});var r=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},s=function(){function t(t){this.httpService=t}return t.prototype.ngOnInit=function(){this.httpService.getLogs()},t.prototype.onResize=function(t){},t=r([n.i(i.Component)({selector:"app-root",template:n(688),styles:[n(687)]}),a("design:paramtypes",["function"==typeof(e="undefined"!=typeof o.a&&o.a)&&e||Object])],t);var e}()},515:function(t,e,n){"use strict";var i=n(217),o=n(1),r=n(206),a=n(316),s=n(514),c=n(225),l=n(517),u=n(529),f=(n.n(u),n(684));n.n(f);n.d(e,"a",function(){return m});var d=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},p=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},m=function(){function t(){}return t=d([n.i(o.NgModule)({declarations:[s.a,l.a],imports:[i.b,r.FormsModule,a.c,a.d,u.ChartModule,f.Ng2DatetimePickerModule],providers:[c.a],bootstrap:[s.a]}),p("design:paramtypes",[])],t)}()},516:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(){function t(t,e){this.dateTime=t,this.count=e}return t}()},517:function(t,e,n){"use strict";var i=n(1),o=n(225),r=n(683),a=(n.n(r),n(518)),s=n(682),c=(n.n(s),n(516));n.d(e,"a",function(){return f});var l=this&&this.__decorate||function(t,e,n,i){var o,r=arguments.length,a=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(r<3?o(a):r>3?o(e,n,a):o(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},u=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},f=function(){function t(t){var e=this;this.httpService=t,this.logItems=[],this.chartData=[],this.maxCarsCount=new c.a("",0),this.dateStart="",this.dateEnd="",this.httpService.logItemsChanged.subscribe(function(t){return e.redrawChart(t)}),this.model={apiUrl:this.httpService.apiUrl}}return t.prototype.onSubmit=function(t){this.httpService.apiUrl=t.value.apiUrl,this.httpService.getLogs(),this.dateStart="",this.dateEnd=""},t.prototype.filterResults=function(){var t=this.minLogItem,e=this.maxLogItem;""!==this.dateStart&&(t=new a.a(0,r.utc(this.dateStart.toString()).format(),"")),""!==this.dateEnd&&(e=new a.a(0,"",r.utc(this.dateEnd.toString()).format())),this.processLogs(t,e)},t.prototype.clearFilers=function(){this.processLogs(this.minLogItem,this.maxLogItem),this.dateStart="",this.dateEnd=""},t.prototype.redrawChart=function(t){this.logItems=t,s.forEach(this.logItems,function(t,e){t.arrivalTimeSeconds=r(t.ArrivalTime).unix(),t.leaveTimeSeconds=r(t.LeaveTime).unix()}),this.logItems=s.sortBy(this.logItems,"ArrivalTimeSeconds"),this.minLogItem=s.minBy(this.logItems,function(t){return t.ArrivalTime}),this.maxLogItem=s.maxBy(this.logItems,function(t){return t.LeaveTime}),this.processLogs(this.minLogItem,this.maxLogItem)},t.prototype.processLogs=function(t,e){this.chartData=[];for(var n=r(e.LeaveTime).diff(t.ArrivalTime),i=r.duration(n),o=i.asMinutes(),a=[],l=function(){var e=r(t.ArrivalTime).add(f,"minutes").unix();a[f]={count:0,items:[],dateTime:e},s.forEach(u.logItems,function(t,n){t.arrivalTimeSeconds<=e&&t.leaveTimeSeconds>=e&&(a[f].items.push(t),a[f].count=a[f].count+1)}),a[f].items.length>0&&u.chartData.push([1e3*e,a[f].items.length])},u=this,f=0;f<=o;f++)l();var d=s.maxBy(a,function(t){return t.count});void 0===d?this.maxCarsCount=new c.a("",0):this.maxCarsCount=new c.a(r.utc(1e3*d.dateTime).format("DD/MM/YYYY HH:mm"),d.count),this.setChartOptions()},t.prototype.setChartOptions=function(){this.options={width:250,type:"linear",chart:{zoomType:"x"},xAxis:[{title:{text:"Time"},type:"datetime",ordinal:!1}],yAxis:[{title:{text:"Cars"}}],title:{text:"Parking history"},series:[{name:"history log",data:this.chartData}],responsive:{rules:[{condition:{maxWidth:500},chartOptions:{yAxis:{labels:{align:"left",x:0,y:-2},title:{text:""}}}}]}}},t=l([n.i(i.Component)({selector:"log-chart",template:n(689),styles:["\n        .row {\n            margin-top: 10px;\n        }\n        \n        chart {\n            display: block;\n        }\n    "]}),u("design:paramtypes",["function"==typeof(e="undefined"!=typeof o.a&&o.a)&&e||Object])],t);var e}()},518:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(){function t(t,e,n){this.Id=t,this.ArrivalTime=e,this.LeaveTime=n}return t}()},519:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i={production:!0}},520:function(t,e,n){"use strict";var i=n(543),o=(n.n(i),n(536)),r=(n.n(o),n(532)),a=(n.n(r),n(538)),s=(n.n(a),n(537)),c=(n.n(s),n(535)),l=(n.n(c),n(534)),u=(n.n(l),n(542)),f=(n.n(u),n(531)),d=(n.n(f),n(530)),p=(n.n(d),n(540)),m=(n.n(p),n(533)),h=(n.n(m),n(541)),v=(n.n(h),n(539)),g=(n.n(v),n(544)),y=(n.n(g),n(963));n.n(y)},687:function(t,e){t.exports=".container{\r\n    margin-top:50px;\r\n}"},688:function(t,e){t.exports='<div class="container" (window:resize)="onResize($event)">\n    <log-chart>Loading...</log-chart>\n</div>\n'},689:function(t,e){t.exports='<div class="row">\n    <form (ngSubmit)="onSubmit(f)" #f="ngForm">\n        <div class="col-sm-8">\n            <div class="form-group">\n                <input type="text" class="form-control" [(ngModel)]="model.apiUrl" name="apiUrl" />\n            </div>\n        </div>\n        <div class="col-sm-2">\n            <div class="form-group">\n                <button class="btn btn-primary form-control">Get data</button>\n            </div>\n        </div>\n    </form>\n</div>\n<div class="row">\n    <div class="col-sm-8">\n        <chart [options]="options"></chart>\n    </div>\n    <div class="col-sm-4 col-xs-12">\n        <h3>Select Date/Time Range</h3>\n        <div class="row">\n            <div class="col-sm-12">\n                <div class="form-group">\n                    <label>Start datetime</label>\n                    <input [(ngModel)]="dateStart" ng2-datetime-picker\n                           date-format="DD-MM-YYYY hh:mm"\n                           hour="23"\n                           minute=\'59\'\n                           close-on-select="false"\n                           class="form-control"\n                           (ngModelChange)="filterResults()" />\n                </div>\n            </div>\n            <div class="col-sm-12">\n                <div class="form-group">\n                    <label>End datetime</label>\n                    <input [(ngModel)]="dateEnd" ng2-datetime-picker\n                           date-format="DD-MM-YYYY hh:mm"\n                           hour="23"\n                           minute=\'59\'\n                           close-on-select="false"\n                           class="form-control"\n                           (ngModelChange)="filterResults()" />\n                </div>\n            </div>\n            <div class="col-sm-12">\n                <div class="form-group">\n                    <button class="btn btn-secondary" (click)="clearFilers()">Clear filters</button>\n                </div>\n            </div>\n        </div>\n        <p>Max cars count: {{maxCarsCount.count}} </p>\n        <p>On {{maxCarsCount.dateTime}}</p>\n    </div>\n</div>\n\n'},964:function(t,e){function n(t){throw new Error("Cannot find module '"+t+"'.")}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=964},965:function(t,e,n){t.exports=n(408)}},[965]);
//# sourceMappingURL=main.7634d35b4c0f4420966d.bundle.map