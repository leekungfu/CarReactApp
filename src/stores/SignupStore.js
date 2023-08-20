import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class SignupStore extends BaseStore {
  fullName = null;
  email = null;
  phone = null;
  password = null;

  constructor() {
    super();
    makeObservable(this, {
      fullName: observable,
      email: observable,
      phone: observable,
      password: observable,
    });
  }
}
