import BaseStore from "./BaseStore";
import { makeObservable, observable } from "mobx";

export default class WalletStore extends BaseStore {
  username = "";
  coin = "";

  constructor() {
    super();
    makeObservable(this, {
      username: observable,
      coin: observable,
    });
  }
}
