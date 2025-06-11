import * as React from "react"

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => {
  const baseStyles = "relative overflow-auto"
  const styles = [baseStyles, className].filter(Boolean).join(" ")
  
  return (
    <div
      ref={ref}
      className={styles}
      data-radix-scroll-area-viewport=""
      {...props}
    >
      {children}
    </div>
  )
})

ScrollArea.displayName = "ScrollArea"

export { ScrollArea }

