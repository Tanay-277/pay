import { useAppSelector } from "@/redux/hooks"


const DashHeader = () => {

    const username = useAppSelector(state => state.user.name)
    const balance = useAppSelector(state => state.account.balance)

    return (
        <div className="flex md:items-center justify-between flex-col md:flex-row">
            <h1 className="greet text-3xl font-semibold">
                Hello {username?.split(" ")[0]}
            </h1>
            <h1 className="greet md:text-3xl font-semibold text-muted-foreground">
                Balance : {balance.toFixed(2).toLocaleString()}
            </h1>
        </div>

    )
}

export default DashHeader
