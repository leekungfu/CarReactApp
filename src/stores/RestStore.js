import axios from "axios";
import { isObject, isString, isEmpty, keys } from "lodash";
import { action, makeObservable, observable } from "mobx";

const serialize = (obj) => {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

export class RestStore {
  _apiPrefix = "/Api";
  items = [];
  formSchema = {
    formData: {},
    schema: {},
    uiSchema: {},
  };
  isGetting = false;
  isGettingSchema = false;
  isPutting = false;
  isDeleting = false;
  error = null;

  constructor(areaName, storeName) {
    this.areaName = areaName;
    this.name = storeName;

    makeObservable(this, {
      set: action,
      sets: action,
      items: observable,
      formSchema: observable,
      isGetting: observable,
      isGettingSchema: observable,
      isPutting: observable,
      isDeleting: observable,
      error: observable,
    });
  }

  async get(route) {
    const endpoint = this.getEndpoint(route);
    const result = await axios.get(endpoint);

    return result;
  }

  async put(entity) {
    const endpoint = this.getEndpoint();
    return await axios.put(endpoint, entity);
  }

  async delete(id) {
    const endpoint = this.getEndpoint(id);
    return await axios.delete(endpoint);
  }

  getEndpoint(param) {
    const { areaName, name, _apiPrefix } = this;
    switch (true) {
      case isString(param) && !isEmpty(param):
        return `${_apiPrefix}/${areaName}/${name}/${param}`;
      case Number.isInteger(param):
        return `${_apiPrefix}/${areaName}/${name}/${param}`;
      case isObject(param):
        return `${_apiPrefix}/${areaName}/${name}?${serialize(param)}`;
      default:
        return `${_apiPrefix}/${areaName}/${name}`;
    }
  }

  set = ({ key, value }) => {
    this[key] = value;
  };

  sets = (object) => {
    keys(object).forEach((key) => {
      this[key] = object[key];
    });
  };
}
