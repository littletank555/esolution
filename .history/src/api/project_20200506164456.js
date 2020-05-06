import request from "@/utils/request.js"
import Qs from "qs"
export function get_project() {
    return request({
        url: "admin-index?page=project&action=get_project",
        method: "POST",
        data: Qs.stringify({

        })
    });
}
export function get_project_num() {
    return request({
        url: "admin-index?page=project&action=get_project_num",
        method: "POST",
        data: Qs.stringify({

        })
    });
}
export function new_project(list) {
    return request({
        url: "admin-index?page=project&action=new_project",
        method: "POST",
        data: Qs.stringify({
            ...list
        })
    });
}
export function get_file_url(file_id) {
    return request({
        url: "admin-index?page=project&action=get_file_url",
        method: "POST",
        data: Qs.stringify({
            file_id
        })
    });
}