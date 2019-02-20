# React V15 源码解析

## Demo One
```
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
```
1. React.Component和JSX
2. ReactDOM.render
3. Props状态绑定
4. 组件渲染(含Virtual DOM)
## Demo Two
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
## Demo Three
```
class TodoForm extends React.Component {
    constructor(props) {
      super(props)
    }
  
    componentDidMount() {
      this.refs.itemName.focus()
    }
  
    onSubmit(event) {
      event.preventDefault()
      var newItemValue = this.refs.itemName.value
      
      if(newItemValue) {
        this.props.addItem({newItemValue})
        this.refs.form.reset()
      }
    }
    
    render () {
      return (
        <form ref="form" onSubmit={() => this.onSubmit()} className="form-inline">
          <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
          <button type="submit" className="btn btn-default">Add</button> 
        </form>
      )  
    }
}

const rootContainer = document.querySelector('#root')

const element = <TodoForm />

ReactDOM.render(element, rootContainer)
```
1. ref属性
2. 事件系统
3. 样式属性