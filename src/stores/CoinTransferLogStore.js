import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class CoinTransferLogStore extends BaseStore {
  fromTime = null;
  toTime = null;

  constructor() {
    super();
    makeObservable(this, {
      fromTime: observable,
      toTime: observable,
    });

    const fromTime = new Date();
    fromTime.setHours(0, 0, 0, 0);

    const toTime = new Date();
    toTime.setHours(23, 59, 59, 999);

    this.fromTime = fromTime;
    this.toTime = toTime;
  }
}
