import type { InputHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

export const TextInput = forwardRef(
	(
		{ className, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<input
				ref={ref}
				type="text"
				className={`min-w-0 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2 transition-colors placeholder:text-neutral-400 focus:bg-neutral-700 ${className}`}
				{...rest}
			/>
		);
	}
);

TextInput.displayName = "TextInput";
