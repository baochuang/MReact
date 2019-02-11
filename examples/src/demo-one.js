class App extends React.Component {
    render() {
        return <div>
            <div>
                <h1>Container</h1>
            </div>
            <h5>{this.props.text}</h5>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App text='Hello World' />

ReactDOM.render(element, rootContainer)