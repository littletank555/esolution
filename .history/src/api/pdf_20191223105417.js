import request from "@/utils/request.js"
import Qs from "qs"

export function created_in_pdf(values) {//分判商邀請函
    return request({
        url: "admin-index?page=pdf&action=export_invitation_pdf",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}