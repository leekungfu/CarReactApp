import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class ExtendingSumStore extends BaseStore {
    fromTime = null;
    toTime = null;
    extender = -2;
    approver = -2;
    money = 0;

    constructor() {
        super();
        makeObservable(this, {
            fromTime: observable,
            toTime: observable,
            extender: observable,
            approver: observable,
            money: observable
        });

        const fromTime = new Date();
        fromTime.setHours(0, 0, 0, 0);

        const toTime = new Date();
        toTime.setHours(23, 59, 59, 999);

        this.fromTime = fromTime.toJSON();
        this.toTime = toTime.toJSON();
    }
}
