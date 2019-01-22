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
class Clock extends React.Component {
    constructor(props) {
      super(props)
      this.state = {date: new Date()}
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      )
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID)
    }
  
    tick() {
      this.setState({
        date: new Date()
      })
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)
```
1. State & setState
2. 生命周期
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
2. 样式属性