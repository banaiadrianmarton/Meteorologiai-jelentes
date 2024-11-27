import Megoldas from "../Megoldas";

describe("Megoldás osztály tesztelése", () => {
    const adat = new Megoldas("tavirathu13.txt");
    it("Megoldás osztálypéldányok ellenőrzése", async () => {
        expect(adat).toBeInstanceOf(Megoldas);
    });
    it("utolsoMeres tesztelése", async () => {
        expect(adat.Utolsomeres("BP")).toBe("Az utolsó mérési adat a megadott településről 23:30-kor érkezett.");
    });
    it("A legmagasabb hőmérsékletet kérdezzük le", async () => {
        expect(adat.HomersekletMagas).toBe("A legmagasabb hőmérséklet: DC 13:15 35 fok.");
    });
    it("A legalacsonyabb hőmérsékletet kérdezzük le", async () => {
        expect(adat.HomersekletAlacsony).toBe("A legalacsonyabb hőmérséklet: SM 23:45 16 fok.");
    });
    it("megnézzük melyik településeken van szélcsönd a megadott órában", async () => {
        expect(adat.Szelcsend()).toEqual([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
    });
    it("Megnézzük a hőmérséklet ingadozását", async () => {
        expect(adat.KozepHomersekletEsIngadozas()).toBe("BP Középhőmérséklet: 23; Hőmérséklet-ingadozás: 8\nDC NA; Hőmérséklet-ingadozás: 15\nSM NA; Hőmérséklet-ingadozás: 8\nPA NA; Hőmérséklet-ingadozás: 7\nSN NA; Hőmérséklet-ingadozás: 13\nPR NA; Hőmérséklet-ingadozás: 8\nBC NA; Hőmérséklet-ingadozás: 14\nPP NA; Hőmérséklet-ingadozás: 6\nKE NA; Hőmérséklet-ingadozás: 13\n");
    });
});
