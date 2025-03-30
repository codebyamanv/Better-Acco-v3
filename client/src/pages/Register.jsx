import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";


export default function Register() {
	return (
		<form className="space-y-4">
			<Input
				name="Email"
				type="email"
				placeholder="Email"
			/>
			<Input
				name="Password"
				type="password"
				placeholder="Password"
			/>
			<Button value="Register" />
		</form>
	);
}
