function format(para){
    var m = Math.floor(para / 60000),
        s = String(para - (m % 60000)).slice(0, 2);
    para = '0' + m + ':' + s;
    return para;
}
export default format