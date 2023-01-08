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
				className="absolute items-center justify-center w-[1527px] flex-0 border-2 border-green-500 rounded-full h-[1527px]"
			></motion.div>
			<motion.div
				animate={{ scale: [1, 1.2, 1] }}
				transition={{
					repeat: Infinity,
					ease: "easeInOut",
					duration: 5,
					delay: 0.2,
				}}
				className="absolute items-center justify-center w-[1221px] flex-0 border-2 border-green-500 rounded-full h-[1221px]"
			></motion.div>
			<motion.div
				animate={{ scale: [1, 1.3, 1] }}
				transition={{
					repeat: Infinity,
					ease: "easeInOut",
					duration: 5,
					delay: 0.1,
				}}
				className="absolute items-center justify-center w-[917px] flex-0 border-2 border-green-500 rounded-full h-[917px]"
			></motion.div>
			<motion.div
				animate={{ scale: [1, 1.4, 1] }}
				transition={{
					repeat: Infinity,
					ease: "easeInOut",
					duration: 5,
				}}
				className="absolute w-[611px] border-2 border-green-500 rounded-full flex-0 h-[611px]"
			></motion.div>
		</div>
	);
}
