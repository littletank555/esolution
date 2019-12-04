import request from "@/utils/request.js"
import Qs from "qs"

export function created_in_form(values) {//分判商邀請函
    return request({
        url: "export-eso-in",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_q_form(values) {//報價單
    return request({
        url: "export-eso-q",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_sm_form(values) {//Sales Memo
    return request({
        url: "export-eso-sm",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_finished_form(values) {//Sales Memo
    return request({
        url: "export-eso-finished",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_SCN_form(values) {//Sales Memo
    return request({
        url: "export-eso-SCN",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_INV_form(values) {//Sales Memo
    return request({
        url: "export-eso-INV",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_NRR_form(values) {//Sales Memo
    return request({
        url: "export-eso-NRR",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_SOA_form(values) {//Sales Memo
    return request({
        url: "export-eso-SOA",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_BQD_form(values) {//Sales Memo
    return request({
        url: "export-eso-BQD",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
