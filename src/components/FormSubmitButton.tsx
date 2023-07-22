"use client";

import { clsx } from "clsx";
import { ComponentProps, ReactNode } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface FormSubmitButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  className?: string;
}

export default function FormSubmitButton({
  children,
  className,
  ...rest
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      type="submit"
      disabled={pending}
      className={clsx("btn btn-primary", className)}
    >
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        children
      )}
    </button>
  );
}
