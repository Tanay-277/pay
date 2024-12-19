import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Input } from "./ui/input";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState, useEffect } from "react";
import { handleFetchUsers } from "@/services/UserService";
import TransferDialog from "./TransferDialog";
import UserAvatar from "./UserAvatar";
import { User } from "@/types/types";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            handleFetchUsers(filter).then((response) => setUsers(response.data.friends));
        }, 300);

        return () => clearTimeout(debounceFetch);
    }, [filter]);

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <h1 className="text-lg font-semibold text-muted-foreground">Friends</h1>
                <Input
                    type="text"
                    className="max-w-96 min-w-52"
                    placeholder="Search Friends"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <Table className="font-[490]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px] md:w-[100px]"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell className="font-medium">
                                <UserAvatar name={user.name} />
                            </TableCell>
                            <TableCell>
                                <HoverCard>
                                    <HoverCardTrigger>{user.name}</HoverCardTrigger>
                                    <HoverCardContent className="w-fit">
                                        <div className="flex justify-center space-x-4">
                                            <UserAvatar name={user.name} />
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-semibold">@{user._id.slice(0, 6)}</h4>
                                                <p className="text-sm">{user.email}</p>
                                                <p className="text-sm">{user.name}</p>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                            <TableCell className="text-right">
                                <TransferDialog user={user}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Users;



