import { observable } from "mobx";

export const appStore = observable({

    currentUsername: "",
    currentUin: "",

    activeTab: 0,

    realTime: {
        isActiveCarState: false,
        isActiveContactCard: false,
    },

    history: {},

    manager: {
    },

    companyReport: {},

    governmentReport: {},

    camera: {},

    suport: {},
});

export const tabs = {
    realTime: 0,
    history: 1,
    manage: 2,
    companyReport: 3,
    governmentReport: 4,
    camera: 5,
    support: 6,
};
