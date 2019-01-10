class App extends React.Component {
  render() {
    return React.createElement("div", null, React.createElement("h5", null, "Hello World"));
  }

}

const rootContainer = document.querySelector('#root');
const element = React.createElement(App, null);
ReactDOM.render(element, rootContainer);