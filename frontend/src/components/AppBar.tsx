import UserBtn from './UserBtn'
import { UserInterface } from "@/types/types";



const AppBar = ({ userData }: { userData: UserInterface | null }) => {
    return (
        <>
            <header className="flex items-center justify-between px-8 py-4 border-b border-muted">
                <h1 className="text-xl font-semibold">OnePay</h1>
                <UserBtn user={userData} />
            </header>

        </>
    )
}

export default AppBar