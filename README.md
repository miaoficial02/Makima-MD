> [!IMPORTANT]
> **Este proyecto está en constante evolución. Estamos comprometidos en ofrecer a nuestra comunidad un Bot increíble. Te invitamos a instalarlo y para estar al tanto de todas las novedades. [Click Aquí](https://stellarwa.xyz/channel)**

<p align="center"> 
<img src="https://files.catbox.moe/ixhyq3.png" alt="AlyaBot-MD" style="width: 75%; height: auto; max-width: 100px;">

----

<details>
  <summary><b>Instalación de Alya</b></summary>

## Instalación por Termux
> [!IMPORTANT]
> **No garantizamos un funcionamiento perfecto en Termux, aunque trabajamos constantemente para asegurar una buena compatibilidad. Si experimentas lentitud o errores, por favor envía una solicitud con la evidencia correspondiente para que nuestro equipo pueda solucionarlo. Si el problema persiste, te recomendamos considerar los servicios de alojamiento de bots de nuestros patrocinadores.**

<details>

<details>
  <summary><b>Instalación Manual</b></summary>
 
> *Comandos para instalar de forma manual*
```bash
termux-setup-storage
```
```bash
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
```
```bash
git clone https://github.com/DevAlexJs/AlyaBot-MD && cd AlyaBot-MD
```
```bash
yarn install && npm install
```
```bash
npm start
```
> *Si aparece **(Y/I/N/O/D/Z) [default=N] ?** use la letra **"y"** y luego **"ENTER"** para continuar con la instalación.*

</details>

<details>
  <summary><b>Comandos para mantener más tiempo activo el Bot</b></summary>
 
> *Ejecutar estos comandos dentro de la carpeta AlyaBot-MD*
```bash
termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs 
``` 
#### Opciones Disponibles
> *Esto eliminará todo el historial que hayas establecido con PM2:*
```bash 
pm2 delete index
``` 
> *Si tienes cerrado Termux y quiere ver de nuevo la ejecución use:*
```bash 
pm2 logs 
``` 
> *Si desea detener la ejecución de Termux use:*
```bash 
pm2 stop index
``` 
> *Si desea iniciar de nuevo la ejecución de Termux use:*
```bash 
pm2 start index
```
---- 
### En caso de detenerse
> _Si despues que ya instalastes tu bot y termux te salta en blanco, se fue tu internet o reiniciaste tu celular, solo realizaras estos pasos:_
```bash
cd && cd AlyaBot-MD && npm start
```
----
### Obtener nuevo código QR 
> *Detén el bot, haz click en el símbolo (ctrl) [default=z] usar la letra "z" + "ENTER" hasta que salga algo verdes similar a: `AlyaBot-MD $`*
> **Escribe los siguientes comando uno x uno :**
```bash 
cd && cd AlyaBot-MD && rm -rf AlyaSession && npm run qr
```
----
### Obtener nuevo código de teléfono 
```bash 
cd && cd AlyaBot-MD && rm -rf AlyaSession && npm run code
```
</details>

### Propietario del Proyecto
[![DevAlexJs](https://github.com/DevAlexJs.png?size=100)](https://github.com/DevAlexJs) 
