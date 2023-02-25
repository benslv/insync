import type { ChangeEvent, InputHTMLAttributes, Ref } from "react";
import { forwardRef, useState } from "react";

export const NumberInput = forwardRef(
	(
		{ className, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
		ref: Ref<HTMLInputElement>
	) => {
		const [value, setValue] = useState<number | "">(
			(rest.defaultValue as number) ?? 50
		);

		const max = (rest.max as number) ?? 100;
		const min = (rest.min as number) ?? 0;

		const increment = () => {
			setValue((prev) => Math.min(max, (prev || 0) + 1));
		};
		const decrement = () => {
			setValue((prev) => Math.max(min, (prev || 0) - 1));
		};

		const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;

			if (newValue === "") {
				setValue("");
			}

			if (!/[0-9]+/.test(newValue)) return;

			const parsedValue = parseInt(newValue);

			return setValue(parsedValue);
		};

		const handleBlur = () => {
			if (value === "" || 0) {
				return setValue(1);
			}
		};

		return (
			<div className="flex flex-nowrap">
				<button
					onClick={decrement}
					type="button"
					className="rounded-tl-full rounded-bl-full bg-neutral-700 py-1 pl-4 pr-3 transition-colors hover:bg-neutral-600">
					-
				</button>
				<input
					ref={ref}
					type="tel"
					value={value}
					min={0}
					max={100}
					onBlur={handleBlur}
					onChange={handleChange}
					className={`w-12 min-w-0 border-neutral-500 bg-neutral-800 px-2 py-1 text-center transition-colors focus:bg-neutral-600 ${className}`}
					{...rest}
				/>
				<button
					onClick={increment}
					type="button"
					className="rounded-tr-full rounded-br-full bg-neutral-700 py-1 pl-3 pr-4 transition-colors hover:bg-neutral-600">
					+
				</button>
			</div>
		);
	}
);

NumberInput.displayName = "NumberInput";
