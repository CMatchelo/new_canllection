import { CanTable } from "@/app/components/CanTable";
import { Header } from "@/app/components/Header";

interface PageProfileProps {
    params: {
        userId: string;
    }
}

export default function PageProfile ({}: PageProfileProps) {

    return (
        <div>
            <Header />
            <CanTable />
        </div>
    )
}