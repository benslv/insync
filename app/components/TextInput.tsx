import type { InputHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

export const TextInput = forwardRef(
	(
		{
			className,
			...rest
		}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<input
				ref={ref}
				type="text"
				className={`px-4 py-2 transition-colors border rounded-full placeholder:text-neutral-400 bg-neutral-800 border-neutral-500 focus:bg-neutral-600 ${className}`}
				{...rest}
			/>
		);
	}
);

TextInput.displayName = "TextInput";
