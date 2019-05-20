module.exports = async () => {
  await global.httpServer.close()
  console.log('Test server closed down')
}
