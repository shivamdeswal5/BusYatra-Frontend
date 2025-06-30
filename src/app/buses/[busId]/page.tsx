import BusDetails from "@/components/owner/bus-details";


interface Props {
     params: { busId: string };
}
export default function ExpenseDetailPage({ params }: Props) {
    return <>
    <BusDetails busId ={params.busId}/>
    </>
}