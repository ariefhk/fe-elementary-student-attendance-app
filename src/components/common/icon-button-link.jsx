// import { cn } from "@/lib/class-merge"
import { cn } from "@/lib/utils"
import Proptypes from "prop-types"
import * as React from "react"
import { BsArrowRepeat } from "react-icons/bs"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const IconButtonLink = React.forwardRef(
  ({ name, to, isLoading, isDisabled, Icon, className, iconClassName, ...props }, ref) => {
    return (
      <Button
        {...props}
        disabled={isLoading || isDisabled}
        ref={ref}
        variant="plain"
        asChild
        className={cn(
          "bg-white rounded-lg  text-color-1 text-[15px] group p-0 h-0 w-0  border hover:bg-color-1 hover:text-white",
          className,
        )}>
        <Link to={to} className="flex justify-center items-center gap-x-1">
          {isLoading && <BsArrowRepeat className="animate-spin" />}
          {name}
          {Icon && !isLoading && (
            <Icon
              className={cn("flex-shrink-0 w-6 h-6 text-color-1 group-hover:text-white ", iconClassName)}
            />
          )}
        </Link>
      </Button>
    )
  },
)
IconButtonLink.displayName = "IconButtonLink"

export { IconButtonLink }

IconButtonLink.propTypes = {
  name: Proptypes.string,
  to: Proptypes.string,
  isLoading: Proptypes.bool,
  isDisabled: Proptypes.bool,
  Icon: Proptypes.elementType,
  className: Proptypes.string,
  iconClassName: Proptypes.string,
}
