import md5 from "js-md5";
import moment from "moment";
export function convertToToken(module, action) {
    return md5('dc2cfad1400d23c512e63a028f54b0b2' + module + action + moment.utc().format("YYYY-MM-DD"));
}