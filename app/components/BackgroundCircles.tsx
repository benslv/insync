import { motion } from "framer-motion";

export function BackgroundCircles() {
	return (
		<div className="flex items-center justify-center">
			<motion.div
				animate={{ scale: [1, 1.15, 1] }}
				transition={{
					repeat: Infinity,
					ease: "easeInOut",
					duration: 5,
					delay: 0.3,
				}}
				className="flex-0 absolute h-[1527px] w-[1527px] items-center justify-center rounded-full border-2 border-green-500"></motion.div>
			<motion.div
				animate={{ scale: [1, 1.2, 1] }}
				transition={{
					repeat: Infinity,
					ease: "easeInOut",
					duration: 5,
					delay: 0.2,
				}}
				className="flex-0 absolute h-[1221px] w-[1221px] items-center justify-center rounded-full border-2 border-green-500"></motion.div>
			<motion.div
				animate={{ scale: [1, 1.3, 1] }}
				transition={{
					repeat: Infinity,
					ease: "easeInOut",
					duration: 5,
					delay: 0.1,
				}}
				className="flex-0 absolute h-[917px] w-[917px] items-center justify-center rounded-full border-2 border-green-500"></motion.div>
			<motion.div
				animate={{ scale: [1, 1.4, 1] }}
				transition={{
					repeat: Infinity,
					ease: "easeInOut",
					duration: 5,
				}}
				className="flex-0 absolute h-[611px] w-[611px] rounded-full border-2 border-green-500"></motion.div>
		</div>
	);
}
