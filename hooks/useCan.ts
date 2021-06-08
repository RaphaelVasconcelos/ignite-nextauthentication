import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

type UseCanParams = {
  permissions?: string[],
  roles?: string[],
}

export function UseCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    const allPermissions = permissions.every(permission => {
      return user.permissions.includes(permission);
    })

    if(!allPermissions){
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user.roles.includes(role);
    })

    if(!hasAllRoles){
      return false;
    }
  }

  return true;
}