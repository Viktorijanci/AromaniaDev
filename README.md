# AromaniaDev
## Odgovori na bitna pitanja
### Kako buildovati/pokrenuti program
Pošto je AromaniaDev pisan u vanilla JS-u, nema potrebe koristiti `npm` za pokretanje i buildovanje. Međutim, kod pristupa lokalnim resursima, pa pokušaji da se program pokrene izvršavanjem `index.html`-a ispašće neuspešni zbog same-origin policy-a koji je prisutan u svim modernim web pretraživačima. Takođe, `start.bat` koristi Node.js modul `live-server`, zbog čega je potreban (ali ne i obavezan) Node.js za pokretanje programa. Dakle, program se pokreće pokretanjem `start.bat`. Od verzije ALPHA08-17-2020 moguće je pokrenuti program tako što se ode na https://viktorijanci.github.io/AromaniaDev/.
### update.bat i push.bat ne rade
Ovo ima nekoliko razloga:
- Nije instaliran Git - Ukoliko pri desnom kliku na neki folder ne pojavi se `Git Bash here` ili kada se ukuca `git` u command prompt, izbaci error, onda nije instaliran Git. On se može skinuti ovde: https://git-scm.com/downloads
- Nije unesen GitHub login - Ukoliko pri izvršavanju `push.bat` pita vas da izvršite neke `git config` komande, to znači da nije pravilno unesen GitHub login. Pokreni `config.bat` i prati uputstva.
- Nije izvršen `update.bat` - Većina errora vezana za `push.bat` koja nisam ovde postavio mogu se popraviti izvršavanjem `update.bat`.
### start.bat ne radi
Ovo ima nekoliko razlog:
- Nije instaliran Node.js - Ukoliko command prompt izbaci error kada se ukuca `npm`, onda nije instaliran Node.js. On se može skinuti ovde (poželjno bi bilo skinuti LTS verziju): https://nodejs.org/en/
- Nije instaliran `live-server` - Ukoliko command prompt izbasci error kada se ukuca `live-server`, onda nije instaliran modul `live-server`. On se instalira tako što se u command prompt ukuca: `npm i -g live-server`
## Bitni linkovi
- Link za automatsko priključivanje Trello timu: https://trello.com/invite/viktorijanci/a0f8ae479746840d3e22fbd68b4f49c0
- Trello board: https://trello.com/b/HKBnOt7e
- Link za online testiranje igre: https://viktorijanci.github.io/AromaniaDev/
