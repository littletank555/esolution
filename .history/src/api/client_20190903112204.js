import request from "@/utils/request.js"
import Qs from "qs"
export function get_clients() {
    return request({
        url: "admin-index?page=client&action=get_clients",
        method: "POST",
        data: Qs.stringify({

        })
    });
}
export function upload_client_list(file_id) {
    return request({
        url: "upload-client/",
        method: "POST",
        data: Qs.stringify({
            file_id
        })
    });
}
export function c_client_by_list(list) {
    return request({
        url: "admin-index?page=client&action=c_client_by_list",
        method: "POST",
        data: Qs.stringify({
            list
        })
    });
}
{

}
export function create_client(values) {
    return request({
        url: "admin-index?page=client&action=create_client",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    });
}
export function update_client(values) {
    return request({
        url: "admin-index?page=client&action=update_client",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    });
}
export function delete_client(cid) {
    return request({
        url: "admin-index?page=client&action=delete_client",
        method: "POST",
        data: Qs.stringify({
            cid
        })
    });
}