import { handleLogout } from "@/services/AuthService";
import { Button } from "./ui/button";
import { Link } from "react-router";

const LogoutBtn = ({ variant, size }: any) => (
    <Button asChild onClick={handleLogout} variant={variant} size={size}>
        <Link to="/sign-in" className="w-full">Logout</Link>
    </Button>
);

export default LogoutBtn;
