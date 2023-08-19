import BaseStore from "./BaseStore";
import { makeObservable, observable } from "mobx";
import request from "src/utils/request";

export default class ProductNotesStore extends BaseStore {
    content = "";
    notes = [];

    constructor() {
        super();
        makeObservable(this, {
            content: observable,
            notes: observable,
        });
    }

    async makeNotes(){
        var url = `/manage/products/MakeNotes`;
        var res = await request.post(url, this.content);

        return res.data;
    }
}