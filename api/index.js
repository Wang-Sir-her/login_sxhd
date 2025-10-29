const express = require('express');
const cors = require('cors');
const app = express();

// 配置 CORS：允许前端实际域名访问（即 https://login-sx-mkf6.vercel.app）
app.use(cors({
  origin: 'https://login-sx-mkf6.vercel.app', 
  methods: ['POST', 'OPTIONS'],
  credentials: true 
}));

app.use(express.json());

const validUser = { username: 'admin', password: '123456' };

function generateToken() {
  return Math.random().toString(36).substring(2, 15);
}

app.post('/api/login', (req, res) => {
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

// 处理预检请求（OPTIONS 方法）
app.options('/api/login', cors());

// 无需手动监听端口，Vercel 自动处理
module.exports = app;
