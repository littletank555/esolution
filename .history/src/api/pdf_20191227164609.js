import request from "@/utils/request.js"
import Qs from "qs"

export function created_in_pdf(values) {//分判商邀請函
    return request({
        url: "export-invitation-pdf",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_quotation_pdf(values) {//報價單
    return request({
        url: "export-quotation-pdf",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_SCN_pdf(values) {//中標通知書
    return request({
        url: "export-SCN-pdf",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_finished_pdf(values) {//完工纸
    return request({
        url: "export-finished-pdf",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_SM_pdf(values) {//Sales Memo
    return request({
        url: "export-SM-pdf",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}