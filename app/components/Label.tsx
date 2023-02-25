import type { LabelHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

export const Label = forwardRef(
	(
		{ children, className, ...rest }: LabelHTMLAttributes<HTMLLabelElement>,
		ref: Ref<HTMLLabelElement>
	) => {
		return (
			<label
				ref={ref}
				className={`text-sm text-neutral-400 ${className}`}
				{...rest}>
				{children}
			</label>
		);
	}
);

Label.displayName = "Label";
