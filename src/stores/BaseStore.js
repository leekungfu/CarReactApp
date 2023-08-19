import { keys } from "lodash";
import { action, makeObservable, observable } from "mobx";

export default class BaseStore {
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

  constructor() {
    makeObservable(this, {
      items: observable,
      formSchema: observable,
      isGetting: observable,
      isGettingSchema: observable,
      isPutting: observable,
      isDeleting: observable,
      error: observable,
      set: action,
      sets: action,
      storeUnmount: action,
      storeDidMount: action,
    });
  }

  storeDidMount() {
    //
  }
  storeUnmount() {
    this.items = [];
    this.formSchema = {
      formData: {},
      schema: {},
      uiSchema: {},
    };
    this.isGetting = false;
    this.isGettingSchema = false;
    this.isPutting = false;
    this.isDeleting = false;
    this.error = null;
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
