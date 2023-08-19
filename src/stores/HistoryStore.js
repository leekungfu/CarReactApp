import moment from "moment";
import BaseStore from "./BaseStore";
import { action, makeObservable, observable } from "mobx";
import request from "src/utils/request";
import { SERVER_POSTING_DATE_TIME_FORMAT } from "configs/constants";
import { toString } from "lodash";

export default class HistoryStore extends BaseStore {
  uin = null;
  startDate = null;
  toDate = null;
  page = 0;
  pageSize = 0;
  pageCount = 0;

  totalDistance = 0;
  month = 0;
  distanceInMonth = 0;
  isGettingBrief = false;
  stopReportItems = [];

  constructor() {
    super();
    makeObservable(this, {
      uin: observable,
      startDate: observable,
      toDate: observable,
      page: observable,
      pageSize: observable,
      pageCount: observable,
      getData: action,
      getBrief: action,
      totalDistance: observable,
      month: observable,
      distanceInMonth: observable,
      isGettingBrief: observable,
      stopReportItems: observable
    });

    this.startDate = moment()
      .set("hours", 0)
      .set("minutes", 0)
      .set("seconds", 0)
      .set("milliseconds", 0);
    this.toDate = moment();
  }

  getData = async ({ username }) => {
    const { data: response } = await request.get(
      `history/Home?username=${username}&uin=${toString(
        this.uin
      )}&from=${moment(this.startDate).format(
        SERVER_POSTING_DATE_TIME_FORMAT
      )}&to=${moment(this.toDate).format(
        SERVER_POSTING_DATE_TIME_FORMAT
      )}&page=${this.page}`
    );

    this.items = response.data;
    this.pageCount = response.pageCount;
    this.pageSize = response.pageSize;
    this.page = response.pageIndex;
    this.stopReportItems = response.stopReportItems;
  };

  getBrief = async ({ username }) => {
    try {
      this.isGettingBrief = true;
      const { data: response } = await request.get(
        `history/Home/BriefInfo?username=${username}&uin=${toString(
          this.uin
        )}&from=${moment(this.startDate).format(
          SERVER_POSTING_DATE_TIME_FORMAT
        )}&to=${moment(this.toDate).format(SERVER_POSTING_DATE_TIME_FORMAT)}`
      );

      if (response.isSuccess) {
        this.distanceInMonth = response.distanceInMonth;
        this.month = response.month;
        this.totalDistance = response.totalDistance;
        return {
          error: null,
        };
      }

      console.log(response);
      return response;
    } catch (err) {
      return {
        error: err.message,
      };
    } finally {
      this.isGettingBrief = false;
    }
  };
}
