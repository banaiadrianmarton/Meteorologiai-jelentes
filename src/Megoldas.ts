import fs, { write, writeFileSync } from "fs";
import Idojaras from "./Idojaras";
import { strict } from "assert";

export default class Megoldas {
    #idojaras: Idojaras[] = [];

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim(); // trim() -> vezérlő karakterek levágása
                if (aktSor.length > 0) {
                    // ha adatok vannak a sorban:
                    this.#idojaras.push(new Idojaras(aktSor));
                }
            });
    }

    Utolsomeres(varoskod: string): string {
        const varoskodok: string[] = [];
        this.#idojaras.forEach(element => {
            if (element.telepules === varoskod) {
                varoskodok.push(element.ido);
            }
        });
        const ido = varoskodok[varoskodok.length - 1];
        const formazottIdo = `${ido.slice(0, 2)}:${ido.slice(2)}`;
        return `Az utolsó mérési adat a megadott településről ${formazottIdo}-kor érkezett.`;
    }

    get HomersekletMagas(): string {
        let maxFok: Idojaras = this.#idojaras[0];
        this.#idojaras.forEach(element => {
            if (element.fok > maxFok.fok) {
                maxFok = element;
            }
        });
        const formazottIdo = `${maxFok.ido.slice(0, 2)}:${maxFok.ido.slice(2)}`;
        return `A legmagasabb hőmérséklet: ${maxFok.telepules} ${formazottIdo} ${maxFok.fok} fok.`;
    }

    get HomersekletAlacsony(): string {
        let minFok: Idojaras = this.#idojaras[0];
        this.#idojaras.forEach(element => {
            if (element.fok < minFok.fok) {
                minFok = element;
            }
        });
        const formazottIdo = `${minFok.ido.slice(0, 2)}:${minFok.ido.slice(2)}`;
        return `A legalacsonyabb hőmérséklet: ${minFok.telepules} ${formazottIdo} ${minFok.fok} fok.`;
    }

    Szelcsend(): Idojaras[] {
        const szelcsendIdopontok: Idojaras[] = [];
        this.#idojaras.forEach(element => {
            if (element.szeliranyErosseg === "00000") {
                szelcsendIdopontok.push(element);
            }
        });
        return szelcsendIdopontok;
    }

    KozepHomersekletEsIngadozas(): string {
        const telepulesek: { [key: string]: Idojaras[] } = {};

        this.#idojaras.forEach(element => {
            if (!telepulesek[element.telepules]) {
                telepulesek[element.telepules] = [];
            }
            telepulesek[element.telepules].push(element);
        });

        let eredmeny = "";

        for (const varosKod in telepulesek) {
            const meresek = telepulesek[varosKod];

            const idopontok = ["0100", "0700", "1300", "1900"];
            const homerseklet: number[] = [];
            let nincsMeres = false;

            idopontok.forEach(ido => {
                const meres = meresek.find(m => m.ido === ido);
                if (meres) {
                    homerseklet.push(meres.fok);
                } else {
                    nincsMeres = true;
                }
            });

            if (nincsMeres) {
                eredmeny += `${varosKod} NA; `;
            } else {
                const atlag = Math.round(homerseklet.reduce((osszeg, t) => osszeg + t, 0) / homerseklet.length);
                eredmeny += `${varosKod} Középhőmérséklet: ${atlag}; `;
            }

            const maxFok = Math.max(...meresek.map(m => m.fok));
            const minFok = Math.min(...meresek.map(m => m.fok));
            const ingadozas = maxFok - minFok;
            eredmeny += `Hőmérséklet-ingadozás: ${ingadozas}\n`;
        }

        return eredmeny;
    }
    // fajlIr(telepKod: string): string {
    //     const varosLista: Idojaras[] = [];
    //     this.#idojaras.forEach(varos => {
    //         if (varos.telepules == telepKod) {
    //             varosLista.push(varos);
    //         }
    //     });
    //     if (varosLista[0] == null) {
    //         return `\nEz a város nem szerepel a listában.`;
    //     }
    //     fs.writeFileSync(`${telepKod}.txt`, `${varosLista}`);
    //     return `\nA fájlok elkészültek.`;
    // }
}
