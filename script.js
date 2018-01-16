class Stopwatch extends React.Component {
  constructor(props) {
    super(props); // o co chodzi? Jak to tutaj dalej zastosować? super(?).
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      //Ze względu to, że milisekund w sekundzie jest tysiąc, a nasz interwał wykonuje się co 10ms, należało podzielić 1000 przez 10.
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  	stop() {
    	this.running = false;
    	clearInterval(this.watch);
  }

  render() {
  	//patrz index.html
  }

}

const stopwatch = new Stopwatch(document.querySelector(".stopwatch")); //Jak toto?


//toto na zewnątrz??
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result; 
}

/* A to to?
const startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());

/*Do zadania:
var app = React.createElement(App);
ReactDOM.render(app, document.getElementById('app'));
*/