import request from "@/utils/request.js"
import Qs from 'qs'

export function get_ke() {
    return request({
        url: "admin-index?page=ke&action=get_ke_data",
        method: "post",
        data: Qs.stringify({
        })
    })
}
export function delete_ke(keid) {
    return request({
        url: "admin-index?page=ke&action=delete_ke",
        method: "POST",
        data: Qs.stringify({
            keid
        })
    });
}
export function update_ke(values) {
    return request({
        url: "admin-index?page=ke&action=update_ke",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    });
}
export function new_ke(value) {
    return request({
        url: "admin-index?page=ke&action=new_ke",
        method: "POST",
        data: Qs.stringify({
            ...value
        })
    });
}
export function get_ke_select(pl) {
    return request({
        url: "admin-index?page=ke&action=get_ke_select",
        method: "POST",
        data: Qs.stringify({
            pl
        })
    });
}
export function c_ke_by_list(list) {
    return request({
        url: "admin-index?page=ke&action=c_ke_by_list",
        method: "POST",
        data: Qs.stringify({
            list
        })
    });
}
