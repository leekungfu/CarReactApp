import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class UserManageStore extends BaseStore {
  selectedParent = null;
  searchKey = "";
  isOpenDeviceManageDialog = false;
  selectedChildren = null;

  constructor() {
    super();
    makeObservable(this, {
      searchKey: observable,
      selectedParent: observable,
      isOpenDeviceManageDialog: observable,
      selectedChildren: observable,
    });
  }
}
