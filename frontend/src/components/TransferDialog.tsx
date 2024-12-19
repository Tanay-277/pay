import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import UserAvatar from "./UserAvatar";

import { handleTransferMoney } from "@/services/UserService";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const TransferDialog = () => {
    const user = useAppSelector(state => state.user)
    const balance = useAppSelector(state => state.account.balance)

    const [amount, setAmount] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("");

    const handleTransfer = async () => {
        const to = user.id;
        const transferAmount = Number.parseInt(amount);

        if (transferAmount >= balance) {
            setError("Insufficient Balance");
            return;
        }

        try {
            setLoading(true);
            const response = await handleTransferMoney({ amount, to });
            console.log(response);
            setLoading(false);
            if (response.status === 200) {
                setSuccess("Transfer successful!");
                setAmount("");
            } else {
                setError(response.data.msg)
            }
        } catch (error: any) {
            setError(error.message || "An error occurred");
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="btn bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Transfer
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle className="text-center mb-6">Transfer Money</DialogTitle>
                    <UserAvatar name={user.name} className="scale-125" />
                    <DialogDescription className="text-base pt-2 font-semibold text-light">
                        {user.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center flex-col">
                    <Input
                        type="number"
                        className={`!text-bold mb-2 w-48 !text-3xl text-center border-none outline-none shadow-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-transparent ${Number.parseInt(amount) >= balance && "text-red-600"
                            }`}
                        placeholder="0"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            setError("");
                            setSuccess("");
                        }}
                    />
                    <p className="text-center text-muted-foreground font-medium">Enter Amount</p>
                    <Button
                        disabled={Number.parseInt(amount) >= balance || loading}
                        className="disabled:cursor-wait my-4 text-lg"
                        size="lg"
                        onClick={handleTransfer}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Processing...
                            </>
                        ) : "Pay"}

                    </Button>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {success && <p className="text-center text-green-500">{success}</p>}
                    <p className="text-center text-muted-foreground font-medium mt-6">
                        Your Balance: {balance.toFixed(2)}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TransferDialog;