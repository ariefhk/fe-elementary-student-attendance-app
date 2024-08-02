// import { cn } from "@/lib/class-merge"
import { cn } from "@/lib/utils"
import PropTypes from "prop-types"
import * as React from "react"
import { BsArrowRepeat } from "react-icons/bs"
import { Button } from "../ui/button"

const IconButton = React.forwardRef(
  (
    { name, isLoading, Icon, isDisabled, className, iconClassName, ...props },
    ref,
  ) => {
    return (
      <Button
        {...props}
        disabled={isLoading || isDisabled}
        ref={ref}
        className={cn(
          "bg-white rounded-lg flex justify-center items-center gap-x-1 text-color-1 text-[15px] group p-0 h-0 w-0  border hover:bg-color-1 hover:text-white",
          className,
        )}>
        {isLoading && <BsArrowRepeat className="animate-spin" />}
        {name}
        {Icon && !isLoading && (
          <Icon
            className={cn(
              "flex-shrink-0 w-6 h-6 text-color-1 group-hover:text-white ",
              iconClassName,
            )}
          />
        )}
      </Button>
    )
  },
)
IconButton.displayName = "IconButton"

export { IconButton }

IconButton.propTypes = {
  name: PropTypes.string,
  isLoading: PropTypes.bool,
  Icon: PropTypes.elementType,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
}
