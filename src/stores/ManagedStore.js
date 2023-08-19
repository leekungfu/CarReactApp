import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class ManagedStore extends BaseStore {
 email = "";
 password= "";

  constructor() {
    super();
    makeObservable(this, {
      email: observable,
      password: observable,
    });
  }
}
