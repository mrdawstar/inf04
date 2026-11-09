export const meta = {
  id: '1.11',
  minutes: 45,
  summary: 'Konstruktory bezparametrowe, z parametrami i kopiujące, this(...), pola i metody static, licznik instancji, stałe.',
  keywords: ['konstruktor', 'bezparametrowy', 'kopiujący', 'this()', 'przeciążanie konstruktorów', 'static', 'pole statyczne', 'licznik instancji', 'metoda statyczna', 'final', 'stała'],
}

export const quiz = [
  { q: 'Kiedy Java sama dodaje pusty konstruktor bezparametrowy?', options: ['Zawsze', 'Tylko gdy w klasie nie napisano żadnego konstruktora', 'Tylko w klasach public', 'Nigdy'], answer: 1, explain: 'Gdy napiszesz własny konstruktor (np. z parametrami), domyślny znika i new Klasa() przestaje się kompilować.' },
  { q: 'Pole static int licznik w klasie Kosc:', options: ['każda kość ma własną kopię', 'jest jedno, wspólne dla wszystkich obiektów Kosc', 'nie może się zmieniać', 'jest dostępne tylko w konstruktorze'], answer: 1, explain: 'static = należy do klasy. Idealne do liczenia, ile obiektów utworzono.' },
  { q: 'Co wypisze kod?', code: 'class A {\n    static int n = 0;\n    A() { n++; }\n}\n// main:\nnew A(); new A(); new A();\nSystem.out.println(A.n);', options: ['0', '1', '3', 'błąd'], answer: 2, explain: 'Każdy konstruktor zwiększa to samo, wspólne pole.' },
  { q: 'Gdzie musi stać wywołanie this(...) w konstruktorze?', options: ['Gdziekolwiek', 'Na końcu', 'Jako pierwsza instrukcja', 'Poza klasą'], answer: 2, explain: 'Delegowanie do innego konstruktora musi być pierwszą linią, zanim cokolwiek innego się wykona.' },
]

export const flashcards = [
  { q: 'Trzy rodzaje konstruktorów z arkuszy INF.04?', a: 'Bezparametrowy `Osoba()`, z parametrami `Osoba(int id, String imie)`, kopiujący `Osoba(Osoba inna)`.' },
  { q: 'Licznik instancji: jak?', a: '```\nprivate static int liczbaInstancji = 0;\n// w KAŻDYM konstruktorze:\nliczbaInstancji++;\n```' },
  { q: 'Konstruktor kopiujący?', a: '```\npublic Osoba(Osoba inna) {\n    this.id = inna.id;\n    this.imie = inna.imie;\n}\n```' },
  { q: 'Czego nie może metoda static?', a: 'Nie ma `this`, więc nie widzi zwykłych (niestatycznych) pól i metod obiektu. Wywołujesz ją przez nazwę klasy: `Math.max(a, b)`.' },
  { q: 'Stała klasowa?', a: '`public static final int MAX_OCZEK = 6;` (wspólna i niezmienna)' },
]
