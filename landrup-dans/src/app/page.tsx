import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import HoldTyperCard from '@/components/HoldTyperCard';
import HomeFooter from '@/components/HomeFooter';
import NewsletterSignUp from '@/components/NewsletterSignUp';
import Testimonials from '@/components/Testimonials';
import { createAccessToken } from '@/lib/utils';

export default async function Home() {
    const accessToken = await createAccessToken('albertpinn', 'test1234');

    return (
        <div className='w-full font-sans'>
            <main className='flex w-full flex-col gap-8 mb-4'>
                <Hero />
                <section className='px-4 flex flex-col gap-8'>
                    <h1 id='holdtyper'>Vores holdtyper</h1>
                    <HoldTyperCard holdtype='Børnehold' imgSrc='boernedans.jpg'>
                        <p>
                            På børneholdene leger vi os ind i dansens verden gennem musik, bevægelse
                            og fantasi. Undervisningen styrker motorik, rytme og kropsbevidsthed i
                            trygge rammer. Fokus er på danseglæde, fællesskab og aktiv bevægelse,
                            hvor alle kan være med.
                        </p>
                    </HoldTyperCard>
                    <HoldTyperCard holdtype='Selskabs- og seniordans' imgSrc='seniordans.jpg'>
                        <p>
                            Selskabs- og seniordans kombinerer hyggeligt samvær med skånsom motion.
                            Vi danser klassiske pardanse i et tempo, hvor alle kan følge med.
                            Undervisningen styrker balance, koordination og kondition, samtidig med
                            at fællesskabet og danseglæden er i centrum.
                        </p>
                    </HoldTyperCard>
                    <HoldTyperCard holdtype='Moderne dans og ballet' imgSrc='modernedans.jpg'>
                        <p>
                            Moderne dans og ballet forener teknik, kropskontrol og musikalsk udtryk.
                            Træningen forbedrer styrke, smidighed og holdning gennem varierede
                            øvelser. Undervisningen foregår i en positiv atmosfære, hvor
                            bevægelsesglæde og koncentration skaber både fordybelse og effektiv
                            motion.
                        </p>
                    </HoldTyperCard>
                    <HoldTyperCard holdtype='Streetdance og hiphop' imgSrc='streethiphop.jpg'>
                        <p>
                            Streetdance og hiphop er energifyldt træning med fokus på rytme,
                            attitude og fællesskab. Vi arbejder med grooves, koreografier og
                            grundtrin, der styrker kondition og koordination. Stemningen er uformel
                            og motiverende, så motion og danseglæde går hånd i hånd.
                        </p>
                    </HoldTyperCard>
                </section>
                <section className='px-4 flex flex-col gap-8'>
                    <NewsletterSignUp />
                </section>
                <section className='mt-4'>
                    <Testimonials />
                </section>
                <section className='px-4'>
                    <ContactForm />
                </section>
            </main>
            <footer>
                <HomeFooter />
            </footer>
        </div>
    );
}
