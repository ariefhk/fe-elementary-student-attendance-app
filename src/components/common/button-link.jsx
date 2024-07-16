import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

export default function ButtonLink({ name, to, className }) {
  return (
    <Button asChild className={className} variant="primary">
      <Link to={to}>{name}</Link>
    </Button>
  )
}

ButtonLink.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
}
