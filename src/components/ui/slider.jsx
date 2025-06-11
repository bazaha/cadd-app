import * as React from "react"

const Slider = React.forwardRef(({ className, min = 0, max = 100, step = 1, value = [0], onValueChange, ...props }, ref) => {
  const [localValue, setLocalValue] = React.useState(value)
  
  // 同步外部值
  React.useEffect(() => {
    setLocalValue(value)
  }, [value])
  
  // 计算百分比位置
  const getPercentage = (val) => {
    return ((val - min) / (max - min)) * 100
  }
  
  // 处理拖动
  const handleDrag = (e) => {
    const container = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - container.left) / container.width
    const newValue = min + Math.round((max - min) * pos / step) * step
    const clampedValue = Math.max(min, Math.min(max, newValue))
    
    const newValues = [clampedValue]
    setLocalValue(newValues)
    onValueChange?.(newValues)
  }
  
  // 处理鼠标按下
  const handleMouseDown = (e) => {
    handleDrag(e)
    
    const handleMouseMove = (e) => {
      handleDrag(e)
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  const baseStyles = "relative flex w-full touch-none select-none items-center"
  const styles = [baseStyles, className].filter(Boolean).join(" ")
  
  return (
    <div
      ref={ref}
      className={styles}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <div className="relative w-full h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute h-full bg-primary"
          style={{ width: `${getPercentage(localValue[0])}%` }}
        />
      </div>
      <div
        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={{ left: `calc(${getPercentage(localValue[0])}% - 10px)` }}
      />
    </div>
  )
})

Slider.displayName = "Slider"

export { Slider }

