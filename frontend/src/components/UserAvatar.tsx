import { Avatar, AvatarFallback } from "./ui/avatar";

const UserAvatar = ({ name, className }: { name: string; className?: string }) => (
    <Avatar className={className}>
        <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
);

export default UserAvatar