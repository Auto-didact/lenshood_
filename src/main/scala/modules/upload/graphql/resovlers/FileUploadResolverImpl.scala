package modules.upload.graphql.resovlers

import java.nio.file.{Files, Path, Paths}

import akka.actor.ActorRef
import akka.http.scaladsl.model.Multipart.FormData
import akka.stream.ActorMaterializer
import akka.stream.scaladsl.{FileIO, Keep, Sink, Source}
import com.google.inject.name.Named
import common.errors._
import common.{ActorUtil, Logger}
import core.implicits.FutureImplicits
import javax.inject.Inject
import modules.upload.actors.FileActor
import modules.upload.actors.FileActor.SaveFileMetadata
import modules.upload.graphql.resovlers.FileUploadResolverImpl.publicDirPath
import modules.upload.models.FileMetadata
import modules.upload.repositories.FileMetadataRepo
import modules.upload.services.HashAppender

import scala.concurrent.{ExecutionContext, Future}

class FileUploadResolverImpl @Inject()(@Named(FileActor.name) fileActor: ActorRef,
                                       fileRepo: FileMetadataRepo,
                                       hashAppender: HashAppender)
                                      (implicit executionContext: ExecutionContext,
                                       materializer: ActorMaterializer) extends FileUploadResolver
  with Logger
  with ActorUtil
  with FutureImplicits {

  override def uploadFiles(parts: Source[FormData.BodyPart, Any]): Future[Boolean] = {
    parts.filter(_.filename.nonEmpty).mapAsync(1) {
      part => {
        val hashedFilename = hashAppender.append(part.filename.get)
        if (!publicDirPath.toFile.exists) Files.createDirectory(publicDirPath)
        part.entity.dataBytes
          .runWith(FileIO.toPath(publicDirPath resolve hashedFilename))
          .map {
            ioResult =>
              FileMetadata(
                name = part.filename.get,
                contentType = part.entity.contentType.toString,
                size = ioResult.count,
                path = s"public/$hashedFilename"
              )
          }
      }
    }.mapAsync(1) {
      fileMetadata =>
        sendMessageToActor[FileMetadata](actorRef => fileActor ! SaveFileMetadata(fileMetadata, actorRef))
    }.toMat(Sink.ignore)(Keep.right).run.map(_ => true)
  }.recover {
    case _: Error => false
  }

  override def files: Future[List[FileMetadata]] = fileRepo.findAll

  override def removeFile(id: Int): Future[Boolean] = {
    for {
      fileMetadata <- fileRepo.find(id) failOnNone NotFound(s"FileMetadata(id: $id)")
      _ <- fileRepo.delete(id)
      deleteResult <- Future(Files.deleteIfExists(Paths.get(getClass.getResource("/").getPath, fileMetadata.path)))
    } yield deleteResult
  }.recover {
    case _: Error => false
  }
}

object FileUploadResolverImpl {
  val publicDirPath: Path = Paths.get(getClass.getResource("/").getPath, "public")
}