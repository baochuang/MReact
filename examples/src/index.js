const { Component } = React 
const { render } = ReactDOM

class App extends Component {
    render() {
        return <div>Hello World</div>
    }
}

const rootElement = document.querySelector('#root')

render(<App />, rootElement)