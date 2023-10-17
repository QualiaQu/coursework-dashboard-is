import {
    Avatar,
    AvatarFallback,
    // AvatarImage,
} from "@/registry/new-york/ui/avatar"
import { Button } from "@/registry/new-york/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        {/*<AvatarImage src="https://avatars.mds.yandex.net/i?id=35eb4061877ca70a159ef06dbc0f7a89d4e188ab-10105725-images-thumbs&n=13" alt="@shadcn" />*/}
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
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-lg font-medium leading-none">
                        {storedUserJson.firstname}  {storedUserJson.lastname}
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout} className="logout-button">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}