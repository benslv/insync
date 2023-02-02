import type { ChangeEvent, InputHTMLAttributes, Ref } from "react";
import { forwardRef, useState } from "react";

export const NumberInput = forwardRef(
	(
		{
			className,
			...rest
		}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
		ref: Ref<HTMLInputElement>
	) => {
		const [value, setValue] = useState<number>(
			(rest.defaultValue as number) ?? 50
		);

		const max = (rest.max as number) ?? 100;
		const min = (rest.min as number) ?? 0;

		const increment = () => setValue((prev) => Math.min(max, prev + 1));
		const decrement = () => setValue((prev) => Math.max(min, prev - 1));

		const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;

			if (newValue === "") {
				return;
			}
			const parsedValue = parseInt(newValue, 10);

			console.log({ parsedValue });

			if (isNaN(parsedValue)) {
				return;
			}

			setValue((prev) => {
				if (parsedValue > max || parsedValue < min) return prev;

				return parsedValue;
			});
		};

		const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
			console.log("blurred!");
		};

		return (
			<div className="flex flex-nowrap">
				<button
					onClick={decrement}
					className="px-4 py-1 transition-colors rounded-tl-full rounded-bl-full bg-neutral-700 hover:bg-neutral-600"
				>
					-
				</button>
				<input
					ref={ref}
					type="number"
					value={value}
					min={0}
					max={100}
					onBlur={handleBlur}
					onChange={handleChange}
					className={`px-4 py-1 transition-colors min-w-0 bg-neutral-800 border-neutral-500 focus:bg-neutral-600 ${className}`}
					{...rest}
				/>
				<button
					onClick={increment}
					className="px-4 py-1 transition-colors rounded-tr-full rounded-br-full bg-neutral-700 hover:bg-neutral-600"
				>
					+
				</button>
			</div>
		);
	}
);

NumberInput.displayName = "NumberInput";
