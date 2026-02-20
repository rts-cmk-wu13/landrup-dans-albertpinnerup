export default async function testimonialsData() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
        method: 'GET',
    });

    const data = await response.json();

    return data;
}
