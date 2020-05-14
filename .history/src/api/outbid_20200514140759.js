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
export function new_bid_file(list) {
    return request({
        url: "admin-index?page=outbid&action=new_bid_file",
        method: "POST",
        data: Qs.stringify({
            ...list
        })
    });
}
export function get_bid_file(project_id, file_cat) {
    return request({
        url: "admin-index?page=outbid&action=get_bid_file",
        method: "POST",
        data: Qs.stringify({
            project_id, file_cat
        })
    });
}
export function del_bid_file(bid, file_id, file_cat) {
    return request({
        url: "admin-index?page=outbid&action=del_bid_file",
        method: "POST",
        data: Qs.stringify({
            bid, file_id, file_cat
        })
    });
}