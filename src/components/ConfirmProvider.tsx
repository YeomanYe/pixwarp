"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { ConfirmDialog } from "./ConfirmDialog"

interface ConfirmOptions {
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isDanger?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined)

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    options: ConfirmOptions
    resolve: (value: boolean) => void
  } | null>(null)

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        options,
        resolve,
      })
    })
  }, [])

  const handleConfirm = () => {
    state?.options.onConfirm?.()
    state?.resolve(true)
    setState(null)
  }

  const handleCancel = () => {
    state?.options.onCancel?.()
    state?.resolve(false)
    setState(null)
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && (
        <ConfirmDialog
          isOpen={true}
          title={state.options.title}
          description={state.options.description}
          confirmText={state.options.confirmText}
          cancelText={state.options.cancelText}
          isDanger={state.options.isDanger}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const context = useContext(ConfirmContext)
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider")
  }
  return context.confirm
}
