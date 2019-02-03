module.exports = {
	index(req, res, next) {
		res.render('static/index', { title: 'Welcome to BlueNote' });
	},

  about(req, res, next) {
    res.render('static/partials/about', { h1: 'About Us' });
  }

};
