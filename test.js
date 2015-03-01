var pragmaToAnn = require('./');
var Annotation = require('traceur-annotations');
var expect = require('expect.js');

describe('Pragma to annotations', function() {
	it('should return the original function', function() {
		function fn() {}
		expect(pragmaToAnn(fn)).to.be(fn);
	});

	it('shouldn\'t annotate with no pragma', function() {
		expect(pragmaToAnn(function() {}).annotations).to.be.empty();
	});

	describe('attaching annotations', function() {
		it('should attach by name', function() {
			function fn() {
				/* @foo */
			}

			var foo = Annotation.extend();
			pragmaToAnn(fn, {foo: foo});

			expect(fn.annotations[0]).to.be.a(foo);
		});

		it('should add multiple annotations', function() {
			function fn() {
				/* @foo @bar @baz */
			}

			var foo = Annotation.extend();
			var bar = Annotation.extend();
			var baz = Annotation.extend();
			pragmaToAnn(fn, {foo: foo, bar: bar, baz: baz});

			expect(fn.annotations[0]).to.be.a(foo);
			expect(fn.annotations[1]).to.be.a(bar);
			expect(fn.annotations[2]).to.be.a(baz);
		});

		it('should pass pragma args', function(done) {
			function fn() {
				/* @foo('bar') */
			}

			var foo = Annotation.extend({
				init: function(bar) {
					expect(bar).to.be('bar');
					done();
				}
			});
			pragmaToAnn(fn, {foo: foo});
		});

		it('should ignore annotations not in the map', function() {
			function fn() {
				/* @foo */
			}

			pragmaToAnn(fn, {});

			expect(fn.annotations).to.be.empty();
		});
	});
});