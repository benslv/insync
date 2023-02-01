import type { InputHTMLAttributes, Ref } from "react";
import React, { forwardRef, useState } from "react";

export const NumberInput = forwardRef(
	(
		{
			className,
			...rest
		}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
		ref: Ref<HTMLInputElement>
	) => {
		const [number, setNumber] = useState<number>(50);

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			console.log(event.target.valueAsNumber);

			setNumber(event.target.valueAsNumber);
		};

		return (
			<div>
				<input ref={ref} type="hidden" value={number} {...rest} />
				<button className="">-</button>
				<input
					type="number"
					value={number}
					onChange={handleChange}
					className={`px-4 py-1 transition-colors appearance-none bg-neutral-800 border-neutral-500 focus:bg-neutral-600 ${className}`}
				/>
				<button className="">+</button>
			</div>
		);
	}
);

NumberInput.displayName = "NumberInput";
