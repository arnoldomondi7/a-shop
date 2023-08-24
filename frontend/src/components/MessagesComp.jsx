import React from "react"
import { Alert } from "react-bootstrap"

const MessagesComp = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}
MessagesComp.defaultProps = {
  variant: "info",
}
export default MessagesComp
