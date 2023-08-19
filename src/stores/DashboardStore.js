import { keys } from "lodash";
import { makeAutoObservable } from "mobx";
import request from "src/utils/request";

export default class DashboardStore {
  loadings = {
    gettingData: false,
    gettingVehicles: false,
  };
  uin = "";
  usersCount = 0;
  devicesCount = 0;
  runningVehicleCount = 0;
  stoppingVehicleCount = 0;
  noSignalVehicleCount = 0;
  vehiclesStatus = [];
  vehicleStatistics = [];
  vehicles = [];
  currentTab = false;
  selectedDateRange = 0;

  constructor() {
    makeAutoObservable(this);
  }

  sets = (object) => {
    keys(object).forEach((key) => {
      this[key] = object[key];
    });
  };

  getData = async (uin) => {
    this.loadings.gettingData = true;

    try {
      const { data: response } = await request.get(
        `/overview/home?uin=${uin}&period=${this.selectedDateRange}`
      );

      this.uin = response.uin;
      this.usersCount = response.usersCount;
      this.devicesCount = response.devicesCount;
      this.runningVehicleCount = response.runningVehicleCount;
      this.stoppingVehicleCount = response.stoppingVehicleCount;
      this.noSignalVehicleCount = response.noSignalVehicleCount;
      this.vehiclesStatus = response.vehiclesStatus;
      this.vehicleStatistics = response.vehicleStatistics;
    } catch (err) {
      //
    }

    this.loadings.gettingData = false;
  };

  getVehicles = async (username) => {
    this.loadings.gettingVehicles = true;
    try {
      const { data: response } = await request.get(
        `/realtime/home/VehicleStatus?username=${username}`
      );

      this.vehicles = response;
      if (response.length > 0) {
        this.currentTab = response[0].uin;
      } else {
        this.currentTab = false;
      }
    } catch (err) {
      //
    }
    this.loadings.gettingVehicles = false;
  };
}
