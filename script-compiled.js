"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      running: false
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.setState({
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      });
      clearInterval(this.state.watch);
    }
  }, {
    key: "format",
    value: function format() {
      return pad0(this.state.minutes) + ":" + pad0(this.state.seconds) + ":" + pad0(Math.floor(this.state.miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({
          running: true,
          watch: setInterval(function () {
            return _this2.step();
          }, 10)
        });
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var _state = this.state,
          miliseconds = _state.miliseconds,
          seconds = _state.seconds,
          minutes = _state.minutes;

      miliseconds += 1;
      if (miliseconds >= 100) {
        //Ze względu to, że milisekund w sekundzie jest tysiąc, a nasz interwał wykonuje się co 10ms, należało podzielić 1000 przez 10.
        seconds += 1;
        miliseconds = 0;
      }
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }
      this.setState({
        minutes: minutes,
        seconds: seconds,
        miliseconds: miliseconds
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.state.running) {
        this.setState({
          running: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "nav",
          { className: "controls" },
          React.createElement(
            "a",
            { href: "#", className: "button", id: "start", onClick: this.start.bind(this) },
            "Start"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "stop", onClick: this.stop.bind(this) },
            "Stop"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "reset", onClick: this.reset.bind(this) },
            "Reset"
          )
        ),
        React.createElement("ul", { className: "results" }),
        React.createElement(
          "div",
          { className: "stopwatch" },
          this.format()
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById("app"));
