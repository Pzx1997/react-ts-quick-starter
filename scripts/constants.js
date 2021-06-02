const path = require('path')

// 表示项目的根目录
const PROJECT_PATH = path.resolve(__dirname, '../')
// 表示项目名
const PROJECT_NAME = path.parse(PROJECT_PATH).name
// 判断当前环境是否是生产换成
const isDev = process.env.NODE_ENV !== 'production'
// 定义 host
const SERVER_HOST = '127.0.0.1'
// 定义端口
const SERVER_PORT = 9000

module.exports = {
    PROJECT_PATH,
    PROJECT_NAME,
    isDev,
    SERVER_HOST,
    SERVER_PORT,
}
