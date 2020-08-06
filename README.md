# AromaniaDev
## Odgovori na bitna pitanja
### update.bat i push.bat ne rade
Ovo ima nekoliko razloga:
- Nije instaliran Git - Ukoliko pri desnom kliku na neki folder ne pojavi se "Git Bash here" ili kada se ukuca "git" u command prompt, izbaci error, onda nije instaliran Git. On se može skinuti ovde: https://git-scm.com/downloads
- Nije unesen GitHub login - Ukoliko pri izvršavanju push.bat pita vas da izvršite git config komande, to znači da nije pravilno unesen GitHub login. Pokreni config.bat i prati uputstva.
### start.bat ne radi
Ovo ima nekoliko razlog:
- Nije instaliran Node.js - Ukoliko command prompt izbaci error kada se ukuca "npm," onda nije instaliran Node.js. On se može skinuti ovde (poželjno bi bilo skinuti LTS verziju): https://nodejs.org/en/
- Nije instaliran live-server - Ukoliko command prompt izbasci error kada se ukuca "live-server," onda nije instaliran modul "live-server." On se instalira tako što se u command prompt ukuca: `npm i -g live-server`
