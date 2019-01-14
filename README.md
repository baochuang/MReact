# React V15 源码解析

## Version One
Demo
```
class App extends React.Component {
    render() {
        const { text } = this.props
        return <div>
            <div>
                <h1>Container</h1>
            </div>
            <h5>{text}</h5>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App text='Hello World' />

ReactDOM.render(element, rootContainer)
```
1. React.Component和JSX
2. ReactDOM.render
3. Props状态绑定
4. 组件渲染(含Virtual DOM)
## Version Two
```
class Home extends React.Component {
    render() {
        return <div>Home</div>
    }
}

class App extends React.Component {
    componentDidMount() {
        console.log(this.refs.container)
        console.log(this.refs.home)
    }
    render() {
        const { text } = this.props
        return <div>
            <div ref='container'>
                <h1>Container</h1>
            </div>
            <Home ref='home' />
            <h5>{text}</h5>
        </div>
    }
}

const rootContainer = document.querySelector('#root')

const element = <App text='Hello World' />

ReactDOM.render(element, rootContainer)
```
1. refs属性值绑定
2. 生命周期钩子函数绑定调用(基于Transaction)
## Version Three
```
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
```
1. 事件系统