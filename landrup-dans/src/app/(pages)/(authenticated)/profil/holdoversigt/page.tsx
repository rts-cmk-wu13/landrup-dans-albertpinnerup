export default function Holdoversigt({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <div>
            <h1>Holdoversigt for hold {id}</h1>
        </div>
    );
}
