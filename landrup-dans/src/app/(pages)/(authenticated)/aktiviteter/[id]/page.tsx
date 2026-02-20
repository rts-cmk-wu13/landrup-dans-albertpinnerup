export default function activityDetailsPage({ params }: { params: { id: string } }) {
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Aktivitet Detaljer</h1>
            <p>Vis detaljer for aktivitet med ID: {params.id}</p>
        </div>
    );
}
