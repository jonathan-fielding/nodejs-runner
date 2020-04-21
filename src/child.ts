process.on('message', function (code) {
  eval(code);
  process.exit();
});
