module.exports = function (app) {
    app.get('/', function (req, res, next) {
      console.log("routes/index.js");
        res.render('index');
    });
};
