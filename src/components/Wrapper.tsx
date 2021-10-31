import { useState } from "react";
import Main from "./Main";
import Login from "./Login";
import { HashRouter } from "react-router-dom";
import { IUser } from "../types";
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";

const Wrapper = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.general);

	const [user, setUser] = useState<IUser>(() => {
		const user = localStorage.getItem("crosscourt_user");

		if (user) {
			return JSON.parse(user);
		} else {
			return {
				userId: "",
				name: "",
				email: "",
				avatarUrl: "",
				currentSessionId: "",
				isGuest: true
			}
		}
	});

    return (
        <>
            {
                isLoggedIn
                ? <HashRouter>
                    <Main user={user} />
                </HashRouter>
                : <Login setUser={setUser} />
            }
        </>
    );
}

export default Wrapper;