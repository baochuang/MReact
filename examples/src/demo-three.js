class App extends React.Component {
    render() {
        return <div>
            <button onClick={() => { console.log('click event')}}>Console</button>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App />

ReactDOM.render(element, rootContainer)