function Example() {
  const [count, setCount] = React.useState(0);
  return React.createElement("div", null, React.createElement("p", null, "You clicked ", count, " times"), React.createElement("button", {
    onClick: () => setCount(count + 1)
  }, "Click me"));
}

const rootContainer = document.querySelector('#root');
const element = React.createElement(Example, null);
ReactDOM.render(element, rootContainer);