const ref = require('ref');
const ffi = require('ffi');

const libJava = ffi.Library(__dirname + '/libnativeimpl', {
  graal_create_isolate: [
    ref.types.int, [
      ref.refType(ref.types.void),
      ref.refType(ref.types.void),
      ref.refType(ref.refType(ref.types.void))
    ]],
  graal_tear_down_isolate: [
    ref.types.int, [
      ref.refType(ref.types.void)]
  ],
  Java_org_pkg_apinative_Native_hello: [
    ref.types.CString,
    [ref.refType(ref.types.void)]],
})

exports.handler = (req, res) => {
  const p_graal_isolatethread_t = ref.alloc(ref.refType(ref.types.void))

  const rc = libJava.graal_create_isolate(ref.NULL, ref.NULL, p_graal_isolatethread_t)
  if (rc !== 0) {
    res.send('error on isolate creation or attach')
    return;
  }

  const hello = libJava.Java_org_pkg_apinative_Native_hello(ref.deref(p_graal_isolatethread_t))
  res.send(hello);

  libJava.graal_tear_down_isolate(ref.deref(p_graal_isolatethread_t));
};
