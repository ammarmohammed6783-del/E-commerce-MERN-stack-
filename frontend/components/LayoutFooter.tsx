
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import StayUpdated from "@/components/StayUpdated";

export default function LayoutFooter() {
    const pathname = usePathname();

    const isProfilePage = pathname.startsWith("/profile");

    if (isProfilePage) {
        return null;
    }

    return (
        <div className="mt-auto flex flex-col gap-[10px]">
            <StayUpdated />
            <Footer />
        </div>
    );
}
