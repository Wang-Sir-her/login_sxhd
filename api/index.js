const express = require('express');
const cors = require('cors');
const app = express();

// ✅ 允许前端域名跨域访问（必须与前端部署域名一致）
const allowedOrigin = 'https://login-sx-mkf6.vercel.app';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// ✅ 处理预检请求（OPTIONS）
app.options('*', cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());

// 模拟用户数据库
const validUser = { username: 'admin', password: '123456' };

// 简单 token 生成函数
function generateToken() {
  return Math.random().toString(36).substring(2, 15);
}

app.post('/api/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ code: 1, message: 'Username and password are required', data: null });
  }

  if (username === validUser.username && password === validUser.password) {
    return res.json({ code: 0, message: 'Login successful', data: { token: generateToken() } });
  } else {
    return res.json({ code: 1, message: 'Invalid username or password', data: null });
  }
});

module.exports = app;
