import PubSub from 'pubsub-js'

class ValidationHandler {

  static publishMessages(errors) {
    console.log(errors)
    errors.forEach(error => PubSub.publish('validation-error', error))
  }

}

export default ValidationHandler
