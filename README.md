# Brief v0.2 — brēf

Projekt och arbetsorder för arbetsledare och företagets egen personal. Next.js, React och TypeScript med Supabase Auth, databas och privat Storage.

## Koppla ditt Supabase-projekt

Följ **INSTALLERA-SUPABASE.md**. Kör först `supabase/brief.sql` i Supabase SQL Editor. Ange därefter projektets publicerbara anslutningsuppgifter i `.env.local`.

```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev -- --hostname 0.0.0.0
```

Node 22.13 eller senare behövs för testerna. Efter ändringar i `.env.local` måste utvecklingsservern startas om.

## Arbetsflöde

Registrera första kontot som arbetsledare. Lägg till kollegor med e-post, beställare med fyrsiffriga prefix och kundprojektnummer. Kollegorna registrerar sig med den förregistrerade e-postadressen och blir medlemmar i samma arbetsyta. Skapa, granska och skicka arbetsorder. Utföraren accepterar, startar, bjuder in kollegor, skriver dagbok med bilagor och slutför arbetet.

I anslutet läge försvinner demopersonväljaren. Ingen demo flyttas automatiskt till databasen. Uppdatera-knappen hämtar senaste data från andra enheter. Databasen kontrollerar varje åtgärd och registrerar aktör samt tid. Konflikter avvisas med ett meddelande; användaren hämtar nytt och försöker igen.

Databastabeller: företag, medlemskap, beställare, kundprojekt, projekt, arbetsorder, deltagare, dagbok, filer och händelser. RLS är aktiverat. Klienter har inga direkta CRUD-rättigheter till Brief-tabellerna, utan anropar begränsade RPC-funktioner som validerar medlemskap, roll och tilldelning. Bilagor ligger i en privat bucket och kan bara läsas för tillgängliga arbetsorder. Historik och dagbok är låsta mot ändring/radering i databasen. Supabase-projektägare behåller sina databasägarrättigheter.

## Demo

Utan Supabase-miljövariabler används den ursprungliga lokala demon. `standalone/index.html` är alltid lokal och behöver ingen installation. Känsliga verkliga projektdata ska inte användas i demoläget.

## Verifiering

Fem automatiska klienttester har passerat: bilagor och serverstyrd historik, uppladdningsfel, versionskonflikt, fel vid signerade länkar efter lyckad sparning, samt uteslutning av klientens historik vid nya order. Ursprunglig standalone har också verifierats genom hela flödet.

Fullständigt TypeScript-/Next.js-bygge kunde inte köras här eftersom nätverksbegränsningen hindrade installation av projektets paket. SQL-skriptet har ännu inte körts mot ditt Supabase-projekt. Kör kontrollerna ovan och tvåenhetstestet i installationsguiden före pilot.

Betalning, PWA, automatisk e-postinbjudan, användaravstängning, återställning av lösenord och demodatamigrering ingår inte i v0.2. Varje konto hör till en arbetsyta i denna version. Misslyckade uppladdningar kan lämna oanvända privata objekt som behöver administrativ städning.
