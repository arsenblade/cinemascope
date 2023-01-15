import { FC, MouseEvent } from "react"
import { Link } from "react-router-dom";
import { useActions } from "../../../../../hooks/useAction";
import MaterialIcon from "../../../../ui/MaterialIcon";

const LogoutButton:FC = () => {
  const {logout} = useActions()

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout()
  }
  return (
    <li>
      <Link to="#" onClick={handleLogout}>
        <MaterialIcon name='MdLogout' />
        <span>Logout</span>
      </Link>
    </li>
  )
}

export default LogoutButton