export default class Idojaras {
    #telepules: string;
    #ido: string;
    #szeliranyEroseg: string;
    #homerseklet: number;

    get telepules(): string {
        return this.#telepules;
    }

    get ido(): string {
        return this.#ido;
    }

    get fok(): number {
        return this.#homerseklet;
    }

    get szeliranyErosseg(): string {
        return this.#szeliranyEroseg;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#telepules = m[0];
        this.#ido = m[1];
        this.#szeliranyEroseg = m[2];
        this.#homerseklet = parseInt(m[3]);
    }
}
