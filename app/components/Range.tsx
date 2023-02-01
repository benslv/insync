import type { InputHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

export const RangeSlider = forwardRef(
	(
		{
			className,
			...rest
		}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<div className="flex items-center gap-x-2">
				<span className="text-xs text-neutral-400">0</span>
				<input
					ref={ref}
					type="range"
					className="flex-1 accent-green-500"
					defaultValue={50}
					{...rest}
					min={rest.min ?? 0}
					max={rest.max ?? 100}
				/>
				<span className="text-xs text-neutral-400">100</span>
			</div>
		);
	}
);

RangeSlider.displayName = "RangeSlider";
