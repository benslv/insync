import type { InputHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

export const RangeSlider = forwardRef(
	(
		{ className, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<input
				ref={ref}
				type="range"
				className={`accent-green-500 ${className}`}
				defaultValue={50}
				min={0}
				max={100}
				{...rest}
			/>
		);
	}
);

RangeSlider.displayName = "RangeSlider";
