<h1>Kuumaksete kalkulaator</h1>
<h2>Eesti Energia veebiarendaja praktikale kandideerimise kodutöö</h2>

Rakendus on nähtav aadressil <a href="https://kuumaksete-kalkulaator.netlify.app/">kuumaksete-kalkulaator.netlify.app</a>

<h3>Kirjeldus</h3>
Tegemist on kalkulaatoriga, mis arvutab välja summa, mille klient maksuperioodi jooksul igas kuus peab tasuma. Arvutustel võetakse arvesse teenust ja sellega seotud andmeid, projekti täismaksumust, kliendi sissemaksu ning makseperioodi pikkust.

<h3>Kasutamine</h3>
Klient saab valida korraga ühe teenuse, kusjuures muid tegevusi ei saa teha enne, kui teenus on valitud. Sõltuvalt teenuse valikust omistatakse täismaksumusele ja perioodi pikkusele lähteväärtused.

Klient saab slaideriga muuta teenuse täismaksumust, kusjuures minimaalne maksumus on 300 eurot ja maksimaalne arvutatakse lähtuvalt sellest, et krediidisumma (projekti maksumus) ei muutuks suuremaks kui 25 000 eurot. Rippmenüüst saab klient valida perioodi pikkuse ning sissemakse sisend lubab kliendil sobiva summa kas ise trükkida või seda paremal asuvate noolekeste abil valida. Maksimaalne sissemakse suurus arvutatakse lähtuvalt sellest, et krediidisumma ei muutuks väiksemaks kui 300 eurot.

Krediidisumma avaldub valemiga <code>täismaksumus - sissemakse</code> ning see arvutatakse ümber iga kord, kui klient muudab kas teenuse täismaksumust või sissemakse suurust. Sõltuvalt sellest, millisesse suurusvahemikku krediidisumma jääb (välja arvatud päikesepaneelide teenuse puhul), määratakse intressi protsent, lepingutasu, igakuine haldustasu ja maksimaalne perioodi pikkus.

Kuumakse arvutatakse valemiga <code>(krediidisumma * (1 + intress / 100) + lepingutasu) / periood + haldustasu</code>.

Kohe, kui klient valib teenuse, kuvatakse talle kõiki andmeid. Andmed on kogu aeg ajakohased ning muutuvad kohe, kui muutub mõni väärtus, millest need andmed sõltuvad.

<h3>Kasutatud tehnoloogiad</h3>
<ul>
    <li>HTML/CSS</li>
    <li>JavaScript</li>
    <li>jQuery</li>
</ul>
