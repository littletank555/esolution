import request from "@/utils/request.js"
import Qs from "qs"
export function new_project(list) {
    return request({
        url: "admin-index?page=project&action=new_project",
        method: "POST",
        data: Qs.stringify({
            ...list
        })
    });
}