export default async function assetsData(id?: string) {
    const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/assets`;

    const response = await fetch(url, {
        method: 'GET',
    });

    const data = await response.json();

    return data;
}
