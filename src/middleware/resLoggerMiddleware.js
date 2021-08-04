const resLoggerMiddleware = async (ctx, next) => {
  console.group('Response data')
  console.log('--------------------------------')
  console.log('             Body               ')
  console.log(ctx.body)
  console.log('--------------------------------')
  console.groupEnd()
  console.groupEnd()

  return next()
}

module.exports = { resLoggerMiddleware }
