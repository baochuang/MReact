const oneArgumentPooler = function(copyFieldsFrom) {
    const Klass = this;
    if (Klass.instancePool.length) {
      const instance = Klass.instancePool.pop()
      Klass.call(instance, copyFieldsFrom);
      return instance
    } else {
      return new Klass(copyFieldsFrom);
    }
}

const DEFAULT_POOLER = oneArgumentPooler

const addPoolingTo = function(CopyConstructor, pooler) {
    const NewKlass = CopyConstructor
    NewKlass.instancePool = []
    NewKlass.getPooled = pooler || DEFAULT_POOLER
}

const PooledClass = {
    addPoolingTo
}
  
export default PooledClass