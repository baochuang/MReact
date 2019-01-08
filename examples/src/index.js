// const { Component } = React 
const { render } = ReactDOM

class App extends Component {
    render() {
        return <div>Hello World</div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App />

render(element, rootContainer)