import PooledClass from '../../utils/PooledClass'
import Transaction from '../../utils/Transaction'

export default class ReactReconcilerTransaction extends Transaction {
    constructor(useCreateElement) {
        super()
        this.useCreateElement = useCreateElement
    }
}

PooledClass.addPoolingTo(ReactReconcilerTransaction)