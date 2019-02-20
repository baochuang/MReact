# Version 16.8

## Demo One
```
function Example() {
    const [count, setCount] = React.useState(0)

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)} >
                Click me
            </button>
        </div>
    )
}

const rootContainer = document.querySelector('#root')

const element = <Example />

ReactDOM.render(element, rootContainer)
```