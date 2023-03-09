import React from 'react'

const Button = ({text, style}: any) => {
  return (
    <button className={style ? style : 'py-1 px-4 rounded-l-full rounded-r-full border bg-transparent'}>

    </button>
  )
}

export default Button