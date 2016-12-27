export class LogItem {
    public ArrivalTimeUnix: Number;
    public LeaveTimeUnix: Number;

    constructor(private Id: number, public ArrivalTime: string, public LeaveTime: string) {
    }
}