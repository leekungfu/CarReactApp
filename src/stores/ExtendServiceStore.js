import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";
import request from "src/utils/request";

export default class ExtendServiceStore extends BaseStore {
    fromTime = null;
    toTime = null;
    package = 0;
    price = 0;
    coinFee = 0;
    pin = "";
    note = "";
    isAgency = false;

    constructor() {
        super();
        makeObservable(this, {
            fromTime: observable,
            toTime: observable,
            package: observable,
            price: observable,
            coinFee: observable,
            pin: observable,
            note: observable,
            isAgency: observable,
        });
    }

    reset() {
        this.fromTime = null;
        this.toTime = null;
        this.package = 0;
        this.price = 0;
        this.coinFee = 0;
        this.pin = "";
        this.note = "";
        this.isAgency = false;
        this.items = [];
    }

    async doExtend() {
        var url = `/manage/products/DoExtend`;
        var res = await request.post(url, this);

        return res.data;
    }

    async doExtendByTCoin() {
        var url = `/manage/products/DoExtendByTCoin`;
        var res = await request.post(url, this);

        return res.data;
    }
}
