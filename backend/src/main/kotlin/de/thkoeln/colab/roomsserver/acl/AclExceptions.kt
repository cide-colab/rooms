package de.thkoeln.colab.roomsserver.acl


class AclClassNotFoundException(className: String) : Throwable("AclClass not found for class $className")