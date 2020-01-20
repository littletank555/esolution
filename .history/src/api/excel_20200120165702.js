import request from "@/utils/request.js"
import Qs from "qs"
export function created_quotation_excel(values) {//報價單
    return request({
        url: "test-excel",
        method: "POST",
        data: Qs.stringify({
            ...values
        })
    })
}