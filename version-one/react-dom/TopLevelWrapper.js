let topLevelRootCounter = 1

const TopLevelWrapper = function() {
    this.rootID = topLevelRootCounter++
}

TopLevelWrapper.prototype.isReactComponent = {}

TopLevelWrapper.prototype.render = function() {
    return this.props
}

export default TopLevelWrapper