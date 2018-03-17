(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var writerUI = function () {
	function writerUI() {
		_classCallCheck(this, writerUI);

		this.save = this.createSaveElem();
		this.dropdown = this.createLanguageDropdown();
		this.reload = this.createReloadElem();
		this.clickPrevention();
	}

	_createClass(writerUI, [{
		key: 'add_options',
		value: function add_options(select_element, options) {
			// More of a utility method, doesn't need to be here to be clear
			/* Add an array of options to a select element */
			for (var option_name in options) {
				var op = new Option();
				op.value = options[option_name];
				op.text = options[option_name];
				select_element.options.add(op);
			}
		}
	}, {
		key: 'clickPrevention',
		value: function clickPrevention() {
			// Prevent all default click actions if the CTRL key is held in the process
			document.addEventListener('click', function (e) {
				if (e.ctrlKey === true) {
					e.preventDefault();
					e.stopPropagation();
					// For whatever reason, content editable is not blocked by these
				}
			}, true);
		}
	}, {
		key: 'createSaveElem',
		value: function createSaveElem() {
			// Creates the save button
			var save_element = document.createElement('a');
			var save_text = document.createTextNode("Save");

			// Attach somewhere
			var body = document.querySelector('body');
			body.appendChild(save_element);

			// Save button style attributes. An additional stylesheet is the way to go here, as it is a dev tool.
			save_element.href = "#Nada";
			save_element.appendChild(save_text);
			save_element.style.position = "fixed";
			save_element.style.top = "20px";
			save_element.style.right = "3%";
			save_element.style.width = "20px";
			save_element.style.height = "20px";
			save_element.style.zindex = "20";
			save_element.style.display = "block";
			return save_element;
		}
	}, {
		key: 'createReloadElem',
		value: function createReloadElem() {
			var reloadElem = document.createElement('a');
			var reloadText = document.createTextNode("Reload");

			var body = document.querySelector('body');
			body.appendChild(reloadElem);
			reloadElem.appendChild(reloadText);

			reloadElem.style.position = "fixed";
			reloadElem.style.top = "90px";
			reloadElem.style.right = "5%";
			reloadElem.style.width = "20px";
			reloadElem.style.height = "20px";
			reloadElem.style.zindex = "20";
			reloadElem.style.display = "block";

			return reloadElem;
		}
	}, {
		key: 'createLanguageDropdown',
		value: function createLanguageDropdown() {
			var language_dropdown = document.createElement('select');
			var body = document.querySelector('body');
			body.appendChild(language_dropdown);

			var options = ['english', 'italian', 'budgie']; // Resolve these from JSON
			this.add_options(language_dropdown, options);
			language_dropdown.style.position = "fixed";
			language_dropdown.style.top = "60px";
			language_dropdown.style.right = "3%";
			language_dropdown.style.width = "auto";
			language_dropdown.style.height = "20px";
			language_dropdown.style.zindex = "20";
			language_dropdown.style.display = "block";
			return language_dropdown;
		}
	}]);

	return writerUI;
}();

exports.default = writerUI;

},{}],2:[function(require,module,exports){
/* Just an example of importing from another module */

'use strict';

var _UI = require('./UI');

var _UI2 = _interopRequireDefault(_UI);

var _writer2 = require('./writer');

var _writer3 = _interopRequireDefault(_writer2);

var _tests = require('./tests');

var _tests2 = _interopRequireDefault(_tests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = true;
var attributeName = "data-text-translate";

function writerInit() {
  // Main function for the writer.
  console.group('JSONwriter');

  //Initiate the UI
  var UI = new _UI2.default(); // Have left the UI separate as it's not optimal
  var _writer = new _writer3.default(UI);

  /*-------------------------------------*/
  // Test

  var _writerTests = new _tests2.default(_writer);
  debug && console.log("Active areas:");
  debug && console.table(_writer.activeAreas);

  debug && console.log("JSON download...", _writer.download());

  console.group('Test');
  console.group('Rechecking of active content areas');
  console.log("Adding " + attributeName + " areas");
  _writerTests.testReload();

  console.groupEnd('Rechecking of active content areas');
  console.groupEnd('Test');

  /*-------------------------------------*/

  console.groupEnd('JSONwriter');
};

writerInit();

},{"./UI":1,"./tests":3,"./writer":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var writerTests = function () {
    function writerTests(writer) {
        _classCallCheck(this, writerTests);

        this.writer = writer;
    }

    _createClass(writerTests, [{
        key: 'makeAllPTagsEditable',
        value: function makeAllPTagsEditable() {
            // Lazy way to prime page for reload test
            // Better to add elements to the page and check they are assigned.
            var ptags = document.querySelectorAll('p');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = ptags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var ptag = _step.value;

                    ptag.setAttribute('contenteditable', true);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            console.log("All p tags on page have contenteditable attribute");
        }
    }, {
        key: 'testReload',
        value: function testReload() {
            console.log("Testing reload functionality");
            this.makeAllPTagsEditable();
            this.writer.reload();
        }
    }]);

    return writerTests;
}();

exports.default = writerTests;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var writer = function () {
    function writer(UI) {
        _classCallCheck(this, writer);

        this.activeAreas = this.assignContentAreas();
        this.UI = UI;
        this.JSON = {};
        this.attributeName = "data-text-translate";
        this.contentSelector = '*' + '[' + this.attributeName + ']';
        this.downloadFileName = "config_test.json";
    }

    _createClass(writer, [{
        key: 'assignContentAreas',
        value: function assignContentAreas() {
            // Apply "contenteditable" to areas and return
            var activeAreas = document.querySelectorAll(this.contentSelector);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = activeAreas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var editable = _step.value;

                    editable.style.border = "red";
                    editable.setAttribute('contenteditable', true);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return activeAreas;
        }
    }, {
        key: 'reload',
        value: function reload() {
            // Dynamically loaded content may require special conditions
            this.activeAreas = this.assignContentAreas();
        }
    }, {
        key: 'update',
        value: function update() {
            // Internal method to populate the JSON
            var textAreas = document.querySelectorAll(this.contentSelector);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = textAreas[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var text = _step2.value;

                    var innerText = text.innerHTML;
                    var id = text.getAttribute(attributeName);
                    this.JSON[id] = innerText;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'download',
        value: function download() {
            // Download and assign updated JSON to the save button
            this.update();
            var text = JSON.stringify(this.JSON);
            var file = new Blob([text], { type: 'text/json' });

            this.UI.save.href = URL.createObjectURL(file); // Code quality: This involves too much coupling with the UI.
            this.UI.save.download = this.downloadFileName;

            return this.JSON;
        }
    }]);

    return writer;
}();

exports.default = writer;

},{}],5:[function(require,module,exports){
'use strict';

var _main = require('./JSONwriter/main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("Yes");

(0, _main2.default)();

},{"./JSONwriter/main.js":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9KU09Od3JpdGVyL1VJLmpzIiwic3JjL3NjcmlwdHMvSlNPTndyaXRlci9tYWluLmpzIiwic3JjL3NjcmlwdHMvSlNPTndyaXRlci90ZXN0cy5qcyIsInNyYy9zY3JpcHRzL0pTT053cml0ZXIvd3JpdGVyLmpzIiwic3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7Ozs7O0lBRXFCLFE7QUFDcEIscUJBQWM7QUFBQTs7QUFDYixPQUFLLElBQUwsR0FBWSxLQUFLLGNBQUwsRUFBWjtBQUNBLE9BQUssUUFBTCxHQUFnQixLQUFLLHNCQUFMLEVBQWhCO0FBQ0EsT0FBSyxNQUFMLEdBQWMsS0FBSyxnQkFBTCxFQUFkO0FBQ0EsT0FBSyxlQUFMO0FBQ0E7Ozs7OEJBRVcsYyxFQUFnQixPLEVBQVM7QUFBRTtBQUN0QztBQUNBLFFBQU0sSUFBSSxXQUFWLElBQXlCLE9BQXpCLEVBQWtDO0FBQ2pDLFFBQUksS0FBSyxJQUFJLE1BQUosRUFBVDtBQUNBLE9BQUcsS0FBSCxHQUFXLFFBQVEsV0FBUixDQUFYO0FBQ0EsT0FBRyxJQUFILEdBQVUsUUFBUSxXQUFSLENBQVY7QUFDQSxtQkFBZSxPQUFmLENBQXVCLEdBQXZCLENBQTJCLEVBQTNCO0FBQ0E7QUFDRDs7O29DQUVpQjtBQUNqQjtBQUNBLFlBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBQyxDQUFELEVBQU87QUFDekMsUUFBSSxFQUFFLE9BQUYsS0FBYyxJQUFsQixFQUF3QjtBQUN2QixPQUFFLGNBQUY7QUFDQSxPQUFFLGVBQUY7QUFDQTtBQUNBO0FBQ0QsSUFORCxFQU1HLElBTkg7QUFPQzs7O21DQUVlO0FBQ2hCO0FBQ0EsT0FBSSxlQUFlLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFuQjtBQUNBLE9BQUksWUFBWSxTQUFTLGNBQVQsQ0FBd0IsTUFB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SUFBSSxJQUFKLENBQVMsQ0FBQyxJQUFELENBQVQsRUFBaUIsRUFBQyxNQUFNLFdBQVAsRUFBakIsQ0FBWDs7QUFFQSxpQkFBSyxFQUFMLENBQVEsSUFBUixDQUFhLElBQWIsR0FBb0IsSUFBSSxlQUFKLENBQW9CLElBQXBCLENBQXBCLENBTk8sQ0FNeUM7QUFDaEQsaUJBQUssRUFBTCxDQUFRLElBQVIsQ0FBYSxRQUFiLEdBQXdCLEtBQUssZ0JBQTdCOztBQUVBLG1CQUFPLEtBQUssSUFBWjtBQUNIOzs7Ozs7a0JBN0NnQixNOzs7QUNIckI7O0FBRUE7Ozs7OztBQUtBLFFBQVEsR0FBUixDQUFZLEtBQVo7O0FBRUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHdyaXRlclVJIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuc2F2ZSA9IHRoaXMuY3JlYXRlU2F2ZUVsZW0oKTtcclxuXHRcdHRoaXMuZHJvcGRvd24gPSB0aGlzLmNyZWF0ZUxhbmd1YWdlRHJvcGRvd24oKTtcclxuXHRcdHRoaXMucmVsb2FkID0gdGhpcy5jcmVhdGVSZWxvYWRFbGVtKCk7XHJcblx0XHR0aGlzLmNsaWNrUHJldmVudGlvbigpO1xyXG5cdH1cclxuXHJcblx0YWRkX29wdGlvbnMoc2VsZWN0X2VsZW1lbnQsIG9wdGlvbnMpIHsgLy8gTW9yZSBvZiBhIHV0aWxpdHkgbWV0aG9kLCBkb2Vzbid0IG5lZWQgdG8gYmUgaGVyZSB0byBiZSBjbGVhclxyXG5cdFx0LyogQWRkIGFuIGFycmF5IG9mIG9wdGlvbnMgdG8gYSBzZWxlY3QgZWxlbWVudCAqL1xyXG5cdFx0Zm9yICggdmFyIG9wdGlvbl9uYW1lIGluIG9wdGlvbnMgKXtcclxuXHRcdFx0dmFyIG9wID0gbmV3IE9wdGlvbigpO1xyXG5cdFx0XHRvcC52YWx1ZSA9IG9wdGlvbnNbb3B0aW9uX25hbWVdO1xyXG5cdFx0XHRvcC50ZXh0ID0gb3B0aW9uc1tvcHRpb25fbmFtZV07XHJcblx0XHRcdHNlbGVjdF9lbGVtZW50Lm9wdGlvbnMuYWRkKG9wKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsaWNrUHJldmVudGlvbigpIHtcclxuXHRcdC8vIFByZXZlbnQgYWxsIGRlZmF1bHQgY2xpY2sgYWN0aW9ucyBpZiB0aGUgQ1RSTCBrZXkgaXMgaGVsZCBpbiB0aGUgcHJvY2Vzc1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cdFx0XHRpZiAoZS5jdHJsS2V5ID09PSB0cnVlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0Ly8gRm9yIHdoYXRldmVyIHJlYXNvbiwgY29udGVudCBlZGl0YWJsZSBpcyBub3QgYmxvY2tlZCBieSB0aGVzZVxyXG5cdFx0XHR9XHJcblx0XHR9LCB0cnVlKTtcclxuXHRcdH1cclxuXHJcblx0Y3JlYXRlU2F2ZUVsZW0oKSB7XHJcblx0XHQvLyBDcmVhdGVzIHRoZSBzYXZlIGJ1dHRvblxyXG5cdFx0dmFyIHNhdmVfZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHZhciBzYXZlX3RleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlNhdmVcIik7XHJcblxyXG5cdFx0Ly8gQXR0YWNoIHNvbWV3aGVyZVxyXG5cdFx0dmFyIGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblx0XHRib2R5LmFwcGVuZENoaWxkKHNhdmVfZWxlbWVudCk7XHJcblxyXG5cdFx0Ly8gU2F2ZSBidXR0b24gc3R5bGUgYXR0cmlidXRlcy4gQW4gYWRkaXRpb25hbCBzdHlsZXNoZWV0IGlzIHRoZSB3YXkgdG8gZ28gaGVyZSwgYXMgaXQgaXMgYSBkZXYgdG9vbC5cclxuXHRcdHNhdmVfZWxlbWVudC5ocmVmID0gXCIjTmFkYVwiO1xyXG5cdFx0c2F2ZV9lbGVtZW50LmFwcGVuZENoaWxkKHNhdmVfdGV4dCk7XHJcblx0XHRzYXZlX2VsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcblx0XHRzYXZlX2VsZW1lbnQuc3R5bGUudG9wID0gXCIyMHB4XCI7XHJcblx0XHRzYXZlX2VsZW1lbnQuc3R5bGUucmlnaHQgPSBcIjMlXCI7XHJcblx0XHRzYXZlX2VsZW1lbnQuc3R5bGUud2lkdGggPSBcIjIwcHhcIjtcclxuXHRcdHNhdmVfZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjIwcHhcIjtcclxuXHRcdHNhdmVfZWxlbWVudC5zdHlsZS56aW5kZXggPSBcIjIwXCI7XHJcblx0XHRzYXZlX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHRcdHJldHVybiBzYXZlX2VsZW1lbnQ7XHJcblx0fSBcclxuXHJcblx0Y3JlYXRlUmVsb2FkRWxlbSgpIHtcclxuXHRcdHZhciByZWxvYWRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0dmFyIHJlbG9hZFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlJlbG9hZFwiKTtcclxuXHJcblx0XHR2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHRcdGJvZHkuYXBwZW5kQ2hpbGQocmVsb2FkRWxlbSk7XHJcblx0XHRyZWxvYWRFbGVtLmFwcGVuZENoaWxkKHJlbG9hZFRleHQpO1xyXG5cclxuXHJcblx0XHRyZWxvYWRFbGVtLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG5cdFx0cmVsb2FkRWxlbS5zdHlsZS50b3AgPSBcIjkwcHhcIjtcclxuXHRcdHJlbG9hZEVsZW0uc3R5bGUucmlnaHQgPSBcIjUlXCI7XHJcblx0XHRyZWxvYWRFbGVtLnN0eWxlLndpZHRoID0gXCIyMHB4XCI7XHJcblx0XHRyZWxvYWRFbGVtLnN0eWxlLmhlaWdodCA9IFwiMjBweFwiO1xyXG5cdFx0cmVsb2FkRWxlbS5zdHlsZS56aW5kZXggPSBcIjIwXCI7XHJcblx0XHRyZWxvYWRFbGVtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblxyXG5cdFx0cmV0dXJuIHJlbG9hZEVsZW07XHJcblx0fVxyXG5cclxuXHRjcmVhdGVMYW5ndWFnZURyb3Bkb3duKCkge1xyXG5cdFx0dmFyIGxhbmd1YWdlX2Ryb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcblx0XHR2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHRcdGJvZHkuYXBwZW5kQ2hpbGQobGFuZ3VhZ2VfZHJvcGRvd24pO1xyXG5cclxuXHRcdHZhciBvcHRpb25zID0gWydlbmdsaXNoJywgJ2l0YWxpYW4nLCAnYnVkZ2llJ107IC8vIFJlc29sdmUgdGhlc2UgZnJvbSBKU09OXHJcblx0XHR0aGlzLmFkZF9vcHRpb25zKGxhbmd1YWdlX2Ryb3Bkb3duLCBvcHRpb25zKTtcclxuXHRcdGxhbmd1YWdlX2Ryb3Bkb3duLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG5cdFx0bGFuZ3VhZ2VfZHJvcGRvd24uc3R5bGUudG9wID0gXCI2MHB4XCI7XHJcblx0XHRsYW5ndWFnZV9kcm9wZG93bi5zdHlsZS5yaWdodCA9IFwiMyVcIjtcclxuXHRcdGxhbmd1YWdlX2Ryb3Bkb3duLnN0eWxlLndpZHRoID0gXCJhdXRvXCI7XHJcblx0XHRsYW5ndWFnZV9kcm9wZG93bi5zdHlsZS5oZWlnaHQgPSBcIjIwcHhcIjtcclxuXHRcdGxhbmd1YWdlX2Ryb3Bkb3duLnN0eWxlLnppbmRleCA9IFwiMjBcIjtcclxuXHRcdGxhbmd1YWdlX2Ryb3Bkb3duLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblx0XHRyZXR1cm4gbGFuZ3VhZ2VfZHJvcGRvd247XHJcblx0fVxyXG59IiwiLyogSnVzdCBhbiBleGFtcGxlIG9mIGltcG9ydGluZyBmcm9tIGFub3RoZXIgbW9kdWxlICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHdyaXRlclVJIGZyb20gJy4vVUknO1xuaW1wb3J0IHdyaXRlciBmcm9tICcuL3dyaXRlcic7XG5pbXBvcnQgd3JpdGVyVGVzdHMgZnJvbSAnLi90ZXN0cyc7XG5cbnZhciBkZWJ1ZyA9IHRydWU7XG52YXIgYXR0cmlidXRlTmFtZSA9IFwiZGF0YS10ZXh0LXRyYW5zbGF0ZVwiO1xuXG5cbmZ1bmN0aW9uIHdyaXRlckluaXQgKCkge1xuICAvLyBNYWluIGZ1bmN0aW9uIGZvciB0aGUgd3JpdGVyLlxuICAgIGNvbnNvbGUuZ3JvdXAoJ0pTT053cml0ZXInKTtcbiAgICBcbiAgICAvL0luaXRpYXRlIHRoZSBVSVxuICAgIHZhciBVSSA9IG5ldyB3cml0ZXJVSSgpOyAvLyBIYXZlIGxlZnQgdGhlIFVJIHNlcGFyYXRlIGFzIGl0J3Mgbm90IG9wdGltYWxcbiAgICB2YXIgX3dyaXRlciA9IG5ldyB3cml0ZXIoVUkpO1xuXG4gICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiAgICAvLyBUZXN0XG5cbiAgICB2YXIgX3dyaXRlclRlc3RzID0gbmV3IHdyaXRlclRlc3RzKF93cml0ZXIpO1xuICAgIGRlYnVnICYmIGNvbnNvbGUubG9nKFwiQWN0aXZlIGFyZWFzOlwiKTtcbiAgICBkZWJ1ZyAmJiBjb25zb2xlLnRhYmxlKF93cml0ZXIuYWN0aXZlQXJlYXMpXG5cblxuICAgIGRlYnVnICYmIGNvbnNvbGUubG9nKFwiSlNPTiBkb3dubG9hZC4uLlwiICwgX3dyaXRlci5kb3dubG9hZCgpKTtcblxuXG4gICAgY29uc29sZS5ncm91cCgnVGVzdCcpO1xuICAgIGNvbnNvbGUuZ3JvdXAoJ1JlY2hlY2tpbmcgb2YgYWN0aXZlIGNvbnRlbnQgYXJlYXMnKTtcbiAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBcIiArIGF0dHJpYnV0ZU5hbWUgKyBcIiBhcmVhc1wiKTtcbiAgICBfd3JpdGVyVGVzdHMudGVzdFJlbG9hZCgpO1xuXG4gICAgY29uc29sZS5ncm91cEVuZCgnUmVjaGVja2luZyBvZiBhY3RpdmUgY29udGVudCBhcmVhcycpO1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoJ1Rlc3QnKTtcblxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICBjb25zb2xlLmdyb3VwRW5kKCdKU09Od3JpdGVyJyk7XG59O1xuXG5cbndyaXRlckluaXQoKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB3cml0ZXJUZXN0cyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih3cml0ZXIpIHtcclxuICAgICAgICB0aGlzLndyaXRlciA9IHdyaXRlcjtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlQWxsUFRhZ3NFZGl0YWJsZSgpIHtcclxuICAgICAgICAvLyBMYXp5IHdheSB0byBwcmltZSBwYWdlIGZvciByZWxvYWQgdGVzdFxyXG4gICAgICAgIC8vIEJldHRlciB0byBhZGQgZWxlbWVudHMgdG8gdGhlIHBhZ2UgYW5kIGNoZWNrIHRoZXkgYXJlIGFzc2lnbmVkLlxyXG4gICAgICAgIHZhciBwdGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3AnKTtcclxuICAgICAgICBmb3IgKGxldCBwdGFnIG9mIHB0YWdzKSB7XHJcbiAgICAgICAgICAgIHB0YWcuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGwgcCB0YWdzIG9uIHBhZ2UgaGF2ZSBjb250ZW50ZWRpdGFibGUgYXR0cmlidXRlXCIpXHJcbiAgICB9XHJcblxyXG4gICAgdGVzdFJlbG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRlc3RpbmcgcmVsb2FkIGZ1bmN0aW9uYWxpdHlcIik7XHJcbiAgICAgICAgdGhpcy5tYWtlQWxsUFRhZ3NFZGl0YWJsZSgpO1xyXG4gICAgICAgIHRoaXMud3JpdGVyLnJlbG9hZCgpO1xyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHdyaXRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihVSSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQXJlYXMgPSB0aGlzLmFzc2lnbkNvbnRlbnRBcmVhcygpO1xyXG4gICAgICAgIHRoaXMuVUkgPSBVSTtcclxuICAgICAgICB0aGlzLkpTT04gPSB7fTtcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZU5hbWUgPSBcImRhdGEtdGV4dC10cmFuc2xhdGVcIjtcclxuICAgICAgICB0aGlzLmNvbnRlbnRTZWxlY3RvciA9ICcqJyArICdbJyArIHRoaXMuYXR0cmlidXRlTmFtZSArICddJztcclxuICAgICAgICB0aGlzLmRvd25sb2FkRmlsZU5hbWUgPSBcImNvbmZpZ190ZXN0Lmpzb25cIjtcclxuICAgIH1cclxuXHJcbiAgICBhc3NpZ25Db250ZW50QXJlYXMoKSB7XHJcbiAgICAgICAgLy8gQXBwbHkgXCJjb250ZW50ZWRpdGFibGVcIiB0byBhcmVhcyBhbmQgcmV0dXJuXHJcbiAgICAgICAgdmFyIGFjdGl2ZUFyZWFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNvbnRlbnRTZWxlY3Rvcik7XHJcbiAgICAgICAgZm9yIChsZXQgZWRpdGFibGUgb2YgYWN0aXZlQXJlYXMpIHtcclxuICAgICAgICAgICAgZWRpdGFibGUuc3R5bGUuYm9yZGVyID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgZWRpdGFibGUuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUFyZWFzO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZCgpIHtcclxuICAgICAgICAvLyBEeW5hbWljYWxseSBsb2FkZWQgY29udGVudCBtYXkgcmVxdWlyZSBzcGVjaWFsIGNvbmRpdGlvbnNcclxuICAgICAgICB0aGlzLmFjdGl2ZUFyZWFzID0gdGhpcy5hc3NpZ25Db250ZW50QXJlYXMoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgLy8gSW50ZXJuYWwgbWV0aG9kIHRvIHBvcHVsYXRlIHRoZSBKU09OXHJcbiAgICAgICAgdmFyIHRleHRBcmVhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jb250ZW50U2VsZWN0b3IpO1xyXG4gICAgICAgIGZvciAoIGxldCB0ZXh0IG9mIHRleHRBcmVhcyApIHtcclxuICAgICAgICAgICAgdmFyIGlubmVyVGV4dCA9IHRleHQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSB0ZXh0LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5KU09OW2lkXSA9IGlubmVyVGV4dDsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvd25sb2FkKCkge1xyXG4gICAgICAgIC8vIERvd25sb2FkIGFuZCBhc3NpZ24gdXBkYXRlZCBKU09OIHRvIHRoZSBzYXZlIGJ1dHRvblxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgdmFyIHRleHQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLkpTT04pO1xyXG4gICAgICAgIHZhciBmaWxlID0gbmV3IEJsb2IoW3RleHRdLCB7dHlwZTogJ3RleHQvanNvbid9KTtcclxuXHJcbiAgICAgICAgdGhpcy5VSS5zYXZlLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpOyAgLy8gQ29kZSBxdWFsaXR5OiBUaGlzIGludm9sdmVzIHRvbyBtdWNoIGNvdXBsaW5nIHdpdGggdGhlIFVJLlxyXG4gICAgICAgIHRoaXMuVUkuc2F2ZS5kb3dubG9hZCA9IHRoaXMuZG93bmxvYWRGaWxlTmFtZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuSlNPTjtcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHdyaXRlckluaXQgZnJvbSAnLi9KU09Od3JpdGVyL21haW4uanMnO1xuXG5cblxuXG5jb25zb2xlLmxvZyhcIlllc1wiKTtcblxud3JpdGVySW5pdCgpOyJdfQ==
