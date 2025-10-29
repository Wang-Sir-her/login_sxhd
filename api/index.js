const express = require('express');
const cors = require('cors');
const app = express();

// ✅ 动态允许来自前端的跨域请求
const allowedOrigins = [
  'https://login-sx-mkf6.vercel.app', // 你的前端域名
  'http://localhost:3000'             // 可选: 本地调试
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // ✅ 提前响应预检请求
  }
  next();
});

app.use(express.json());

// 模拟的登录用户
const validUser = { username: 'admin', password: '123456' };

// 生成 token
function generateToken() {
  return Math.random().toString(36).substring(2, 15);
}

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ code: 1, message: 'Username and password are required', data: null });
  }

  if (username === validUser.username && password === validUser.password) {
    return res.json({
      code: 0,
      message: 'Login successful',
      data: { token: generateToken() }
    });
  } else {
    return res.json({ code: 1, message: 'Invalid username or password', data: null });
  }
});

module.exports = app;
