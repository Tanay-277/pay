"use client";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch";
import { UserInterface } from "@/types/types";
import LogoutBtn from "./LogoutBtn";
import { useEffect, useRef, useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { Separator } from "./ui/separator";

const UserBtn = ({ user }: { user: UserInterface | null }) => {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const handleThemeChange = () => setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));

    useEffect(() => {
        document.querySelector("html")?.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const dialogRef = useRef<null | HTMLButtonElement>(null)

    const handleDialog = () => {    
        dialogRef.current?.click();
    }

    return (
        <>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>{user?.name[0]}</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={handleDialog}>Profile</MenubarItem>
                        <MenubarItem>Transactions</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem className="focus:bg-transparent justify-between">
                            Theme
                            <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem className="focus:bg-transparent">
                            <LogoutBtn />
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <Dialog>
                <DialogTrigger className='hidden' ref={dialogRef}>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Profile</DialogTitle>
                        <DialogDescription>
                            This is how others will see you on the site.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm user={user}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserBtn;
