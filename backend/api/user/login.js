const express = require("express");
const router = express.Router();

const sleep = require("../../common/sleep");
const res_time = 1000;

const resData = {
  message: "登录成功。",
};

router.post("/", (req, res) => {
  try {
    console.log("user.01.01_login - headers: ", req.headers);
    console.log("user.01.01_login - queries: ", req.query);
    console.log("user.01.01_login - bodys: ", req.body);

    sleep(res_time).then((_) => {
      if (req.body.username == username && req.body.password == password) {
        res.status(200).send(resData);
      } else {
        res.status(401).json({
          message: "账号信息错误，请检查账号密码是否输入正确？",
          status_code: "E01_0002",
          path: `${req.method}:${req.originalUrl}`,
        });
      }
      console.log(`响应时间：${res_time}`);
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
      status_code: error.statusCode,
      path: `${req.method}:${req.originalUrl}`,
    });
  }
});

module.exports = router;

const username = "2NVkAnYLjv6viFr4inIhxA==";
const password = "8f00b204e9800998";
