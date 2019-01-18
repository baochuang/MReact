class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
        this.add = this.add.bind(this)
    }

    add() {
        this.setState({
            count: ++this.state.count
        })
    }
    
    render() {
        return <div>
            <button onClick={this.add}></button>
            <div>
                <h1>{this.state.count}</h1>
            </div>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App />

ReactDOM.render(element, rootContainer)