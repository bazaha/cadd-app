import * as React from "react"

const TabsContext = React.createContext(null)

function Tabs({ defaultValue, value, onValueChange, children, ...props }) {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "")
  
  const handleValueChange = React.useCallback((value) => {
    setTabValue(value)
    onValueChange?.(value)
  }, [onValueChange])
  
  // 同步外部值
  React.useEffect(() => {
    if (value !== undefined) {
      setTabValue(value)
    }
  }, [value])
  
  return (
    <TabsContext.Provider value={{ value: tabValue, onValueChange: handleValueChange }}>
      <div {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }) {
  const baseStyles = "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
  const styles = [baseStyles, className].filter(Boolean).join(" ")
  
  return (
    <div
      className={styles}
      role="tablist"
      {...props}
    />
  )
}

function TabsTrigger({ className, value, children, ...props }) {
  const context = React.useContext(TabsContext)
  const isActive = context?.value === value
  
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const activeStyles = "bg-background text-foreground shadow-sm"
  const inactiveStyles = "hover:bg-background/50 hover:text-foreground"
  
  const styles = [
    baseStyles,
    isActive ? activeStyles : inactiveStyles,
    className
  ].filter(Boolean).join(" ")
  
  return (
    <button
      className={styles}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => context?.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({ className, value, children, ...props }) {
  const context = React.useContext(TabsContext)
  const isActive = context?.value === value
  
  if (!isActive) return null
  
  const baseStyles = "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  const styles = [baseStyles, className].filter(Boolean).join(" ")
  
  return (
    <div
      className={styles}
      role="tabpanel"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

