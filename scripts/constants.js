const path = require('path')

// 表示项目的根目录
const PROJECT_PATH = path.resolve(__dirname, '../')
// 表示项目名
const PROJECT_NAME = path.parse(PROJECT_PATH).name
// 判断当前环境是否是生产换成
const isDev = process.env.NODE_ENV !== 'production'

// 定义 host
const SERVER_HOST = 'localhost'
// 定义端口
const SERVER_PORT = 9000

// 是否启用打包分析
const shouldOpenAnalyzer = false
const ANALYZER_HOST = 'localhost'
const ANALYZER_PORT = '8888'

// Resource size limit
const imageInlineSizeLimit = 4 * 1024

module.exports = {
    PROJECT_PATH,
    PROJECT_NAME,
    isDev,
    SERVER_HOST,
    SERVER_PORT,
    shouldOpenAnalyzer,
    ANALYZER_HOST,
    ANALYZER_PORT,
    imageInlineSizeLimit,
}
