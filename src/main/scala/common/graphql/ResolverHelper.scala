package common.graphql

import akka.actor.{ActorRef, ActorSystem}
import akka.stream.ActorMaterializer
import common.ActorMessageDelivering
import common.actors.Dispatcher
import common.actors.Dispatcher.DispatcherMessage
import core.graphql.UserContext
import core.guice.injection.GuiceActorRefProvider

import scala.concurrent.Future

object ResolverHelper extends ActorMessageDelivering
  with GuiceActorRefProvider {

  def resolveWithDispatcher[T](input: Any,
                               userContext: UserContext,
                               resolverActor: String,
                               onException: Exception => Any,
                               before: List[ActorRef] = Nil,
                               after: List[ActorRef] = Nil)
                              (implicit actorSystem: ActorSystem,
                               materializer: ActorMaterializer): Future[T] = {

    sendMessageWithFunc[T] {
      replyTo =>
        provideActorRef(Dispatcher.name) ! DispatcherMessage(
          input,
          userContext,
          replyTo,
          provideActorRef(resolverActor),
          onException,
          before,
          after
        )
    }
  }
}