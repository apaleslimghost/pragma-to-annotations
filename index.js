var pragma = require('fn-pragma');

function pragmaToAnn(fn, annotations) {
	pragma(fn).forEach(function(p) {
		if(annotations[p.name]) {
			annotations[p.name].apply(fn, p.args.concat(fn));
		}
	});

	return fn;
}

module.exports = pragmaToAnn;