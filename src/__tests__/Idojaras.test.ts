import Idojaras from "../Idojaras";

describe("Időjárás osztály tesztelése", () => {
    const adat = new Idojaras("BP 1123 VRB02 23");
    it("idojárás osztálypéldányok ellenőrzése", async () => {
        expect(adat).toBeInstanceOf(Idojaras);
    });
    it("település tesztelése", async () => {
        expect(adat.telepules).toBe("BP");
    });
    it("idő tesztelése", async () => {
        expect(adat.ido).toBe("1123");
    });
    it("fok tesztelése", async () => {
        expect(adat.fok).toBe(23);
    });
    it("szél írány tesztelése", async () => {
        expect(adat.szeliranyErosseg).toBe("VRB02");
    });
});
