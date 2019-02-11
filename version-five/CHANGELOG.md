# React事件

## 2019年2月12号
示例
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
```

## Ref

## className