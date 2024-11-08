const sleep = (msec) => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, msec);
  });
};

module.exports = sleep;
