
const Mixin = {
    reinitializeTransaction: function() {
        this.transactionWrappers = this.getTransactionWrappers();
        if (this.wrapperInitData) {
          this.wrapperInitData.length = 0;
        } else {
          this.wrapperInitData = [];
        }
        this._isInTransaction = false;
    },
    _isInTransaction: false,

    getTransactionWrappers: null,

    isInTransaction: function() {
        return !!this._isInTransaction;
    },

    perform: function(method, scope, a, b, c, d, e, f) {
        let errorThrown
        let ret
        try {
            this._isInTransaction = true

            errorThrown = true

            this.initializeAll(0)

            ret = method.call(scope, a, b, c, d, e, f);

            errorThrown = false
        } finally {
            try {
                if (errorThrown) {
                    try {
                        this.closeAll(0);
                    } catch (err) {

                    }
                } else {
                    this.closeAll(0);
                }
            } finally {
                this._isInTransaction = false;
            }
        }
        return ret
    },
    initializeAll: function(startIndex) {
        const transactionWrappers = this.transactionWrappers

        for (let i = startIndex; i < transactionWrappers.length; i++) {
            const wrapper = transactionWrappers[i]
            try {
                this.wrapperInitData[i] = Transaction.OBSERVED_ERROR
                this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null
            } finally {
                if (this.wrapperInitData[i] === Transaction.OBSERVERD_ERROR) {
                    try {
                        this.initializeAll(i + 1)
                    } catch (err) {

                    }
                }
            }
        }
    },
    closeAll: function(startIndex) {
        const transactionWrappers = this.transactionWrappers
        for (let i = startIndex; i < transactionWrappers.length; i++) {
            const wrapper = transactionWrappers[i]
            const initData = this.wrapperInitData[i]

            let errorThrown

            try {
                errorThrown = true

                if (initData !== Transaction.OBSERVERD_ERROR && wrapper.close) {
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

const Transaction = {
    Mixin,

    OBSERVERD_ERROR: {}
}

export default Transaction