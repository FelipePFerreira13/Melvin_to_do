type CardProps = {
    children: any;
}

export function Card(props : CardProps){
    return <div className="bg-white p-4 rounded-xl border-2 w-90" style={{ borderColor: "#e5e7eb" }}>
        {props.children}
    </div>
}