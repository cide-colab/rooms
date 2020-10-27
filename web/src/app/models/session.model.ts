import {AclEntryModel} from './acl-entry.model';

export interface Session {
  userId?: string;
  acl: AclEntryModel[];
}
