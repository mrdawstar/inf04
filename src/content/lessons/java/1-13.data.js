export const meta = {
  id: '1.13',
  minutes: 40,
  summary: 'Kolekcje o zmiennym rozmiarze: ArrayList (add, get, remove, contains), klasy opakowujące, Collections, HashMap do zliczania.',
  keywords: ['ArrayList', 'lista', 'kolekcja', 'add', 'get', 'remove', 'size', 'contains', 'Integer', 'Collections.sort', 'HashMap', 'mapa', 'getOrDefault', 'dynamiczny rozmiar', 'lotto'],
}

export const quiz = [
  { q: 'Jak sprawdzić liczbę elementów listy lista?', options: ['lista.length', 'lista.length()', 'lista.size()', 'lista.count()'], answer: 2, explain: 'Lista „liczy” się metodą size().' },
  { q: 'Lista zawiera [10, 20, 30]. Co da lista.remove(1)?', options: ['usunie wartość 1 (nic się nie stanie)', 'usunie element o indeksie 1, czyli 20', 'usunie 10', 'błąd kompilacji'], answer: 1, explain: 'Dla ArrayList<Integer> remove(int) usuwa po indeksie. Aby usunąć wartość, napisz remove(Integer.valueOf(1)).' },
  { q: 'Dlaczego ArrayList<int> się nie skompiluje?', options: ['int jest za mały', 'kolekcje przechowują tylko obiekty, więc trzeba użyć Integer', 'trzeba napisać ArrayList[int]', 'ArrayList nie przechowuje liczb'], answer: 1, explain: 'Typy proste mają „opakowania”: Integer, Double, Boolean, Character. Java sama zamienia int ↔ Integer (autoboxing).' },
  { q: 'Co zwróci mapa.getOrDefault("kot", 0), gdy klucza "kot" nie ma?', options: ['null', '0', 'wyjątek', '"kot"'], answer: 1, explain: 'getOrDefault zwraca podaną wartość domyślną, gdy klucza brak. Idealne do liczenia wystąpień.' },
]

export const flashcards = [
  { q: 'Utworzenie listy liczb i dodanie elementu?', a: '```\nArrayList<Integer> lista = new ArrayList<>();\nlista.add(5);\n```\n(import `java.util.ArrayList`)' },
  { q: 'Odczyt, zmiana, usunięcie, rozmiar w ArrayList?', a: '`get(i)`, `set(i, wartosc)`, `remove(i)`, `size()`' },
  { q: 'Losowanie bez powtórzeń z listą?', a: '```\nwhile (lista.size() < 6) {\n    int los = r.nextInt(49) + 1;\n    if (!lista.contains(los)) lista.add(los);\n}\n```' },
  { q: 'Sortowanie listy?', a: '`Collections.sort(lista);` (rosnąco). Max/min: `Collections.max(lista)`, `Collections.min(lista)`.' },
  { q: 'Zliczanie wystąpień w HashMap?', a: '```\nmapa.put(slowo, mapa.getOrDefault(slowo, 0) + 1);\n```' },
  { q: 'Tablica czy ArrayList?', a: 'Tablica: znany, stały rozmiar (5 kostek). ArrayList: rozmiar zmienia się w trakcie (dodawanie, usuwanie, nie wiadomo ile).' },
]
