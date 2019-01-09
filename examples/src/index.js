
class App extends React.Component {
    render() {
        return <div>Hello World</div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App />

ReactDOM.render(element, rootContainer)