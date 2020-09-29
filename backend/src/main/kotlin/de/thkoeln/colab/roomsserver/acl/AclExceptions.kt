/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.acl

class AclClassNotFoundException(className: String) : Throwable("AclClass not found for class $className")