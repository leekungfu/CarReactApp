import { keys } from "lodash";
import { action, makeObservable, observable } from "mobx";

export default class SystemManagementStore {
  isLoading = false;
  productId = "";
  username = "";
  agencyUsername = "";

  constructor() {
    makeObservable(this, {
      sets: action,
      isLoading: observable,
      productId: observable,
      username: observable,
      agencyUsername: observable,
    });
  }

  sets = (object) => {
    keys(object).forEach((key) => {
      this[key] = object[key];
    });
  };
}
