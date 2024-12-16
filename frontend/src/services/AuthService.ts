import axios from "axios";
import { getUserBalance } from "./UserService";

const URL = `${process.env.API_URL}/user`;

interface SignInPayload {
	email: string;
	password: string;
}

interface SignUpPayload {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface UpdatePayload {
	name?: string;
	password?: string;
}

const handleSignIn = async (payload: SignInPayload) => {
	try {
		const response = await axios.post(`${URL}/sign-in`, payload);
		localStorage.setItem("token", response.data.token);
		return response;
	} catch (error: any) {
		console.error("Sign-in failed", error);
		return error.response ? error.response : error;
	}
};

const handleSignUp = async (payload: SignUpPayload) => {
	if (payload.password !== payload.confirmPassword) {
		console.error("Password Mismatch");
		return;
	}
	try {
		const response = await axios.post(`${URL}/sign-up`, payload);
		localStorage.setItem("token", response.data.token);
		return response;
	} catch (error: any) {
		console.error("Sign-up failed", error);
		return error.response ? error.response : error;
	}
};

const handleUpdate = async (payload: UpdatePayload) => {
	// console.log(payload);
	const token = localStorage.getItem("token");
	try {
		const response = await axios.patch(`${URL}/update`, payload, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error: any) {
		console.error("Sign-up failed", error);
		return error.response ? error.response : error;
	}
};

const handleLogout = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("Token Missing");
		return;
	}
	localStorage.removeItem("token");
};

const isLoggedIn = async (): Promise<{
	loggedIn: boolean;
	response?: any;
	balance?: number;
}> => {
	let loggedIn = false;

	try {
		const token = localStorage.getItem("token");
		if (!token) {
			return { loggedIn };
		}
		const response = await axios.get(`${URL}/validate-token`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		if (response.status === 200) loggedIn = true;

		const { data } = await getUserBalance();
		// console.log(data);
		const balance = data.balance;
		return {
			loggedIn,
			response,
			balance,
		};
	} catch (error: any) {
		console.error("Sign-in failed", error);
		return {
			loggedIn: false,
			response: error.response ? error.response : error,
		};
	}
};

export { handleSignIn, handleSignUp, handleLogout, handleUpdate, isLoggedIn };
