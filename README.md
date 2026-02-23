# Dokumentation

## Techstack

- Next.js
- TailwindCSS
- TypeScript
- Zod
- ShadCN

Jeg har valgt NextJS, da jeg syntes det er rart at få en masse ting serveret på et sølvfad. Det er rart at bruge et framework hvor der allerede er taget nogle beslutninger for en (af folk der har arbejdet med faget i længere tid) - der er ingen grund til at genopfinde den dybe tallerken. Jeg er ret stor fan af der fil baserede routes, frem for f.eks. react routers kode-baseret router.

Jeg har valgt at bruge TailwindCSS, fordi det fjerner noget fil struktur og overblik som jeg skulle brug 'hjerne-kapacitet' på, hvis jeg f.eks. havde valgt at bruge SASS.
Det giver for mig god mening at bruge Tailwind da jeg godt kan lide at arbejde 'atomiseret'. Så styling til et komponent hænger sammen med komponentet - desuden er det også hurtigere at skrive end vanilla CSS og SASS.

Jeg har valgt at bruge TypeScript, da det giver mig en bedre 'developer experience'. Det er en kæmpe gave når man skal til at håndtere data fra et API, props på et komponentet osv.

## Tredjeparts kode

- shadCN
  UI komponent bibliotek. koden bliver lagt direkte ind i ens projekt så man kan ændre den hvis man har lyst. Gør at jeg bruge min tid på vigtig logik istedet for at designe komponenter som andre har perfektioneret og gjort 100 gange før.
  Jeg har valgt at bruge shadCN frem for andre komponent biblioteker (som f.eks. noget som heroUI), da det er openSource og, som nævnt før, så bliver koden lagt direkte ind i ens kode base, så man har rent faktisk ownership over ens kode.

- Zod
  runtime type validering. Bruges til at lave error messages og type validere formularer. Da typescript kun kører ved buildtime, så er zod rigtig rart at have, så der ikke bliver sendt 'ulovlig' data til ens formularer

## Valgfri opgave

Jeg har valgt at løse valgfri opgave B og C, da jeg syntes at der var meget logik der hang sammen (login flow).

## Valg undervejs

Jeg har forsøgt så vidt som muligt, at splitte logik op og strukturere projektet. Det vil sige en mappe til alle layouts, en fil til auth helpers, en mappe til actions, route groups osv. Dette er for at nemmere at kunne holde overblik og for ikke at komme til lave spaghette kode.
Jeg har også valgt at fortolke designet, de steder hvor det ikke er tydeligt hvad der skal ske/hvordan det skal se ud.
Jeg har f.eks. valgt at fjerne heroen på forsiden når man er logget ind, da den optager meget 'screen real estate' og føles redundant når brugeren allerede har set den.

## Kode Eksempel

       export default async function activityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
        const cookieStore = await cookies();
        const { id } = await params;

        const activity: ActivityType = await activitiesData(id);
        const userId = cookieStore.get('userId')?.value;

        const user = await getUser();

        console.log('user:', user);

        const initialJoinedState = activity?.users?.some((user) => user.id === Number(userId)) || false;

        console.log('initialJoinedState:', initialJoinedState);

        return (
            <ActivityDetailsClient
                activity={activity}
                activityId={id}
                initialJoinedState={initialJoinedState}
                age={user.age}
            />
        );
    }

dette er koden til min activity details page.

- Jeg startet med destrukturere id ud af params. Jeg bruger await da funktionen er asynkron (hvis ikke der bliver sagt await, bliver der kun retuneret et promise).

- Derefter deklarere og initialisere jeg variablen cookieStore. dens værdi er det objekt der bliver returneret, når promise'et fra cookies() bliver resolved.

- det samme gør jeg med activity. Det er det en hjælpe funktion jeg har skrevet til at fetche en specifik aktivitet. værdien ender med at være et aktivitets objekt.

- Jeg bruger cookieStore til at læse cookien med name "userId' og gemmer dens værdi i variablet userId.

- igen gemmer jeg et user objekt der bliver fetchet med en hjælpe funktion jeg har skrevet.

- InitialsJoinedState bruger jeg til at tjekke om den nuværende bruger allerede er tilmeldt aktiviteten. Det gør jeg ved at tjekke om det userId der er i cookies allerede findes på det array over tilmeldte brugere der findes i activity objektet. Jeg bruger array metoden some, der enten returnere true eller false, hvis den finder et element i array der opfylder den test funktion, der bliver passed til den.

Jeg "passer" alle disse variabler som props til ActivityDetailsClient komponentet.
Jeg gør det på denne måde da ActivityDetailsClient komponentet gør brug af useActionState. Til at starte med brugte jeg state (destruktureret ud af useActionState) til at checke hvor vidt brugeren havde tilmeldt sig den givne aktivitet. Det gik hurtigt op mig at state blev nulstillet på hvert reload og at det derfor ikke stemte overens med back-enden. derfor checker jeg nu på serveren hvor vidt brugereren er tilmeldt en aktivitet, og passer true eller false til useActionStates, initialState.
Den løsning viste sig også at gøre koden mere overskuelig, da jeg før brugte en useEffect med en async IIFE (immediately invoked function expression) til at initialisere alle mine variabler (noget rod).
