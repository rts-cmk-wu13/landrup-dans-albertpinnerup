export default async function activitiesData(id?: string) {
    const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/activities`;

    const response = await fetch(url, {
        method: 'GET',
    });

    const data = await response.json();

    return data;
}
