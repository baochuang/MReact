
class App extends React.Component {
    render() {
        const { text } = this.props
        return <div>
            <h1>{text}</h1>
            <h5>{text}</h5>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App text='Hello World' />

ReactDOM.render(element, rootContainer)