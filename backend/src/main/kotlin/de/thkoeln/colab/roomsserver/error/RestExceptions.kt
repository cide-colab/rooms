package de.thkoeln.colab.roomsserver.error

import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

open class RestException(message: String = "") : RuntimeException(message)

class ForbiddenException : RestException()
class NoUserLoggedInException : RestException("No user logged in!")
class UserNotFoundException(username: String) : RestException("UserDAO $username not found!")
class ResourceNotFound(typeName: String, id: String) : RestException("$typeName with id: $id not found!")
class AuthorizationHeaderNotFoundException : RestException("Authorization Header not found!")
class InvalidTokenException(tokenString: String) : RestException("Invalid Token: $tokenString")
class AuthorizationFailedException(tokenString: String) : RestException("Authorization not possible with token: $tokenString")
class StaleTokenException(tokenString: String) : RestException("Stale Token: $tokenString")
class MissingPermissionsException : RestException("Missing permissions!")
class AlreadyExistsException(string: String) : RestException("Duplicate Entity $string.")
class ConflictException(string: String) : RestException(string)
class NotFoundException(string: String) : RestException("Resource not found $string.")

class NotEnoughContingentException() : RestException("Not enough contingent")
class ContingentNotMatchException() : RestException("Time in Allocations not matching")
class UserNotOwnerOfAboException() : RestException("User is not owner of allocated abo")
class AboOutOfBoundsException() : RestException("Abo is not available for given reservation time")
class AboNotForRoomException() : RestException("Abo is not available for given room")

@ControllerAdvice
class RestResponseEntityExceptionHandler : ResponseEntityExceptionHandler() {


    @ExceptionHandler(
            ContingentNotMatchException::class,
            NotEnoughContingentException::class,
            UserNotOwnerOfAboException::class,
            AboOutOfBoundsException::class,
            AboNotForRoomException::class
    )
    protected fun handleBadRequest(exception: Exception, request: WebRequest) =
            handleExceptionInternal(exception, exception.localizedMessage, HttpHeaders(), HttpStatus.BAD_REQUEST, request)


    @ExceptionHandler(EmptyResultDataAccessException::class)
    protected fun handleEmptyResult(exception: EmptyResultDataAccessException, request: WebRequest) =
            handleExceptionInternal(exception, "Resource not found", HttpHeaders(), HttpStatus.NOT_FOUND, request)

    @ExceptionHandler(ForbiddenException::class)
    protected fun handleForbiddenResult(exception: ForbiddenException, request: WebRequest) =
            handleExceptionInternal(exception, "Forbidden", HttpHeaders(), HttpStatus.FORBIDDEN, request)

    @ExceptionHandler(NoUserLoggedInException::class)
    protected fun handleNoLogInResult(exception: NoUserLoggedInException, request: WebRequest) =
            handleExceptionInternal(exception, "No login found", HttpHeaders(), HttpStatus.UNAUTHORIZED, request)

    @ExceptionHandler(UserNotFoundException::class)
    protected fun handleUserNotFoundResult(exception: UserNotFoundException, request: WebRequest) =
            handleExceptionInternal(exception, "User not found", HttpHeaders(), HttpStatus.NOT_FOUND, request)

    @ExceptionHandler(ResourceNotFound::class, NotFoundException::class)
    protected fun handleResourceNotFoundResult(exception: RuntimeException, request: WebRequest) =
            handleExceptionInternal(exception, "Resource not found", HttpHeaders(), HttpStatus.NOT_FOUND, request)

    @ExceptionHandler(AuthorizationHeaderNotFoundException::class)
    protected fun handleAuthorizationHeaderNotFoundResult(exception: AuthorizationHeaderNotFoundException, request: WebRequest) =
            handleExceptionInternal(exception, "Authorization header not found", HttpHeaders(), HttpStatus.UNAUTHORIZED, request)

    @ExceptionHandler(InvalidTokenException::class)
    protected fun handleAuthorizationHeaderNotFoundResult(exception: InvalidTokenException, request: WebRequest) =
            handleExceptionInternal(exception, "Invalid token", HttpHeaders(), HttpStatus.UNAUTHORIZED, request)

    @ExceptionHandler(AuthorizationFailedException::class)
    protected fun handleAuthorizationFailedResult(exception: AuthorizationFailedException, request: WebRequest) =
            handleExceptionInternal(exception, "Authorization failed", HttpHeaders(), HttpStatus.UNAUTHORIZED, request)

    @ExceptionHandler(StaleTokenException::class)
    protected fun handleStaleTokenResult(exception: StaleTokenException, request: WebRequest) =
            handleExceptionInternal(exception, "Stale token", HttpHeaders(), HttpStatus.UNAUTHORIZED, request)

    @ExceptionHandler(MissingPermissionsException::class)
    protected fun handleMissingPermissionsResult(exception: MissingPermissionsException, request: WebRequest) =
            handleExceptionInternal(exception, "Missing permissions", HttpHeaders(), HttpStatus.FORBIDDEN, request)

    @ExceptionHandler(AlreadyExistsException::class)
    protected fun handleAlreadyExistsResult(exception: AlreadyExistsException, request: WebRequest) =
            handleExceptionInternal(exception, "Already exists", HttpHeaders(), HttpStatus.CONFLICT, request)

    @ExceptionHandler(ConflictException::class)
    protected fun handleConflictResult(exception: ConflictException, request: WebRequest) =
            handleExceptionInternal(exception, "Conflict", HttpHeaders(), HttpStatus.CONFLICT, request)

}