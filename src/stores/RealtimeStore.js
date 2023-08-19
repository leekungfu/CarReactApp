import { keys, toLower, debounce, isEmpty, isFunction } from "lodash";
import { action, makeObservable, observable } from "mobx";
import { STORES } from "src/shared/configs/constants";

import request from "src/utils/request";
import { useInjectStore } from "./StoreProvider";
import { WebSocketConnector } from "src/containers/RealTime/WebSocketConnector";
import VEHICLE_STATES from "src/components/FloatingDevices/VehicleStates";

const defaultImageUrl =
  "https://th.bing.com/th/id/OIP.gaZNg-v6x20AffwRRvIoYwHaEK?pid=ImgDet&rs=1";

export default class RealtimeStore {
  searchKeyword = "";
  devices = [];
  originalDevices = [];
  images = [defaultImageUrl, defaultImageUrl];

  loading = {
    devices: false,
  };

  allVehicle = 0;
  running = 0;
  stopped = 0;
  disconnected = 0;

  error = null;
  sidebarError = null;

  isMounted = false;
  currentUserName = null;
  currentUin = null;
  selectedTab = null;
  isOpen = true;

  isOpenCameraDialog = false;
  shouldOpenCameraDialog = false;

  isOpenVideoDialog = false;
  shouldOpenVideoDialog = false;

  webSocket = null;
  lastReports = {};
  players = [];
  items = [];
  isGetting = false;

  selectedItems = {};

  resrictedPoint = {
    vehicles: [],
    name: '',
    feeType: "1",
    icons: {},
    description: "",
    fee: '',
    radius: '',
    type: null,
  }

  constructor() {

    makeObservable(this, {
      set: action,
      sets: action,
      getData: action,
      filter: action,
      setResrictedPoint: action,
      devices: observable,
      originalDevices: observable,
      loading: observable,
      searchKeyword: observable,
      running: observable,
      allVehicle: observable,
      stopped: observable,
      disconnected: observable,
      isMounted: observable,
      error: observable,
      sidebarError: observable,
      currentUserName: observable,
      currentUin: observable,
      selectedTab: observable,
      isOpen: observable,

      isOpenCameraDialog: observable,
      shouldOpenCameraDialog: observable,

      isOpenVideoDialog: observable,
      shouldOpenVideoDialog: observable,

      images: observable,
      players: observable,
      items: observable,
      isGetting: observable,
      selectedItems: observable,
      resrictedPoint: observable,
    });

    this.webSocket = new WebSocketConnector();
    this.addListener(this);
  }

  set = ({ key, value }) => {
    if (isFunction(value)) {
      this[key] = value(this);
    } else {
      this[key] = value;
    }
  };

  sets = (object) => {
    keys(object).forEach((key) => {
      this[key] = object[key];
    });

    this.running = this.devices.filter(
      (d) => d.state === VEHICLE_STATES.MOVING
    ).length;
    this.stopped = this.devices.filter(
      (d) => d.state === VEHICLE_STATES.STOPPING
    ).length;
    this.disconnected = this.allVehicle - (this.running + this.stopped);
  };

  setResrictedPoint = item => {
    keys(item).forEach((key) => {
      this.resrictedPoint[key] = item[key];
    });
  }

  getData = async (username) => {
    this.loading.devices = true;
    this.selectedItems = {};
    try {
      const { data: response } = await request.get(
        `/realtime/home?username=${username}`
      );

      const {
        allVehicleCount,
        runningVehicleCount,
        stoppingVehicleCount,
        noSignalVehicleCount,
        items,
        username: currentUserName,
      } = response;

      this.allVehicle = allVehicleCount;
      this.running = runningVehicleCount;
      this.stopped = stoppingVehicleCount;
      this.disconnected = noSignalVehicleCount;
      this.devices = items;
      this.originalDevices = items;
      this.currentUserName = currentUserName;
      this.sidebarError = null;

      // connect websocket
      var first = items[0];
      if (!first) {
        this.completeLoading();
        return;
      }

      this.webSocket.disconnect();
      this.webSocket.connect(username, first.ip, 8886);
    } catch (error) {
      this.sidebarError = error.message;
      this.currentUserName = username;
      this.reset();
    }

    this.completeLoading();
  };

  completeLoading = () => {
    this.loading.devices = false;
    this.isMounted = true;
  };

  reset = () => {
    this.allVehicle = 0;
    this.running = 0;
    this.stopped = 0;
    this.disconnected = 0;
    this.devices = [];
    this.originalDevices = [];
  };

  addListener = (listener) => {
    this.webSocket.addListener(listener);
  };

  onmessage = (data) => {
    var message = JSON.parse(data);
    const { gpsReport } = message;
    if (!gpsReport) {
      return;
    }
    this.lastReports[gpsReport.uin] = gpsReport;
  };

  filter = debounce((query) => {
    this.searchKeyword = query;
    this.devices = this.originalDevices.filter((device) => {
      return (
        isEmpty(query) || toLower(device.plateNumber).includes(toLower(query))
      );
    });
  }, 500);
}

export const useRealtimeStore = () => {
  const store = useInjectStore({
    key: STORES.REALTIME,
    store: RealtimeStore,
  });

  return store;
};
