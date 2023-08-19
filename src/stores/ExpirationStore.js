import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class ExpirationStore extends BaseStore {
  expirationType = 0;
  fromTime = null;
  toTime = null;

  constructor() {
    super();
    makeObservable(this, {
      expirationType: observable,
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
