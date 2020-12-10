import * as React from 'react'
import classNames from 'classnames'
import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultButtonPropsType & {
   outline?: any
}

const Button: React.FC<ButtonPropsType> = ({onClick, className, outline, children}) => {

   return (
       <button onClick={() => {
       }}
               className={classNames('button', className, {
                  'button--outline': outline,
               })}
       >{children}</button>
   )
}

export default Button