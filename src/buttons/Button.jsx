import React from "react"

const Button = ({ name, onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

export default Button
