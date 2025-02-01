import { LogOut, Menu } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar
} from "../ui/sidebar"

import logo from "@/assets/logo/logo.jpeg"
import { Link, Outlet, useLocation } from "react-router-dom"
import { menuItems } from "../../lib/fakeData/menuItems"
import { ScrollArea } from "../ui/scroll-area"




export function Layout() {

    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'short', // "short" for the abbreviated month name
        year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-GB', options); // For the format: Thursday, 19 Nov, 2024


    const user = {
        image: "https://img.freepik.com/free-photo/3d-rendering-basketball-player_23-2150898613.jpg?ga=GA1.1.1088808881.1737022066&semt=ais_hybrid",
        name: "Tahsin",
        role: "Admin"
    }

    const { setOpenMobile, isMobile } = useSidebar()

    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;
    return (
        <div className="flex h-screen overflow-hidden w-full">
            <Sidebar className="hidden md:flex pt-5 bg-card_bg">
                <SidebarHeader className=" flex items-center px-4  bg-card_bg text-white overflow-hidden">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="" className="w-20" />
                        <h1 className="text-xl font-bold">Blue Primel Tournament</h1>
                    </div>
                </SidebarHeader>
                <ScrollArea className="flex-grow bg-card_bg text-white">
                    <SidebarContent className="px-4 mt-4">
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem onClick={() => {
                                    if (isMobile) setOpenMobile(false); // Close on mobile click
                                }} key={item.label}>
                                    <div className="" >
                                        {/* will be a function which will verfiy its active or not with dynamic  */}
                                        <Link
                                            to={item.href}
                                            className={`flex items-center gap-3 py-3 hover:text-primary_highlighted ${isActive(item.href) ? "text-primary_highlighted font-bold" : "text-white"
                                                }`}
                                        >
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </div>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </ScrollArea>
                <SidebarFooter className="p-4  bg-card_bg text-white">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/logout" className="flex items-center gap-3">
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset className="flex flex-col flex-grow w-full">
                <header className="py-4 flex items-center px-4 bg-card_bg text-white">
                    <SidebarTrigger className="md:hidden mr-2">
                        <Menu className="h-6 w-6" />
                    </SidebarTrigger>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold uppercase">Well Come Back</h2>
                            <h2 className="font-semibold text-sm text-gray-400">{formattedDate}</h2>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-3 mt-4">
                            <img
                                src={user?.image}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div className="flex-1">
                                <div className="font-medium">{user?.name}</div>
                                <div className="text-xs text-gray-500">{user?.role}</div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 w-full bg-black h-full overflow-x-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </div>
    )
}

