import { Outlet, useLocation } from "react-router-dom";

export default function AuthHandler() {
	const params = useLocation();
	console.log(params.pathname);
	return (
		<section className="center ">
			<div className="custom-container h-screen w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-4">
				<div className="w-[60%] mx-auto space-y-10">
					<div className="space-y-8">
						<div className="lg:text-5xl text-3xl font-bold">Better Acco</div>
						<div className="space-y-2">
							<h1 className="text-3xl font-bold">
								{params.pathname === "/auth-handler/login" ? "Login" : "Register"}
							</h1>
							<p>
								{params.pathname === "/auth-handler/login" ? "Login" : "Register"} to access
								your Better Acco Acount
							</p>
						</div>
					</div>
					<Outlet />
				</div>
				<div className="rounded-2xl overflow-hidden">
					<div className="h-[800px] w-[760px]">
						<img
							src="/assets/images/room.jpeg"
							alt="Hello"
							className="object-cover h-full w-full"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
