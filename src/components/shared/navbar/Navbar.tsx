import { DialogTitle } from "@radix-ui/react-dialog"
import { Menu } from 'lucide-react'
import * as React from "react"
import { Link } from "react-router-dom"
import placeholder from "../../../assets/placeholder/profile.png"
import useAuthUser from "../../../hooks/useGetMe"
import { NavPropsTypes } from "../../../types/types"
import { Button } from "../../ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../ui/sheet"
import Logo from "../logo/Logo"
import PrimaryButton from "../primaryButton"




export function Navbar({ navitems }: { navitems: NavPropsTypes[] }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const { user, handleLogout } = useAuthUser();

    return (
        <header className="my-4 mx-2 lg:mx-0 ">
            <div className="container flex justify-between items-center border md:px-14 px-4  py-3 md:py-3 border-bg_secondary rounded-lg">

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="px-2 lg:hidden ">
                            <Menu className="min-h-6 min-w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <DialogTitle />
                    <SheetContent side="left" className="bg-[#07000a] text-white ">
                        <Link to="/" className=" flex items-center space-x-2">
                            <Logo />
                        </Link>
                        <nav className="flex flex-col gap-6 mt-10">
                            {
                                navitems?.map((data: NavPropsTypes, idx: number) => <Link
                                    key={idx}
                                    to={data.link}
                                    onClick={() => setIsOpen(false)}
                                    className=" font-medium hover:text-primary_highlighted transition-all duration-300 "
                                >
                                    {data.name}
                                </Link>)
                            }
                            {
                                user ? <li className="cursor-pointer lg:text-lg text-base flex items-center gap-1 group relative ">
                                    <ul className="p-2 scale-0 group-hover:scale-100 absolute top-12 right-0 sm:-right-2  transform origin-top-left  transition-transform z-50">
                                        <ul className="flex flex-col gap-2 p-4 w-36 rounded-md shadow-md text-white bg-black z-50">
                                            <Link to={"/profile"} className="cursor-pointer  text-base hover:font-semibold hover:text-hover_Color">Profile</Link>
                                            <Link to={"/chat"} className="cursor-pointer  text-base hover:font-semibold hover:text-hover_Color">Chat</Link>
                                            <Link to={"/invitations"} className="cursor-pointer  text-base hover:font-semibold hover:text-hover_Color">Invitations</Link>
                                            <p onClick={handleLogout} className=" text-primary_highlighted font-semibold">LogOut</p>
                                        </ul>
                                    </ul>
                                </li> : <Link to={"/signIn"} className="cursor-pointer  text-base hover:font-semibold hover:text-hover_Color">Sign In</Link>
                            }
                        </nav>
                    </SheetContent>
                </Sheet>


                <div className="lg:flex hidden items-center flex-1">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        <Logo />
                    </Link>
                    <nav className="flex text-lg flex-1 items-center justify-center gap-10">
                        {
                            navitems?.map((data: NavPropsTypes, idx: number) => <Link
                                key={idx}
                                to={data.link}
                                onClick={() => setIsOpen(false)}
                                className=" font-medium hover:text-primary_highlighted transition-all duration-300 text-nowrap text-base md:text-[15px] lg:text-base"
                            >
                                {data.name}
                            </Link>)
                        }

                    </nav>
                </div>
                <div className="flex items-center sm:justify-end sm:space-x-4 ">
                    {
                        user ? <li className="cursor-pointer lg:text-lg text-base flex items-center gap-1 group relative ">
                            <div className="css_bg p-[2px] rounded-full">
                                <img src={user.profilePicture || placeholder} alt="your avater" className="w-12 h-12 rounded-full" />
                            </div>
                            <ul className="p-2 scale-0 group-hover:scale-100 absolute top-12 right-0 sm:-right-2  transform origin-top-left  transition-transform z-50">
                                <ul className="flex flex-col gap-2 p-4 w-36 rounded-md shadow-md text-white bg-black z-50">
                                    <Link to={"/profile"} className="cursor-pointer  text-base hover:font-semibold hover:text-hover_Color">Profile</Link>
                                    <Link to={"/chat"} className="cursor-pointer  text-base hover:font-semibold hover:text-hover_Color">Chat</Link>
                                    <Link to={"/invitations"} className="cursor-pointer  text-base hover:font-semibold hover:text-hover_Color">Invitations</Link>
                                    <p onClick={handleLogout} className=" text-primary_highlighted font-semibold">LogOut</p>
                                </ul>
                            </ul>
                        </li> : <PrimaryButton to="/signIn" parent="rounded-md lg:block hidden" child="rounded-md px-10">
                            <div className="">Sign In</div>
                        </PrimaryButton>
                    }
                </div>
            </div>
        </header>
    )
}

