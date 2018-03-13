
U index html nalazi navigacija i div "main" u koji se ucitavaju komponente.
Komponente se nalaze u folderu compunents a javascript za svaku komponentu ee nalazi u folderu js i istog je naziva kao komponenta.
Nakon ucitavanja componente u main div u index.html se kreira javascript koji kontrolice komponentu - povlaci se iz foldera js.

File main.js u folderu js kontrolise rad aplikacije, tu se kreira app objekt u kome se nalaze osnovne app varijable, zatim logika za 
setovanje i citanje cookie-a, provera dali je user logovan i koji je nivo prioriteta, logika za bazicno rutiranje i ucitavanje komponenti
 i javascripta.

Prilikom ucitavanja na ekranu se pojavljuje zatamljeni div koji se sklanja kad se sadrzaj ucita potpuno

U app objektu file main.js se nalaze api_key za pristup serveru i api_token koji se setuje kad se user uloguje.