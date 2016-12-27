export class LogItem {
    public arrivalTimeSeconds: Number;
    public leaveTimeSeconds: Number;

    constructor(private Id: number, public ArrivalTime: string, public LeaveTime: string) {
    }
}