const express = require("express");
const cors = require("cors");
const app = express();
const port = 5200;

const user_register = require("./api/user/register");
const user_login = require("./api/user/login");
const user_getMusicList = require("./api/user/getMusicList");

// 用于获取req.body的处理
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    // 仅允许来自 http://172.29.12.113:5173 的请求
    // origin: "http://172.29.12.113:5173",
    origin: "*",
    // 允许发送凭证
    credentials: true,
    // 设置200为响应成功的状态码
    optionsSuccessStatus: 200,
  }),
);

app.use("/api/user/register", user_register);
app.use("/api/user/login", user_login);
app.use("/api/user/getMusicList", user_getMusicList);

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
