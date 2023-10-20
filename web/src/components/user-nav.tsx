import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/registry/new-york/ui/avatar"
import { Button } from "@/registry/new-york/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import {useNavigate} from "react-router-dom";

export function UserNav() {
    const storedUser = localStorage.getItem('userInfo')
    const storedUserJson = JSON.parse(storedUser || '{}')
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/');
    };
    return (
        <>
            <div className="flex grow-0"></div>
            <DropdownMenu >
                <DropdownMenuTrigger asChild id="profile" className="flex items-end">
                    <Button variant="ghost" className="absolute h-9 w-9 top-0 right-0 m-5 rounded-2xl">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="avatars/profile.svg"/>
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-2xl font-medium leading-none">{storedUserJson.login}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {storedUserJson.mail}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-lg font-medium leading-none">
                            {storedUserJson.firstname}  {storedUserJson.lastname}
                        </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="logout-button">
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}