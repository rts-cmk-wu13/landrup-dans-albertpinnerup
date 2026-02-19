export default async function testimonialsData() {
    const response = await fetch('http://localhost:4000/api/v1/testimonials', {
        method: 'GET',
    });

    const data = await response.json();

    return data;
}
