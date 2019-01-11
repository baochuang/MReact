
class App extends React.Component {
    componentDidMount() {
        console.log(this.refs.container)
    }
    render() {
        const { text } = this.props
        return <div>
            <div ref='container'>
                <h1>Container</h1>
            </div>
            <h5>{text}</h5>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App text='Hello World' />

ReactDOM.render(element, rootContainer)