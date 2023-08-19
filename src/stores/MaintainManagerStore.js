import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class MaintainManagerStore extends BaseStore {
  maintainType = null;
  previewingImage = null;
  constructor({ maintainType }) {
    super();
    makeObservable(this, {
      maintainType: observable,
      previewingImage: observable,
    });
    this.maintainType = maintainType;
  }
}
