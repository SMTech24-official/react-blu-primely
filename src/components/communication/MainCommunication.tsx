/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DialogTitle } from '@radix-ui/react-dialog'
import { Dot, Menu } from "lucide-react"
import { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Communication from './Communication'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'

export default function CommunicationComponent() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [message, setMessage] = useState<string>("");
    const [id, setId] = useState("");
    const [showMessage, setShowMessage] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // Demo Data
    const [allUser, setAllUser] = useState([
        {
            user: { _id: "1", fullName: "John Doe", profileImage: "https://img.freepik.com/free-photo/cartoon-man-wearing-glasses_23-2151136892.jpg?t=st=1738241888~exp=1738245488~hmac=53a101aae8483060e1456033a794e2e67f594075a577df2c4a42313470a52736&w=1380" },
            lastMassage: { message: "Hello! How are you?" }
        },
        {
            user: { _id: "2", fullName: "Jane Smith", profileImage: "https://img.freepik.com/free-photo/cartoon-man-wearing-glasses_23-2151136892.jpg?t=st=1738241888~exp=1738245488~hmac=53a101aae8483060e1456033a794e2e67f594075a577df2c4a42313470a52736&w=1380" },
            lastMassage: { message: "Need some help with my order." }
        },
    ]);

    const handelUserId = (user: any) => {
        setId(user._id);
        setSelectedUser(user);
        setShowMessage([
            { role: "user", message: "Hi! I need assistance." },
            { role: "admin", message: "Sure! How can I help you?" }
        ]);
    };

    const handelSend = () => {
        if (message) {
            setShowMessage((prev: any) => [...prev, { role: "admin", message }]);
        }
        setMessage("");
    };

    const ConversationList = () => (
        <div className="w-full h-full bg-[#1B1B1B]">
            <div>
                <p className="font-semibold py-[22px] text-primary text-xl shadow-sm bg-section rounded-lr-md text-start flex items-center"> <Dot className='text-green-500 min-w-10 min-h-10' /> Messages</p>
            </div>
            <ScrollArea style={{
                border: "none"
            }} className="md:h-[calc(79vh-8rem)] h-full ">
                {allUser.map((chat: any, index) => (
                    <div
                        onClick={() => handelUserId(chat?.user)}
                        key={index}
                        className="flex items-center justify-between hover:bg-slate-700 p-4 cursor-pointer  rounded-md mx-2 my-2 transition-all duration-200"
                    >
                        <div className='flex items-center gap-4'>
                            <img
                                src={chat.user.profileImage}
                                alt={chat?.user?.fullName ?? "User"}
                                className="rounded-full object-cover w-10 h-10"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm xl:text-lg font-semibold text-white">{chat?.user?.fullName ?? "Unknown User"}</p>
                                <p className="text-sm truncate text-white">{chat?.lastMassage?.message}</p>
                            </div>
                        </div>
                        <div className='text-primary_highlighted'>
                            7:00
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );

    return (
        <div className="max-h-[90vh] container">
            <div className='bg-[#1B1B1B] rounded-lg mb-10'>
                <div className="flex flex-col lg:flex-row rounded-lg md:mt-10 mt-5">
                    <div className="lg:hidden mb-4 bg-black">
                        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                            <SheetTrigger asChild>
                                <Button className='mb-3'>
                                    <Menu className="mr-2 h-4 w-4" />
                                    View Conversations
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#1B1B1B]">
                                <DialogTitle />
                                <ConversationList />
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden w-1/3 lg:block ">
                        <ConversationList />
                    </div>

                    <div className="flex-1">
                        {selectedUser ? (
                            <div>
                                <header className="flex items-center justify-between px-4 py-[16px]">
                                    <div className="flex items-center gap-3 ">
                                        <img
                                            src={selectedUser?.profileImage}
                                            alt={selectedUser?.fullName ?? "User"}
                                            className="rounded-full w-14 h-14 object-cover"
                                        />
                                        <div>
                                            <h1 className="font-semibold">{selectedUser?.fullName}</h1>
                                        </div>
                                    </div>
                                </header>
                                <div className='bg-black'>
                                    <Communication
                                        message={message}
                                        messages={showMessage}
                                        setMessages={setMessage}
                                        handelSend={handelSend}
                                        userRole={"admin"}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="w-full min-h-[60vh] flex items-center justify-center text-primary_highlighted">
                                Select a message to view details
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
