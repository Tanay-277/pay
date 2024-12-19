import UserBtn from './UserBtn'
const AppBar = () => {
    return (
        <>
            <header className="flex items-center justify-between px-8 py-4 border-b border-muted">
                <h1 className="text-xl font-semibold">OnePay</h1>
                <UserBtn />
            </header>

        </>
    )
}

export default AppBar