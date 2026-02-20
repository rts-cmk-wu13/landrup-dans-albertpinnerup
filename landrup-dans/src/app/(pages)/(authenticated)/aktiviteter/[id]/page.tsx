import activitiesData from '@/lib/dal/activities';

export default async function activityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const activityDetails = await activitiesData(id);

    console.log(activityDetails);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Aktivitet Detaljer</h1>
            <p>Vis detaljer for aktivitet "{activityDetails.name}"</p>
        </div>
    );
}
