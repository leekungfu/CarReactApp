import { makeObservable, observable } from "mobx";
import { PERIODS } from "src/containers/Manage/TransferManager/constants";
import BaseStore from "./BaseStore";

export default class TransferManagerStore extends BaseStore {
  serverIp = null;
  period = PERIODS[6].value;

  constructor() {
    super();
    makeObservable(this, {
      serverIp: observable,
      period: observable,
    });
  }
}
