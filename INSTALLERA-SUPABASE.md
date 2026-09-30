# Koppla Brief till Supabase

Det här uppdaterar Next.js-appen i Codespaces. Den tidigare fristående HTML-demofilen fortsätter vara en lokal demo.

## 1. Skapa databas och filbehörigheter

Öppna Brief-projektet i Supabase. Välj **SQL Editor → New query**. Kopiera hela `supabase/brief.sql`, klistra in den och välj **Run**.

Skriptet är avsett att köras **en gång i ett nytt projekt**. Det skapar Briefs egna tabeller och en privat bucket `brief-files`. Om körningen ger fel: spara feltexten och rätta den innan nästa steg. Transaktionen rullar tillbaka vid fel.

## 2. Uppdatera filerna i Codespaces

Packa upp uppdateringspaketet. Dra in mapparna `app`, `lib` och `supabase` samt `package.json` och `INSTALLERA-SUPABASE.md` direkt under BRIEF-APP i Codespaces. Välj att ersätta befintliga filer. Behåll din befintliga `public`-mapp med logotyperna.

Skapa en fil med exakt namnet **.env.local** i samma mapp som package.json. Lägg in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tydlltgkpmkoonroiapx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_eaW2flSAuUCyXEeHcCp4ZA_4lJhExnRv
```

Detta är en publicerbar klientnyckel. Appen använder ingen hemlig service_role-nyckel. .env.local ska inte skickas till GitHub.

## 3. Installera och starta om

Stoppa den gamla servern med **Ctrl+C** i terminalen. Kör sedan:

```bash
npm install
npm run typecheck
npm run build
npm run dev -- --hostname 0.0.0.0
```

Öppna port 3000. Efter att `.env.local` skapats behöver servern startas om. Nu ska inloggning visas i stället för demopersonväljaren.

## 4. Bekräftelse av e-post

I Supabase, öppna **Authentication → URL Configuration**. Ange appens Codespaces-adress som **Site URL**, och lägg till samma adress i **Redirect URLs**. Adressen kommer från port 3000, börjar med https och slutar ofta med app.github.dev. Vid senare publicering lägger du till den publicerade appadressen också.

Behåll e-postbekräftelse aktiverad. Skapa ditt eget konto i Brief med namn och företag. Bekräfta mejlet och logga sedan in. Ditt första konto skapar en isolerad arbetsyta och blir arbetsledare. Arbetsytan startar tom; demoprojekten flyttas inte automatiskt.

## 5. Lägg till teamet

Som arbetsledare: öppna **Team & beställare**, lägg till kollegans namn, **e-postadress** och roll. Be sedan kollegan öppna samma appadress och registrera sig med just den e-postadressen. Efter mejlbekräftelse ansluts kontot till din arbetsyta. Lägg till kollegorna innan de registrerar sig; annars skapar de egna, separata arbetsytor.

Ingen separat inbjudan skickas via e-post från appen i denna version. Supabase skickar mejlet för kontobekräftelse. Den inbyggda mejltjänsten kan ha begränsningar för mottagare och antal mejl; konfigurera egen SMTP under Authentication inför teamtest om det behövs.

Lägg till Salabostäder AB med prefix **1842**, och minst ett kundprojektnummer. Skapa sedan arbetsorder till en utförare.

## 6. Kontrollera på två enheter

1. Arbetsledaren skapar en order från datorn.
2. Utföraren loggar in från telefonen och väljer **Uppdatera** för att hämta den.
3. Utföraren accepterar, startar, skriver i dagboken och bifogar en bild.
4. Arbetsledaren väljer **Uppdatera** och kontrollerar anteckningen och bilden.
5. Utföraren bjuder in en kollega som accepterar från sitt eget konto.
6. Markera som slutförd och kontrollera automatisk historik.
7. En utförare som inte är tilldelad eller inbjuden ska inte se ordern. Ett konto som skapats för en annan arbetsyta ska inte se några av dina projekt.

Uppdatering sker på begäran via knappen Uppdatera. Om två personer försöker spara på samma arbetsyta samtidigt avvisas den äldre versionen; hämta nytt och försök igen. Formulärens innehåll finns kvar vid sparfel.

## Begränsningar och verifiering

- En e-postadress/konto kan höra till en arbetsyta i v0.2.
- Ingen automatisk migrering av demodata, PWA, återställning av lösenord, användaravstängning eller automatiska notifieringar ännu.
- Bilagor: 5 per anteckning, 2 MB per fil. Misslyckade uppladdningar kan lämna oanvända privata objekt i Storage; administrativ städning behövs inför längre pilot.
- Historik, dagbok och bilagereferenser är låsta mot redigering i databasen. Administratörer som hanterar själva Supabase-projektet har fortfarande databasägarrättigheter.
- Den gamla standalone-versionen är lokal. Använd Codespaces-appens webbadress för denna integration.
- Källan och databasskriptet är förberedda. Fullständig verifiering i ditt Supabase-projekt görs efter att du kört SQL-skriptet och startat den uppdaterade appen; projektet har inte konfigurerats åt dig på distans.

Dokumentation: [Supabase Auth](https://supabase.com/docs/guides/auth), [Storage-behörigheter](https://supabase.com/docs/guides/storage/security/access-control), [Database Functions](https://supabase.com/docs/guides/database/functions).
