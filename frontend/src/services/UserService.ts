import axios from "axios";

const URL =
	`${import.meta.env.VITE_APP_API_URL}` ||
	"http://192.168.0.103:3000/api/v1/user";

interface TransferPayload {
	amount: string;
	to: string;
}

const handleFetchUsers = async (filter: string) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.get(`${URL}/user/bulk?filter=${filter}`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error: any) {
		console.error("Unable to Fetch Users", error);
		return error.response ? error.response : error;
	}
};

const getUserBalance = async () => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.get(`${URL}/account/balance`, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		return response;
	} catch (error: any) {
		console.error("Unable to Fetch Users", error);
		return error.response ? error.response : error;
	}
};

const handleTransferMoney = async (payload: TransferPayload) => {
	const token = localStorage.getItem("token");
	try {
		const response = await axios.post(`${URL}/account/transfer`, payload, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		return response;
	} catch (error: any) {
		console.error("Unable to Fetch Users", error);
		return error.response ? error.response : error;
	}
};

export { handleFetchUsers, getUserBalance, handleTransferMoney };
