class StatelessComponent {
    constructor(Component) {

    }

    render() {
        var Component = ReactInstanceMap.get(this)._currentElement.type
        var element = Component(this.props, this.context, this.updater)
        return element
    }
}