import BaseStore from "./BaseStore";
import { makeObservable, observable } from "mobx";
import moment from "moment";

export default class SummaryReportStore extends BaseStore {
  username = null;
  uin = null;
  fromTime = null;
  toTime = null;

  totalDrivingDuration = null;
  totalStoppingDuration = null;
  totalDrivingDistance = null;
  averageSpeed = null;
  totalOverSpeedNumber = null;
  totalOpenCloseDoorNumber = null;
  totalUnloadNumber = null;
  totalUnload = null;
  totalDone = null;
  totalIgnitionDuration = null;
  totalFuel = null;
  totalMovingDuration = null;
  totalStopDuration = null;
  totalMovingFuel = null;
  totalStopFuel = null;
  totalStartFuelLevel = null;
  totalUsedFuel = null;
  totalAddedFuel = null;
  totalRemainFuel = null;
  totalNormFuel = null;
  totalNormFuelPer100Km = null;
  totalRemovedFuel = null;
  totalAddedTimes = null;
  totalRemovedTimes = null;
  totalAirConditionDuration = null;
  plateNumber = null;
  companyName = null;

  stopType = 0;
  stopTime = 0;
  area = 0;
  count = 0;
  totalFee = 0;
  startArea = "";
  endArea = "";
  includeUnload = "1";
  driverId = "";
  usingCache = true;

  constructor() {
    super();

    this.fromTime = moment()
      // .set("dates", 1)
      .set("milliseconds", 0)
      .set("seconds", 0)
      .set("minutes", 0)
      .set("hours", 0);

    this.toTime = moment()
      .set("milliseconds", 999)
      .set("seconds", 59)
      .set("minutes", 59)
      .set("hours", 23);

    makeObservable(this, {
      username: observable,
      uin: observable,
      fromTime: observable,
      toTime: observable,
      totalDrivingDuration: observable,
      totalStoppingDuration: observable,
      totalDrivingDistance: observable,
      averageSpeed: observable,
      totalOverSpeedNumber: observable,
      totalOpenCloseDoorNumber: observable,
      totalUnloadNumber: observable,
      totalUnload: observable,
      totalDone: observable,
      totalIgnitionDuration: observable,
      totalFuel: observable,
      plateNumber: observable,
      stopType: observable,
      stopTime: observable,
      totalMovingDuration: observable,
      totalStopDuration: observable,
      totalMovingFuel: observable,
      totalStopFuel: observable,
      totalStartFuelLevel: observable,
      totalUsedFuel: observable,
      totalAddedFuel: observable,
      totalRemainFuel: observable,
      totalNormFuel: observable,
      totalNormFuelPer100Km: observable,
      totalRemovedFuel: observable,
      totalAddedTimes: observable,
      totalRemovedTimes: observable,
      totalAirConditionDuration: observable,
      area: observable,
      count: observable,
      totalFee: observable,
      startArea: observable,
      endArea: observable,
      includeUnload: observable,
      companyName: observable,
      driverId: observable,
      usingCache: observable,
    });
  }

  storeUnmount() {
    this.items = [];
    this.isGetting = false;
    this.isGettingSchema = false;
    this.isPutting = false;
    this.isDeleting = false;
    this.error = null;

    this.totalDrivingDuration = null;
    this.totalStoppingDuration = null;
    this.totalDrivingDistance = null;
    this.averageSpeed = null;
    this.totalOverSpeedNumber = null;
    this.totalOpenCloseDoorNumber = null;
    this.totalUnloadNumber = null;
    this.totalUnload = null;
    this.totalDone = null;
    this.totalIgnitionDuration = null;
    this.totalFuel = null;
    this.totalMovingDuration = null;
    this.totalStopDuration = null;
    this.totalMovingFuel = null;
    this.totalStopFuel = null;
    this.totalStartFuelLevel = null;
    this.totalUsedFuel = null;
    this.totalAddedFuel = null;
    this.totalRemainFuel = null;
    this.totalNormFuel = null;
    this.totalNormFuelPer100Km = null;
    this.totalRemovedFuel = null;
    this.totalAddedTimes = null;
    this.totalRemovedTimes = null;
    this.totalAirConditionDuration = null;
    this.plateNumber = null;
    this.companyName = null;

    this.stopType = 0;
    this.stopTime = 0;
    this.area = 0;
    this.count = 0;
    this.totalFee = 0;
    this.startArea = "";
    this.endArea = "";
    this.includeUnload = "1";
    this.driverId = "";
  }
}
