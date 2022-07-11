const md5 = require('./md5')
export function signatrue(appkey,timestamp,random) {
    let secret = '2244114e5407281d39fe696f'
    let str = `appkey=${appkey}&timestamp=${timestamp}&random_str=${random}&key=${secret}`
    return md5.hexMD5(str)
}