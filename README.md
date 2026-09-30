# Brief — uttalas brēf

Första fristående versionen av Brief. Logotypen visar **brēf**, appnamnet är **Brief**.

## Starta i GitHub Codespaces

1. Öppna detta repository i Codespaces.
2. Kör `npm install`.
3. Kör `npm run dev`.
4. Öppna port 3000 via fliken Ports. Om porten inte går att öppna, kör `npm run dev -- --hostname 0.0.0.0`.

`npm run build` kontrollerar produktionsbygget. `npm run typecheck` kontrollerar TypeScript.

## Prova hela flödet

1. Som Johan: skapa en arbetsorder i ett nytt eller befintligt projekt. Prefix **1842** identifierar Salabostäder AB; **2100** identifierar Fastighetspartner.
2. Granska och skicka till Erik.
3. Byt demoperson till Erik i sidhuvudet. Öppna projektet och acceptera ordern.
4. Bjud in Marcus under Utförare. Byt till Marcus för att acceptera inbjudan.
5. Starta arbetet. Skriv en dagboksanteckning och bifoga en bild eller fil.
6. Markera arbetet som slutfört och kontrollera Historik.

Projektstatus beräknas från arbetsorder: alla slutförda innebär Slutförd; någon pågående innebär Pågående; annars Ej påbörjad. Ett projekt utan arbetsorder är Ej påbörjad. Personal, beställarprefix och kundprojektnummer läggs till under Team & beställare.

## Avgränsning i v0.1

Detta är en lokal demo, inte en skarp pilot. Data inklusive bilagor lagras i webbläsarens localStorage, delas inte mellan enheter och kan försvinna om webbläsardata rensas. Max 5 filer per anteckning, 2 MB per fil; den totala lagringsgränsen styrs av webbläsaren. Vid fullt lagringsutrymme sparas inte ändringen och ett meddelande visas.

Demopersonväljaren simulerar roller. Den är inte inloggning eller säker behörighetskontroll. Historik saknar redigeringsknapp, men lokal data kan ändras utanför appen. Ingen extern inbjudan eller notifiering skickas. Nästa steg är Supabase Auth, företagsisolering och RLS, databashistorik och Storage för bilagor. Därefter delad pilot och PWA. Använd inte känsliga verkliga projektdata i demoläget.

## Publicering

Projektet kan importeras från GitHub till Vercel med Next.js som ramverk. Inga miljövariabler behövs för denna demo. Anslut brief.nu efter att demonstrationen har verifierats. Databas och riktig inloggning ska byggas före skarp användning.

## Öppna utan installation

Öppna standalone/index.html i en webbläsare. Den versionen följer den bifogade HTML-prototypens ljusa blå design och har verifierats genom hela arbetsflödet, inklusive filinnehåll, omladdning och mobilbredd. Den fristående filen Brief-demo.html innehåller samma demo och logotyp i en enda fil.

Next.js-källan finns i app/ och lib/. Produktionsbygget har ännu inte verifierats: installationen av paket blockerades av miljöns nätverksbegränsning. Ingen kod har skickats till GitHub.

