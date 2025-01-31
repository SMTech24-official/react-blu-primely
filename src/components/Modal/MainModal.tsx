

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"


interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export function MainModal({ isOpen, onClose, children }: EditModalProps) {


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]  bg-zinc-900 text-white">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    )
}

