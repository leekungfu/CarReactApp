import BaseStore from "./BaseStore";
import { makeObservable, observable } from "mobx";

export default class AgencyChargeStore extends BaseStore {
  fromDate = null;
  toDate = null;
  staffId = null;

  constructor() {
    super();
    makeObservable(this, {
      fromDate: observable,
      toDate: observable,
      staffId: observable,
    });

    this.fromDate = new Date();
    this.toDate = new Date();
  }
}
