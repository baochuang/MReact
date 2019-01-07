const {
  Component
} = React;
const {
  render
} = ReactDOM;

class App extends Component {
  render() {
    return React.createElement("div", null, "Hello World");
  }

}

const rootContainer = document.querySelector('#root');
const element = React.createElement(App, null);
render(element, rootContainer);