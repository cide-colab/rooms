/*
 * Copyright (c) 2020  colab  TH-Köln
 * @author Florian Leonhard
 * All rights reserved
 */

package de.thkoeln.colab.roomsserver.core.models

interface DepartmentModel {
    val name: String
    val description: String
    val imageUrl: String?
}

interface DepartmentIdentity: DepartmentModel, IdentityModel