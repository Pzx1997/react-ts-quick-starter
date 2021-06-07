const path = require('path')
const fs = require('fs')

// Get the working directory of the file executed by node
const appDirectory = fs.realpathSync(process.cwd())

/**
 * 从相对路径中解析绝对路径
 * @param {string} relativePath 相对路径
 */
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath)
}

// 默认模块扩展
const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx']

/**
 * 解析模块路径
 * @param {function} resolveFn 解析方法
 * @param {string} filePath 文件路径
 */
function resolveModule(resolveFn, filePath) {
    // 检查文件是否存在
    const extension = moduleFileExtensions.find((ex) => fs.existsSync(resolveFn(`${filePath}.${ex}`)))

    if (extension) {
        return resolveFn(`${filePath}.${extension}`)
    }
    return resolveFn(`${filePath}.ts`) // 默认是ts
}

module.exports = {
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appIndex: resolveModule(resolveApp, 'src/index'), // 入口路径
    appHtml: resolveApp('public/index.html'),
    appNodeModules: resolveApp('node_modules'), // node_modules path
    appSrc: resolveApp('src'),
    appSrcComponents: resolveApp('src/components'),
    appSrcUtils: resolveApp('src/utils'),
    appProxySetup: resolveModule(resolveApp, 'src/setProxy'),
    appPackageJson: resolveApp('package.json'),
    appTsConfig: resolveApp('tsconfig.json'),
    moduleFileExtensions,
}
