import request from "@/utils/request.js"
import Qs from "qs"
export function created_SOA_excel(values) {//Statement of account
    return request({
        url: "export-SOA-excel",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}
export function created_quotation_excel(values) {//報價單
    return request({
        url: "export-quotation-excel",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}