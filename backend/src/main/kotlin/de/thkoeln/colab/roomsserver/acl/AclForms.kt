package de.thkoeln.colab.roomsserver.acl


data class PermissionForm(
        val targetClass: AclClass,
        val action: AclAction
)

data class RoleForm(
        val name: String,
        val permissions: List<PermissionForm> = listOf()
)
