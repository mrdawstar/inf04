import { PageTitle } from '../components/ui'

const SESSIONS = [
  ['2021-06 / 2022-01', 'klasa z tablicą, max, sortowanie przez wybieranie malejąco', 'mobilna: rejestracja (e-mail z @, zgodne hasła)'],
  ['2022-06', 'wyszukiwanie z wartownikiem', 'mobilna: licznik polubień'],
  ['2023-01', 'NWD Euklidesa', 'desktop: dodaj pracownika, generator haseł, drugie okno'],
  ['2023-06', 'sito Eratostenesa', 'desktop: nadaj przesyłkę (radio, obraz, cena, kod pocztowy)'],
  ['2024-01', 'walidacja PESEL (płeć, suma kontrolna)', 'desktop: dane do paszportu'],
  ['2024-06', 'gra w kości (zliczanie powtórzeń)', 'mobilna: kości z obrazami, wynik, reset'],
  ['2025-01', 'klasa z tablicą: wypisz, szukaj, nieparzyste, średnia', 'web (React/Angular): galeria z filtrami, dane z pliku'],
  ['2025-06', 'lotto: losowanie bez powtórzeń, zliczanie', 'desktop: suwaki RGB'],
  ['2026-01', 'klasa Kosc (static, dwa konstruktory)', 'mobilna: kości z przezroczystością + testy jednostkowe'],
]

const SOURCES = [
  ['Egzamin zawodowy: zasady (ZPE, gov.pl)', 'https://zpe.gov.pl/a/egzamin-zawodowy/DOg0XjgOj'],
  ['INF.04 2026 styczeń: zasady oceniania', 'https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf'],
  ['INF.04 2025 czerwiec: zasady oceniania', 'https://arkusze.pl/zawodowy/inf04-2025-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf'],
  ['INF.04 2024 czerwiec: arkusz', 'https://zawodowe.edu.pl/arkusz-praktyczny/inf04-2024-czerwiec-01/arkusz.pdf'],
  ['INF.04: wyposażenie stanowisk 2021–2023 (OKE Warszawa)', 'https://oke.waw.pl/wp-content/uploads/OKE_WARSZAWA/EZ/EZ_2019/Informatory_Wyposażenie_ośrodków_2019/Wyposażenie_2020_2021/INF.04_wyp_2021-2023_dk.pdf'],
  ['Archiwum arkuszy i kluczy INF.04 (zawodowe.edu.pl)', 'https://zawodowe.edu.pl/arkusz-praktyczny/inf04-2025-styczen-01/klucz-odpowiedzi.pdf'],
]

export default function About() {
  return (
    <div className="prose-lesson">
      <PageTitle eyebrow="Fakty" title="Jak wygląda INF.04">
        Na podstawie zasad oceniania i arkuszy CKE z lat 2021–2026. Stan na listopad 2026.
      </PageTitle>

      <div className="grid grid-cols-2 gap-2 !mt-0">
        {[
          ['40 pytań', 'test, 60 min, 4 odpowiedzi'],
          ['50%', 'próg części pisemnej'],
          ['180 min', 'część praktyczna + 10 min na czytanie'],
          ['75%', 'próg części praktycznej'],
        ].map(([b, s]) => (
          <div key={b} className="rounded-2xl border border-line bg-surface p-3">
            <div className="text-2xl font-extrabold">{b}</div>
            <div className="text-sm text-muted">{s}</div>
          </div>
        ))}
      </div>

      <h2>Część praktyczna</h2>
      <ul>
        <li>
          Zawsze trzy rzeczy: <strong>aplikacja konsolowa</strong>, <strong>jedna aplikacja z GUI</strong> i <strong>dokumentacja</strong>.
        </li>
        <li>
          Rodzaj GUI (mobilna, desktopowa albo webowa) <strong>narzuca arkusz</strong>. Ty wybierasz tylko technologię, w której ją zrobisz. Dlatego trzeba umieć wszystkie trzy.
        </li>
        <li>Konsola: C++, C#, Java albo Python. Podejście strukturalne albo obiektowe, ale bez zmiennych globalnych.</li>
        <li>Ocenie podlegają cztery rezultaty: jakość kodu i uruchomienie (R.1), konsola (R.2), GUI (R.3), dokumentacja i testy (R.4).</li>
        <li>R.1 sprawdza czytelność, wcięcia, znaczące nazwy (nazwy typu <code>x</code> czy <code>tab</code> nie przechodzą), sensowne typy i zrozumiałe komunikaty. Cecha musi wystąpić w co najmniej 90% kodu.</li>
        <li>Dokumentacja: komentarz nad funkcją według wzoru (nazwa, opis, parametry, zwracany typ, autor), zrzuty całego ekranu z paskiem zadań i środowiskiem, plik „egzamin” (system, IDE, języki, emulator), foldery z projektami w zip na płycie.</li>
        <li>
          <strong>Styczeń 2026:</strong> pierwszy raz w arkuszu pojawiły się testy jednostkowe (metoda testowa z asercją, test zakresu, test zależny od danych, zrzut).
        </li>
        <li>W Android Studio dozwolony jest Java albo Kotlin. W arkuszach emulator to np. Pixel 5, a kolory podaje się z kanałem alfa (#AARRGGBB).</li>
      </ul>

      <h2>Co było w arkuszach</h2>
      <div className="table-wrap rounded-xl border border-line bg-surface">
      <table>
        <thead>
          <tr>
            <th>Sesja</th>
            <th>Konsola</th>
            <th>GUI</th>
          </tr>
        </thead>
        <tbody>
          {SESSIONS.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <h2>Czego nie wiem na pewno</h2>
      <ul>
        <li>Nie znalazłem arkusza z czerwca 2026.</li>
        <li>Najnowsza lista oprogramowania OKE, do której dotarłem, dotyczy lat 2021–2023. Przed egzaminem zapytaj w szkole, jakie IDE i wersje będą na stanowisku.</li>
        <li>Nie wiadomo, czy testy jednostkowe zostaną na stałe. Ćwiczymy je na wszelki wypadek.</li>
      </ul>

      <h2>Źródła</h2>
      <ul>
        {SOURCES.map(([t, u]) => (
          <li key={u}>
            <a href={u} target="_blank" rel="noreferrer">
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
