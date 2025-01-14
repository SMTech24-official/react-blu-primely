import { navItems } from "../../../routes/Routes";
import { FloatingNav } from "../../ui/floating-navbae";

export function FloatingNavbar() {
    return (
        <div className="relative  w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}
