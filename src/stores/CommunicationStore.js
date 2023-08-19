import { useInjectStore } from "src/stores/StoreProvider";
import { STORES } from "src/shared/configs/constants";
import { makeObservable, observable } from "mobx";
import BaseStore from "./BaseStore";

export default class CommunicationStore extends BaseStore {
  products = [];
  selectedProduct = null;
  communications = [];

  constructor() {
    super();
    makeObservable(this, {
      products: observable,
      selectedProduct: observable,
      communications: observable,
    });
  }
}

export const useCommunicationStore = () => {
  const store = useInjectStore({
    key: STORES.COMMUNICATION,
    store: CommunicationStore,
  });

  return store;
};
