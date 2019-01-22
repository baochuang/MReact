export default class Transaction {
    constructor() {
        this._isInTransaction = false
        this.getTransactionWrappers = null
    }

    perform(method, a, b, c) {
        let errorThrow
        let result
        try {
            this._isInTransaction = true

            errorThrow = true

            this.initializeAll(0)

            result = method(a, b, c)

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
        const transactionWrappers = this.transactionWrappers

        for (let i = startIndex; i < transactionWrappers.length; i++) {
            const wrapper = transactionWrappers[i]
            const initData = this.wrapperInitData[i]

            let errorThrown

            try {
                errorThrown = true

                if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
                    wrapper.close.call(this, initData)
                }

                errorThrown = false
            } finally {
                if (errorThrown) {
                    try {
                        this.closeAll(i + 1)
                    } catch (e) {

                    }
                }
            }
        }
    }
}

Transaction.OBSERVED_ERROR = {}