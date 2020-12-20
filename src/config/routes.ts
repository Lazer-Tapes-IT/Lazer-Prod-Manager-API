export default (app) => {
  app.get('/', (req, res)=>{
    res.send('Welcome toi the root of the API');
  })
}