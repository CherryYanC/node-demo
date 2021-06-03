const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const port = 3000

// fs.readFile(path.resolve(__dirname, 'test.jpeg'), (err, data) => {
//   console.log('data', data)
// }) 

const server = http.createServer((req, res) => {
  const urlObject = url.parse(req.url)
  const { pathname } = urlObject

  // api开头的请求
  if (pathname.startsWith('/api')) {
    if(pathname === '/api/users') {
      // 获取http动词
      const method = req.method
      if (method === 'GET') {
        const resData = {
          imgUrl: 'localhost:3000/' + path.basename('./test.jpeg'),
          useInfo: [
            {
              id: 1,
              name: '小明',
              age: 18
            },
            {
              id: 2,
              name: '小妞',
              age: 19
            }
          ]
        }
        res.setHeader('Content-type', 'text/plain')
        res.write(JSON.stringify(resData))
        res.end()
      }
    }
  } else {
    const extName = path.extname(pathname)
    if (extName === '.jpeg') {
      fs.readFile(path.resolve(__dirname, path.basename(pathname)), (err, data) => {
        res.setHeader('Content-Type', 'image/jpeg')
        res.write(data)
        res.end()
      }) 
    }
  }
})

server.listen(port, () => {
  console.log('server is starting')
})

server.on('error', error => {
  // console.log(error)
  throw error
})