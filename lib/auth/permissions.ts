export type RoleName = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'

export type Permission = 'content:write' | 'content:publish' | 'content:delete' | 'media:delete' | 'settings:write' | 'users:manage' | 'audit:read' | 'submissions:read' | 'submissions:manage'

const matrix: Record<RoleName, Permission[]> = {
  EDITOR: ['content:write', 'content:publish'],
  ADMIN: ['content:write', 'content:publish', 'content:delete', 'media:delete', 'settings:write', 'audit:read', 'submissions:read', 'submissions:manage'],
  SUPER_ADMIN: ['content:write', 'content:publish', 'content:delete', 'media:delete', 'settings:write', 'audit:read', 'submissions:read', 'submissions:manage', 'users:manage'],
}

export function can(role: RoleName, permission: Permission) {
  return matrix[role]?.includes(permission) ?? false
}

export const roleLabels: Record<RoleName, string> = {
  SUPER_ADMIN: 'Super administrator',
  ADMIN: 'Administrator',
  EDITOR: 'Editor',
}
