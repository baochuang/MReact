class Transaction {
    constructor() {
        this._isInTransaction = false
        this.getTransactionWrappers = null
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

    perform(method, a, b, c, d) {
        let errorThrow
        let ret
        try {
            this._isInTransaction = true
            errorThrow = true

            //
            this.initializeAll(0)

            ret = method(a, b, c, d)

            errorThrow = false
        } finally {
            try {
                if (errorThrow) {
                    try {
                        this.closeAll(0)
                    } catch (err) {

                    }
                } else {
                    this.closeAll(0)
                }
            } finally {
                this._isInTransaction = false
            }
        }
        return ret
    }

    initializeAll(startIndex) {
        const transactionWrappers = this.transactionWrappers

        for (let i = startIndex; i < transactionWrappers.length; i++) {
            const wrapper = transactionWrappers[i]

            try {
                this.wrapperInitData[i] = Transaction.OBSERVED_ERROR
                this.wrapperInitData[i] = wrapper.initialize ?
                    wrapper.initialize.call(this) :
                    null
            } finally {
                if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
                    try {
                        this.initializeAll(i + 1)
                    } catch (err) {
                    }
                }
            }

        }
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

        this.wrapperInitData.length = 0
    }
}

Transaction.OBSERVED_ERROR = {}

export default Transaction