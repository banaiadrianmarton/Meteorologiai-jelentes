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
}
