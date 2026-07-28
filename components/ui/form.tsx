"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

const Form = FormProvider

type FormFieldContextValue = {
  name: string
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const { formState } = useFormContext()
  const fieldState = fieldContext ? formState.errors[fieldContext.name] : undefined

  return {
    name: fieldContext?.name,
    error: fieldState,
  }
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`space-y-2 ${className || ""}`} {...props} />
  )
)
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField()
    return (
      <label
        ref={ref}
        className={`text-sm font-medium leading-none ${error ? "text-red-400" : ""} ${className || ""}`}
        {...props}
      />
    )
  }
)
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => <div ref={ref} {...props} />
)
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error } = useFormField()
    const body = children || (error?.message as string | undefined)
    if (!body) return null

    return (
      <p ref={ref} className={`text-sm font-medium text-red-400 ${className || ""}`} {...props}>
        {body}
      </p>
    )
  }
)
FormMessage.displayName = "FormMessage"

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage }
