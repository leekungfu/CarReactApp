import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class DeviceManageStore extends BaseStore {
  searchKey = "";

  constructor() {
    super();
    makeObservable(this, {
      searchKey: observable,
    });
  }
}
