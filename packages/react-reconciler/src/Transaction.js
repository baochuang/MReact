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
    }
}