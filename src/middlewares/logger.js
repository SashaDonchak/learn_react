export default state => next => action => {
    console.log('---', 'dispatching', action)
    next(action)
}