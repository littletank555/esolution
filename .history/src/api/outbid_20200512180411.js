import request from "@/utils/request.js"
import Qs from "qs"
export function new_bid(list) {
    return request({
        url: "admin-index?page=outbid&action=new_bid",
        method: "POST",
        data: Qs.stringify({
            ...list
        })
    });
}
export function get_bid() {
    return request({
        url: "admin-index?page=outbid&action=get_bid",
        method: "POST",
        data: Qs.stringify({

        })
    });
}