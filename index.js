require('dotenv').config();
const express = require('express');
const path = require('path');
const req = require("express/lib/request");

const app = express();
app.use(express.json());
app.use(express.text())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 定义一个简单的路由，返回客户端地址
app.get('/client-address', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log('请求头信息:', req.headers);
    res.send(`${clientIp}`);
});


app.post('/format-json', (req, res) => {
    const receivedJson = req.body;

    // 打印接收到的JSON
    console.log('接收到的JSON:', receivedJson);

    // 返回格式化的JSON
    res.json(receivedJson);
});

app.post('/format-coordinate', (req, res) => {
    // 获取请求体
    const requestBody = req.body;

    console.log(requestBody)
    // 将请求体按行拆分
    const lines = requestBody.split('\r\n');

    // 处理每一行
    const modifiedLines = lines.map(line => {
        if (line.length > 15) {
            return `{${line.slice(15)}},`;
        } else {
            return `{${line}},`;
        }
    });

    console.log(modifiedLines)

    // 合并处理后的行
    const modifiedResponseBody = modifiedLines.join('\n');

    // 返回处理后的响应体
    res.send(modifiedResponseBody);
});

const port = process.env.PORT || 3000;
// 监听端口3000，并启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});