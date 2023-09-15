const fs = require("node:fs")
const path = require("node:path")
const https = require("node:https")
const url = require('url');

const config = {
  target: {
    reg: /\!\[\[[\w\s.]+\]\]/g
  },
  // https://raw.githubusercontent.com/tangqiang0605/test/main/static/Pasted%20image%2020262526.png
  replace: {
    baseURL: 'https://raw.githubusercontent.com',
    user: 'tangqiang0605',
    repo: 'test',
    branch: 'main',
    localPath: 'static',
  }
}

/**
 * 遍历文件并执行transer
 * @param {*} transer 
 * @param {*} dirPath 
 * @returns transer返回的结果report
 */
function traverse(transer, dirPath) {
  let result = null;
  const readResult = fs.readdirSync(dirPath)
  for (let file of readResult) {
    const pathName = path.resolve(dirPath, file)
    if (fs.lstatSync(pathName).isFile()) {
      if (!result) {
        result = transer(pathName)
      } else {
        transer(pathName)
      }
    } else {
      traverse(transer, pathName)
    }
  }
  return result;
}

traverse(genTransfer(getObImg, getGhImg), path.resolve(__dirname, '后台')).then(res => {
  console.log(res)
})
class GetNewStrError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GetNewStrError'
  }
}

function getObImg(text) {
  return text.match(config.target.reg)
}

async function getGhImg(old) {
  // return new Promise((resolve, reject) => {
  const fileName = old.slice(3, old.length - 2)
  const uri = getURI(config.replace, fileName)
  const exsit = await isExistRemote(uri)
  if (exsit) {
    return `\![${fileName}](${uri})`
    // resolve()
  } else {
    throw new GetNewStrError('云端图片不存在')
    // reject('云端图片不存在')
  }
  // })
}
// function getMatchResult(text, target) {
//   return text.match(target.reg)
// }
function getURI({ baseURL, user, repo, branch, localPath }, fileName) {
  return encodeURI(`${baseURL}/${user}/${repo}/${branch}/${localPath}/${fileName}`)
}
// function getNew(fileName, uri) {
//   return `\![${fileName}](${uri})`
// }
/**
 * 根据config生成转换文件内容的函数
 * @param {*} config 包含两个属性，被转换的内容和转换后的内容 
 * @returns
 */
// todo 抽取report
/**
 * 
 * @param {*} getOld 
 * @param {*} getNew 
 * @returns 
 */
function genTransfer(getOld, getNew) {
  const report = {
    readFileCounter: 0,
    transformCounter: 0,
    writeFileCounter: 0,
    notUploaded: 0,
  }

  /**
   * 输入文件并转换
   * @param {*} filePath 
   * @returns 
   */
  async function transfer(filePath) {
    let text = fs.readFileSync(filePath, "utf-8")
    report.readFileCounter++;
    const matchResult = getOld(text)
    if (matchResult) {
      for (let i = 0; i < matchResult.length; i++) {
        const old = matchResult[i]
        let newStr = ''
        try {
          newStr = await getNew(old)
        } catch (e) {
          if (e.name == 'GetNewStrError') {
            continue;
            // report.notUploaded++
            // todo,调用report的自定义函数更新report的数据
          } else {
            throw e;
          }
        }
        text = text.replace(old, newStr)
        report.transformCounter++
      }
      fs.writeFileSync(filePath, text)
      report.writeFileCounter++;
    }
    return report
  }
  return transfer
}

// module.exports.a = 1;
/**
 * 判断图片是否存在云端
 * @param {*} requestUrl 
 * @returns 
 */
function isExistRemote(requestUrl) {
  return new Promise((resolve, reject) => {
    // 解析URL
    const uri = new url.URL(requestUrl);

    // HTTPS请求选项
    const options = {
      hostname: uri.hostname,
      path: uri.pathname + uri.search,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      rejectUnauthorized: false
    };

    // 发送HTTPS请求
    const req = https.request(options, res => {
      // 获取响应头中的Content-Type字段
      const contentType = res.headers['content-type'];
      resolve(contentType.includes('image'))
    });

    // 处理请求错误
    req.on('error', error => {
      reject(error)
    });

    // 发送请求
    req.end();
  })

}

module.exports = {
  isExistRemote
}