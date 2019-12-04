import request from "@/utils/request.js"
import Qs from "qs"
export function get_bid_data() {
    return request({
        url: "admin-index?page=bid&action=get_bid_data",
        method: "POST",
        data: Qs.stringify({

        })
    });
}
export function get_bid_kerecord(sort) {
    return request({
        url: "admin-index?page=bid&action=get_bid_kerecord",
        method: "POST",
        data: Qs.stringify({
            sort
        })
    });
}