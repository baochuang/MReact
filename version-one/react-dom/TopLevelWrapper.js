let topLevelRootCounter = 1

const TopLevelWrapper = function() {
    this.rootID = topLevelRootCounter++
}

TopLevelWrapper.prototype.isReactComponent = {}

TopLevelWrapper.prototype.render = function() {
    console.log(this)
    return this.props
}

export default TopLevelWrapper