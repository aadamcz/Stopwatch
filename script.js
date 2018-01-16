class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      running: false
    }
  }

  reset() {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
  }

  format() {
    return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.step(), 10)
      });
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    let {miliseconds, seconds, minutes} = this.state;
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
      minutes,
      seconds,
      miliseconds
    });
  }

	stop() {
    if (this.state.running) {
      this.setState({
        running: false
      });
    	clearInterval(this.state.watch);
    } else {
      this.reset();
    }
  }

  render() {
  	return (
      <div className="container">
        <nav className="controls">
          <a href="#" className="button" id="start" onClick={this.start.bind(this)}>Start</a>
          <a href="#" className="button" id="stop" onClick={this.stop.bind(this)}>Stop</a>
        </nav>
        <div className="stopwatch">{this.format()}</div>
        <ul className="results"></ul>
      </div>
    );
  }

}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result; 
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));
