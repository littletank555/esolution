import request from "@/utils/request.js"
import Qs from "qs"

export function created_in_form(values) {//分判商邀請函
    return request({
        url: "pdf-test",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}