import fs from "fs"; // https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; // https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; // https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./Megoldas";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    const mo: Megoldas = new Megoldas("tavirathu13.txt");
    let varosKod: string | undefined = params.get("varos")?.toUpperCase();
    if (varosKod && varosKod.length != 2) {
        res.write("A település kódja nem lehet hosszabb karakternél.");
    }
    if (varosKod == undefined) {
        varosKod = "SM";
    }
    res.write(`2. feladat\nAdja meg a település kódját! Település: <input type='text' name='varos' value="${varosKod}" style='max-width:100px;' placeholder="" onChange='this.form.submit();'>\n`);
    res.write(`${mo.Utolsomeres(varosKod)}`);
    res.write(`\n3.feladat\n`);
    res.write(`${mo.HomersekletAlacsony}\n`);
    res.write(`${mo.HomersekletMagas}\n`);
    res.write(`4.feladat\n`);
    mo.Szelcsend().forEach(element => {
        const formazottIdo = `${element.ido.slice(0, 2)}:${element.ido.slice(2)}`;
        res.write(`${element.telepules} ${formazottIdo}\n`);
    });
    res.write(`5.feladat\n`);
    res.write(`${mo.KozepHomersekletEsIngadozas()}`);
    res.write("</pre></form></body></html>");
    res.end();
}
