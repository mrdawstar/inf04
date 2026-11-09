export const meta = {
  id: '1.7',
  minutes: 40,
  summary: 'Tablice jednowymiarowe i dwuwymiarowe, indeksy, length, wypełnianie pętlą, for-each, tablica liczników, referencje.',
  keywords: ['tablica', 'array', 'indeks', 'length', 'new int', 'for-each', 'Arrays.toString', 'ArrayIndexOutOfBoundsException', 'dwuwymiarowa', 'liczniki', 'referencja'],
}

export const quiz = [
  { q: 'Tablica ma 10 elementów. Jaki jest indeks ostatniego?', options: ['10', '9', '11', '-1'], answer: 1, explain: 'Indeksy zaczynają się od 0, więc ostatni to length - 1 = 9.' },
  { q: 'Jaką wartość mają elementy tablicy po new int[5]?', options: ['losowe', 'null', '0', 'nie da się odczytać'], answer: 2, explain: 'Tablice liczbowe są wypełniane zerami, boolean falsami, a String wartością null.' },
  { q: 'Co wypisze kod?', code: 'int[] a = {1, 2, 3};\nint[] b = a;\nb[0] = 99;\nSystem.out.println(a[0]);', options: ['1', '99', '0', 'błąd'], answer: 1, explain: 'b = a nie kopiuje tablicy. Obie zmienne wskazują tę samą tablicę w pamięci.' },
  { q: 'Jak poprawnie odczytać rozmiar tablicy t?', options: ['t.length()', 't.size()', 't.length', 'length(t)'], answer: 2, explain: 'W tablicy length to pole, bez nawiasów. Nawiasy ma length() w String, a size() w ArrayList.' },
]

export const flashcards = [
  { q: 'Dwa sposoby utworzenia tablicy?', a: '`int[] t = new int[10];` (10 zer) albo `int[] t = {4, 8, 15};` (od razu z wartościami)' },
  { q: 'Szkielet przejścia po tablicy z indeksem?', a: '```\nfor (int i = 0; i < t.length; i++) {\n    ... t[i] ...\n}\n```' },
  { q: 'Kiedy for-each, a kiedy zwykły for?', a: '`for (int x : t)` tylko do ODCZYTU wszystkich elementów. Gdy potrzebujesz indeksu albo chcesz zmienić element: zwykły `for`.' },
  { q: 'Tablica liczników dla rzutów kostką 1–6?', a: '```\nint[] ile = new int[7];      // indeksy 0..6, zero nieużywane\nfor (int r : rzuty) ile[r]++;\n```' },
  { q: 'Jak szybko wypisać całą tablicę?', a: '`System.out.println(Arrays.toString(t));` (wymaga `import java.util.Arrays;`). Wypisze np. `[4, 8, 15]`.' },
  { q: 'Tablica dwuwymiarowa 3×4?', a: '`int[][] m = new int[3][4];` m[wiersz][kolumna]. Liczba wierszy: `m.length`, kolumn: `m[0].length`.' },
]
