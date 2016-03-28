import fs from 'fs'

const parsePath = (filePath, info)=> {
    filePath = filePath.substring(2)
    let filePathArray = filePath.split('/')

    filePathArray.shift()
    filePathArray.shift()
    filePathArray.shift()
    filePathArray.shift()

    // 长度为 1 说明是入口,不处理
    if (filePathArray.length === 1) {
        return ''
    }

    // 如果第一个元素就是 .js | .scss ,说明是根路径
    const prefix = `fit-${info.categoryName}-${info.module.path}`
    if (filePathArray[0].indexOf('.js') > -1 || filePathArray[0].indexOf('.scss')) {
        return prefix
    } else {
        filePathArray.pop()
        const addonPath = filePathArray.join('-')
        return `${prefix}-${addonPath}`
    }
}

export default (filePath, info) => {
    let source = fs.readFileSync(filePath).toString()

    const name = parsePath(filePath, info)
    if (name !== '') {
        console.log('js:',name)
        source = source.replace(/_namespace/g, name)
        fs.writeFileSync(filePath, source)
    }
}