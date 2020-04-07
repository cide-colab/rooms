import {AclEntry} from './acl-entry.model';

export interface Session {
  userId?: string;
  acl: AclEntry[];
}
