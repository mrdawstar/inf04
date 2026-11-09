// Próbne arkusze praktyczne. Treść jest napisana od zera, ale układ, czas
// i kryteria naśladują prawdziwe arkusze INF.04 (np. styczeń 2026: konsola + mobilna + testy).

export const COMMON_CHECKLIST = {
  title: 'Jakość kodu (R.1, liczy się w każdym arkuszu)',
  items: [
    'Każda instrukcja w osobnej linii, spacje wokół operatorów, klamry w jednym stylu',
    'Wcięcia w każdym zagnieżdżonym bloku (Ctrl+Alt+L w IntelliJ / Android Studio)',
    'Nazwy metod mówią, co robią (np. obliczCene, nie metoda1)',
    'Nazwy zmiennych mówią, co przechowują (nie x, tab, foo; wyjątek: i, j w pętli)',
    'Typy pasują do danych (cena = double, licznik = int, flaga = boolean)',
    'Komunikaty dla użytkownika są zrozumiałe („Podaj strefę (1–3):”, a nie „>”)',
  ],
}

export const EXAMS = [
  {
    id: 'p1',
    title: 'Próbny arkusz 1: Bilet komunikacji',
    gui: 'mobilna',
    when: 'Po działach 1, 3, 2 i 6. Teraz możesz go przeczytać i zobaczyć, do czego zmierzasz.',
    minutes: 180,
    milestones: [
      { at: 60, label: 'konsola gotowa' },
      { at: 135, label: 'aplikacja mobilna gotowa' },
      { at: 160, label: 'testy i zrzuty' },
      { at: 175, label: 'spakowane foldery' },
    ],
    parts: [
      {
        title: 'Część I. Aplikacja konsolowa',
        body: [
          { p: 'Napisz w Javie klasę `Bilet` opisującą bilet komunikacji miejskiej oraz program, który z niej korzysta.' },
          {
            ul: [
              'Pola publiczne: `numer` (całkowite), `strefa` (całkowite, 1–3 albo 0 dla błędnej), `skasowany` (logiczne) oraz statyczne `liczbaBiletow` (całkowite).',
              'Tablica napisów z nazwami stref: indeks 0 = "brak strefy", 1 = "strefa I", 2 = "strefa II", 3 = "strefa III".',
              'Konstruktor bezparametrowy losuje strefę z zakresu 1–3.',
              'Konstruktor z jednym parametrem całkowitym przypisuje strefę, jeśli mieści się w zakresie 1–3, a w przeciwnym razie 0.',
              'Każdy konstruktor zwiększa `liczbaBiletow` o 1, nadaje biletowi `numer` równy nowej wartości licznika i ustawia `skasowany` na false.',
              'Metoda `cena()` zwraca cenę jako liczbę rzeczywistą: strefa 1 = 4.40, strefa 2 = 6.00, strefa 3 = 7.80, strefa 0 = 0.',
              'Metoda `skasuj()` bez parametrów: jeśli strefa jest różna od 0 i bilet nie był skasowany, ustawia `skasowany` na true i zwraca true. W przeciwnym razie zwraca false.',
              'Metoda `nazwaStrefy()` zwraca nazwę strefy z tablicy.',
            ],
          },
          { p: 'W programie głównym utwórz dwa bilety: pierwszy konstruktorem bezparametrowym, drugi konstruktorem z parametrem wczytanym z klawiatury. Po utworzeniu każdego wypisz liczbę biletów. Dla każdego biletu wypisz numer, strefę liczbą, nazwę strefy i cenę z dwoma miejscami po przecinku. Następnie skasuj każdy bilet dwa razy i wypisz wynik każdej próby.' },
        ],
      },
      {
        title: 'Część II. Aplikacja mobilna (Android Studio, Java)',
        body: [
          { p: 'Aplikacja „Kasownik” ma jeden ekran w układzie liniowym pionowym. Interfejs zapisz w XML, a logikę w Javie.' },
          {
            ul: [
              'Nagłówek „Kasownik, autor: <numer zdającego>”: tło #FF0B3D91, biały tekst, rozmiar 24sp, na całą szerokość.',
              'Trzy przyciski opcji (RadioButton) w jednej grupie: „Strefa I”, „Strefa II”, „Strefa III”. Domyślnie zaznaczona strefa I.',
              'Przycisk „KUP BILET” (kolor tła #FFF2A900), wyśrodkowany, marginesy 10dp.',
              'Pod przyciskiem napis „Do zapłaty: 0.00 zł” o rozmiarze 20sp.',
              'Obraz biletu (dowolna grafika z zasobów drawable) na początku z przezroczystością 0.3.',
              'Kliknięcie „KUP BILET” dodaje cenę zaznaczonej strefy do sumy i pokazuje ją z dwoma miejscami po przecinku. Obraz staje się w pełni widoczny.',
              'Kliknięcie obrazu „kasuje” bilet: obraz wraca do przezroczystości 0.3, a Toast pokazuje „Bilet skasowany”.',
            ],
          },
        ],
      },
      {
        title: 'Część III. Testy i dokumentacja',
        body: [
          {
            ul: [
              'Napisz w JUnit co najmniej dwie metody testowe klasy `Bilet`: (1) bilet z parametrem 5 ma strefę 0 i cenę 0, (2) drugie wywołanie `skasuj()` zwraca false.',
              'Nad metodą `cena()` umieść komentarz w formacie: nazwa, opis, parametry, zwracany typ i opis, autor.',
              'Zrzuty całego ekranu z widocznym paskiem zadań i środowiskiem: konsola1, konsola2…, mobile1, mobile2…, testy1.',
              'Plik „egzamin” (edytor tekstu): system operacyjny, nazwy środowisk, języki programowania, nazwa emulatora.',
              'Folder z numerem zdającego, a w nim: konsolowa (konsola.zip + plik .java), mobilna (mobilna.zip + pliki XML i Java), dokumentacja (zrzuty + egzamin).',
            ],
          },
        ],
      },
    ],
    checklist: [
      {
        title: 'Konsola',
        items: [
          'Klasa Bilet ma 3 pola publiczne + statyczne liczbaBiletow',
          'Tablica nazw stref istnieje i jest używana w nazwaStrefy()',
          'Konstruktor bezparametrowy losuje 1–3',
          'Konstruktor z parametrem daje 0 dla wartości spoza 1–3',
          'Każdy konstruktor zwiększa licznik i ustawia numer oraz skasowany',
          'cena() zwraca double dla wszystkich stref',
          'skasuj() zwraca false przy drugim kasowaniu i dla strefy 0',
          'Program wypisuje licznik po każdym bilecie i wszystkie dane biletów',
        ],
      },
      {
        title: 'Mobilna',
        items: [
          'Układ w XML, LinearLayout pionowy',
          'Kolory nagłówka i przycisku zgodne z treścią (format #AARRGGBB)',
          'RadioGroup z trzema opcjami, pierwsza zaznaczona',
          'KUP BILET dodaje cenę zaznaczonej strefy i formatuje do 2 miejsc',
          'Obraz zmienia przezroczystość po kupnie i po kliknięciu',
          'Toast po kliknięciu obrazu',
          'Aplikacja uruchomiona w emulatorze',
        ],
      },
      {
        title: 'Testy i dokumentacja',
        items: [
          'Dwie metody testowe z asercjami, nazwy mówią, co testują',
          'Zrzut uruchomionych testów (zielone i takie, który zależy od danych)',
          'Komentarz nad cena() ze wszystkimi polami',
          'Zrzuty konsola*, mobile* z całym ekranem i paskiem zadań',
          'Plik egzamin: system, IDE, języki, emulator',
          'Foldery i archiwa zip zgodnie z treścią',
        ],
      },
    ],
  },
]
