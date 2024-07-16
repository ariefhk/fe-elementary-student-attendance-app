import { cn } from "@/lib/utils"
import * as React from "react"
import { useState } from "react"
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  return (
    <div className=" relative w-full group">
      <Input
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn("pr-12", className)}
      />
      {showPassword ? (
        <MdOutlineVisibility
          onClick={togglePassword}
          className={cn(
            "absolute right-3 top-[50%] text-slate-500 group-focus-within:text-primary h-6 w-6 translate-y-[-50%] cursor-pointer",
          )}
        />
      ) : (
        <MdOutlineVisibilityOff
          onClick={togglePassword}
          className={cn(
            "absolute right-3 top-[50%] text-slate-500 group-focus-within:text-primary h-6 w-6 translate-y-[-50%] cursor-pointer",
          )}
        />
      )}
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { Input, PasswordInput }
