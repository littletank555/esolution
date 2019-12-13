import request from "@/utils/request.js"
import Qs from "qs"
export function get_contractor_data() {
    return request({
        url: "admin-index?page=contractor&action=get_contractor_data",
        method: "POST",
        data: Qs.stringify({

        })
    });
}
export function create_contractor(values) {
    return request({
        url: "admin-index?page=contractor&action=new_contractor_data",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    });
}
export function delete_contractor(con_id) {
    return request({
        url: "admin-index?page=contractor&action=delete_contractor",
        method: "POST",
        data: Qs.stringify({
            con_id
        })
    });
}
export function update_contractor(values) {
    return request({
        url: "admin-index?page=contractor&action=update_contractor",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    });
}