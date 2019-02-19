import ReactDOMEmptyComponent from '../react-dom/ReactDOMEmptyComponent'

const ReactEmptyComponent = {
    create: function(instantiate) {
        return new ReactDOMEmptyComponent(instantiate)
    }
}

export default ReactEmptyComponent