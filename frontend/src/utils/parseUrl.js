export default function urlParse(url){
    let nowUrl = new URL(url);
    let params = nowUrl.searchParams;
    let obj = {};
    for (let pair of params.entries()) {
        obj[pair[0]] = pair[1];
    }
    return obj;
}