import { store } from "@/store"
import PropTypes from "prop-types"
import { Provider } from "react-redux"

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

ReduxProvider.propTypes = {
  children: PropTypes.node,
}
