import { keys } from "lodash";
import { action, makeObservable, observable } from "mobx";
import request from "src/utils/request";

export default class ImportProductsStore {
  username = "";
  model = "";
  simType = "";
  serverIp = "";
  gprs = 0;
  file = null;
  isLoading = false;
  mediaServerIp = "";
  constructor() {
    makeObservable(this, {
      set: action,
      sets: action,
      save: action,
      reset: action,
      storeUnmount: action,
      username: observable,
      model: observable,
      simType: observable,
      serverIp: observable,
      isLoading: observable,
      file: observable,
      gprs: observable,
      mediaServerIp: observable,
    });
  }

  storeUnmount = () => {
    this.username = "";
    this.model = "";
    this.simType = "";
    this.serverIp = "";
    this.gprs = 0;
    this.mediaServerIp = "";
  };

  set = ({ key, value }) => {
    this[key] = value;
  };

  sets = (object) => {
    keys(object).forEach((key) => {
      this[key] = object[key];
    });
  };

  save = async ({ onSuccess, onError }) => {
    this.isLoading = true;

    const formData = new FormData();
    formData.append("file", this.file);

    try {
      const { data: response } = await request.post(
          `Manage/ImportProduct?username=${this.username}&model=${this.model}&simType=${this.simType}&serverIp=${this.serverIp}&gprs=${this.gprs}&mediaServerIp=${this.mediaServerIp}`,
        formData
      );
      if (response.isSuccess) {
        onSuccess(response);
      } else {
        onError(response.message);
      }
    } catch (error) {
      console.error(error);
      onError(error.message);
    }

    this.isLoading = false;
  };

  reset = () => {
    this.username = "";
    this.model = "";
    this.simType = "";
    this.serverIp = "";
    this.file = null;
    this.gprs = 0;
    this.mediaServerIp = "";
  };
}
