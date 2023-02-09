export default function Card({children, ...attr}) {

    return <div {...attr}>{children}</div>
}

export function CardDetail({children, ...attr}) {
    return <div style={{
        justifyContent: "space-between"
    }}>{children}</div>
}