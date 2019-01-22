export default class Transaction {
    constructor() {
        this._isInTransaction = false
        this.getTransactionWrappers = null
    }

    perform(method, a, b) {
        let errorThrow
        let result
        try {
            this._isInTransaction = true

            errorThrow = true

            this.initializeAll(0)

            result = method(a, b)

            errorThrow = false
        } finally {
            try {
                this.closeAll(0)
            } finally {
                this._isInTransaction = false
            }
        }
        return result
    }

    reinitializeTransaction() {
        this.transactionWrappers = this.getTransactionWrappers()

        if (this.wrapperInitData) {
            this.wrapperInitData.length = 0
        } else {
            this.wrapperInitData = []
        }
        this._isInTransaction = false
    }

    initializeAll(startIndex) {

    }

    closeAll(startIndex) {
        
    }
}