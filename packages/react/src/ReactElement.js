const ReactElement = function(type, key, ref, props) {
    const element = {
        type: type,
        key: key,
        ref: ref,
        props: props,
    }

    return element
}

export function createElement(type, config, children) {

    const props = {}

    let key = null
    let ref = null

    if (config) {
        if (config.ref) {
            ref = config.ref
        }
        if (config.key) {
            key = ` ${config.key}`
        }

        for ( prop in config ) {
            if (prop !== 'key' && prop !== 'ref') {
                props[prop] = config[prop]
            }
        }
    }

    return ReactElement(
        type,
        key,
        ref,
        props,
    )
}