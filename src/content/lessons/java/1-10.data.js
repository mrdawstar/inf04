export const meta = {
  id: '1.10',
  minutes: 45,
  summary: 'Klasa jako projekt, obiekt jako egzemplarz: pola, metody, new, this, private, gettery i settery, toString, referencje i null.',
  keywords: ['klasa', 'obiekt', 'instancja', 'pole', 'metoda', 'new', 'this', 'private', 'public', 'getter', 'setter', 'toString', 'hermetyzacja', 'referencja', 'null', 'NullPointerException'],
}

export const quiz = [
  { q: 'Czym jest obiekt?', options: ['Plikiem z kodem', 'Konkretnym egzemplarzem utworzonym na podstawie klasy', 'Metodą statyczną', 'Typem prostym'], answer: 1, explain: 'Klasa to projekt (foremka), obiekt to konkretna rzecz zrobiona według projektu (ciastko).' },
  { q: 'Do czego służy this.imie = imie; w konstruktorze?', options: ['Porównuje dwa imiona', 'Przypisuje parametr imie do pola imie obiektu', 'Tworzy nową zmienną', 'Wywołuje metodę imie()'], answer: 1, explain: 'this.imie to pole obiektu, a samo imie to parametr o tej samej nazwie.' },
  { q: 'Co wypisze kod?', code: 'Licznik a = new Licznik();\nLicznik b = a;\nb.wartosc = 5;\nSystem.out.println(a.wartosc);', options: ['0', '5', 'null', 'błąd'], answer: 1, explain: 'b = a kopiuje adres, a nie obiekt. Obie zmienne wskazują ten sam obiekt.' },
  { q: 'Pole oznaczone private:', options: ['jest widoczne wszędzie', 'jest dostępne tylko wewnątrz swojej klasy', 'nie może się zmienić', 'jest wspólne dla wszystkich obiektów'], answer: 1, explain: 'To hermetyzacja. Z zewnątrz dostęp daje się przez metody (gettery i settery).' },
]

export const flashcards = [
  { q: 'Klasa a obiekt, jednym zdaniem?', a: 'Klasa to projekt (np. „Pies”), obiekt to konkretny egzemplarz utworzony przez `new` (np. Burek).' },
  { q: 'Szkielet klasy z polem prywatnym, getterem i setterem?', a: '```\nclass Osoba {\n    private String imie;\n    public String getImie() { return imie; }\n    public void setImie(String imie) { this.imie = imie; }\n}\n```' },
  { q: 'Po co `toString()`?', a: 'Określa, jak obiekt wygląda w `println(obiekt)`. Bez niego zobaczysz coś w stylu `Osoba@1b6d3586`.' },
  { q: 'Co znaczy `NullPointerException`?', a: 'Wywołałeś metodę albo pole na zmiennej, która nie wskazuje żadnego obiektu (`null`). Zwykle zapomniane `new`.' },
  { q: 'Skrót IntelliJ do generowania getterów, setterów, konstruktora, toString?', a: '`Alt+Insert` (Generate). Na macOS `Cmd+N`.' },
]
