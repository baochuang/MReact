
class App extends React.Component {
    render() {
        return <div>
            <h5>Hello World</h5>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App />

ReactDOM.render(element, rootContainer)