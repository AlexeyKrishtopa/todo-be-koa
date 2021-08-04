const reqLoggerMiddleware = async (ctx, next) => {
  console.group('Request data')
  console.log('--------------------------------')
  console.log('             Request url        ')
  console.log(ctx.url)
  console.log('--------------------------------')
  console.log('             Headers             ')
  console.log(ctx.headers)
  console.log('--------------------------------')
  console.log('             Body               ')
  console.log(ctx.request.body)
  console.log('--------------------------------')
  console.groupEnd()
  console.groupEnd()

  return next()
}

module.exports = { reqLoggerMiddleware }
