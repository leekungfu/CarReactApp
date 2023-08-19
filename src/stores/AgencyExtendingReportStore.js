import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class AgencyExtendingReportStore extends BaseStore {
    fromTime = null;
    toTime = null;
    staffId = null;

    constructor() {
        super();
        makeObservable(this, {
            fromTime: observable,
            toTime: observable,
            staffId: observable
        });

        const fromTime = new Date();
        fromTime.setHours(0, 0, 0, 0);

        const toTime = new Date();
        toTime.setHours(23, 59, 59, 999);

        this.fromTime = fromTime.toJSON();
        this.toTime = toTime.toJSON();
    }
}
