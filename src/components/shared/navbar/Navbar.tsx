import { DialogTitle } from "@radix-ui/react-dialog"
import { Menu } from 'lucide-react'
import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import avater from "../../../assets/player/avater 1.jpg"
import { NavPropsTypes } from "../../../types/types"
import { Button } from "../../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../ui/sheet"
import Logo from "../logo/Logo"
import PrimaryButton from "../primaryButton"



export function Navbar({ navitems }: { navitems: NavPropsTypes[] }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const navigate = useNavigate()
    return (
        <header className="my-4 mx-2 lg:mx-0">
            <div className="container flex justify-between items-center border md:px-14 px-4  py-3 md:py-3 border-bg_secondary rounded-lg">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="px-2 lg:hidden">
                            <Menu className="min-h-6 min-w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <DialogTitle />
                    <SheetContent side="left" className="bg-bg_secondary text-white ">
                        <Link to="/" className=" flex items-center space-x-2">
                            <Logo />
                        </Link>
                        <nav className="flex flex-col gap-6 mt-10">
                            {
                                navitems?.map((data: NavPropsTypes, idx: number) => <Link
                                    key={idx}
                                    to={data.link}
                                    onClick={() => setIsOpen(false)}
                                    className=" font-medium hover:text-primary_highlighted transition-all duration-300"
                                >
                                    {data.name}
                                </Link>)
                            }
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="lg:flex hidden items-center  flex-1">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <Logo />
                    </Link>
                    <nav className="flex text-lg flex-1 items-center justify-center gap-10">
                        {
                            navitems?.map((data: NavPropsTypes, idx: number) => <Link
                                key={idx}
                                to={data.link}
                                onClick={() => setIsOpen(false)}
                                className=" font-medium hover:text-primary_highlighted transition-all duration-300 text-nowrap"
                            >
                                {data.name}
                            </Link>)
                        }
                    </nav>
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <PrimaryButton parent="rounded-md lg:block hidden" child="rounded-md px-10">
                        <button onClick={() => navigate("/signIn")} className="">Sign In</button>
                    </PrimaryButton>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="css_bg p-[2px] rounded-full">
                                <img src={avater} alt="your avater" className="w-12 rounded-full" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>tahsin0909</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={"/profile"}>
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={"/clan"}>
                                    Clan
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link to={"/chat"}>
                                    Chat
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>


                </div>
            </div>
        </header>
    )
}

