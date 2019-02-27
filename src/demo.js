function Example() {
    const [count, setCount] = React.useState(0)
    const newValue = count + 1
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(newValue)} >
                Click me
            </button>
        </div>
    )
}

const rootContainer = document.querySelector('#root')

const element = <Example />

ReactDOM.render(element, rootContainer)