export default function Input({ name, type, placeholder }) {
	return (
		<>
			<div>
				<label
					htmlFor={name}
					className="relative"
				>
					<span className="absolute left-4 -top-1/2 -translate-y-1/2 bg-white text-sm px-1">{name}</span>
					<input
						id={name}
						type={type}
						placeholder={placeholder}
						className="border outline-none focus:outline-none py-2 px-4 rounded-sm w-full"
					/>
				</label>
			</div>
		</>
	);
}
