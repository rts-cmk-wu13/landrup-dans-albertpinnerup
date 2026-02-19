import testimonialsData from '@/lib/dal/testimonials';
import { log } from 'console';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel';

type TestimonialType = {
    id: number;
    content: string;
    name: string;
    occupation: string;
};

export default async function Testimonials() {
    const testimonials = await testimonialsData();

    if (testimonials.length === 0) {
        return;
    }
    log('testimonials', testimonials);

    return (
        <Carousel className='bg-[#052A52] text-[#E9E9E9] py-8 px-4' opts={{ loop: true }}>
            <h3 className='font-bold text-center'>Det siger vores kunder om os</h3>
            <CarouselContent>
                {testimonials.map((testimonial: TestimonialType) => (
                    <CarouselItem
                        key={testimonial.id}
                        className='flex flex-col items-center gap-4 p-4'
                    >
                        <p className='text-center'>"{testimonial.content}"</p>
                        <section>
                            <h4 className='text-center font-bold'>{testimonial.name} </h4>
                            <p className='text-center text-sm'>{testimonial.occupation}</p>
                        </section>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className='flex items-center justify-center gap-2'>
                <CarouselPrevious size={'icon-lg'} className='bg-[#052A52]' />
                <CarouselNext size={'icon-lg'} className='bg-[#052A52]' />
            </div>
        </Carousel>
    );
}
