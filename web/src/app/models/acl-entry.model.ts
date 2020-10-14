export interface AclEntryModel {
  contextId: number;
  contextClass: string;
  targetId?: number;
  targetClass: string;
  action: AclAction;
}

export enum AclAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ADMINISTRATE = 'ADMINISTRATE'
}

export enum AclClassAlias {
  room = 'room',
  user = 'user',
  department = 'department',
  abo = 'abo',
  reservation = 'reservation',
  application = 'application'
}

export const APPLICATION_CONTEXT: ContextForm = {
  objectClass: AclClassAlias.application,
  objectId: 0
};

export interface ContextForm {
  objectClass: string;
  objectId: number;
}

export interface PermissionCheckForm {
  target: AclClassAlias;
  action: AclAction;
  context?: ContextForm;
}
