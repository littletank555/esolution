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