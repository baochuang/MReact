const DEFAULT_POOL_SIZE = 10

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
    if (!NewKlass.poolSize) {
      NewKlass.poolSize = DEFAULT_POOL_SIZE
    }
    NewKlass.release = standardReleaser
}

const standardReleaser = function(instance) {
  const Klass = this
  instance.destructor()
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance)
  }
}

const PooledClass = {
  addPoolingTo
}

export default PooledClass