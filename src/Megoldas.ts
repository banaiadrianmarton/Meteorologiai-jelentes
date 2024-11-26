import fs from "fs";
import Idojaras from "./Idojaras";

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
}
