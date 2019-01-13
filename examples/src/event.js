class App extends React.Component {
    render() {
        const { text } = this.props
        return <div>
            <button OnClick={() => { console.log('click event')}}>{text}</button>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App />

ReactDOM.render(element, rootContainer)