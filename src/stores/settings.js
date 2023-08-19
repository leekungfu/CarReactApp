import { makeAutoObservable } from "mobx";
import { keys } from "lodash";

class Settings {
  username = "";
  fullName = "";
  sidebar = { minimize: true, show: false };
  permissions = [];
  productPermissions = [];
  coin = "";

  constructor() {
    makeAutoObservable(this);
  }

  toggleShow(isShow) {
    this.sidebar.show = isShow;
  }

  toggleMinimize(isMinimize) {
    this.sidebar.minimize = isMinimize;
  }
  sets = (object) => {
    keys(object).forEach((key) => {
      this[key] = object[key];
    });
  };
}

const settings = new Settings();
export default settings;
