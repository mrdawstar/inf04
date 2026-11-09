export const meta = {
  id: '1.8',
  minutes: 40,
  summary: 'Definiowanie i wywoływanie metod, parametry, return, void, zasięg zmiennych, przekazywanie tablic, przeciążanie.',
  keywords: ['metoda', 'funkcja', 'return', 'void', 'parametr', 'argument', 'static', 'zasięg', 'przeciążanie', 'overloading', 'zmienna globalna'],
}

export const quiz = [
  { q: 'Co oznacza słowo void w nagłówku metody?', options: ['Metoda jest pusta', 'Metoda nic nie zwraca', 'Metoda nie ma parametrów', 'Metoda jest prywatna'], answer: 1, explain: 'void = brak wartości zwracanej. Metoda coś robi (np. wypisuje), ale nie oddaje wyniku.' },
  { q: 'Co wypisze kod?', code: 'static void zwieksz(int x) { x = x + 10; }\n// w main:\nint a = 5;\nzwieksz(a);\nSystem.out.println(a);', options: ['15', '5', '10', 'błąd'], answer: 1, explain: 'Do metody trafia KOPIA wartości a. Zmiana x nie zmienia a w main.' },
  { q: 'Co wypisze kod?', code: 'static void zeruj(int[] t) { t[0] = 0; }\n// w main:\nint[] a = {7, 8};\nzeruj(a);\nSystem.out.println(a[0]);', options: ['7', '0', '8', 'błąd'], answer: 1, explain: 'Tablica przekazywana jest jako referencja (adres), więc metoda zmienia tę samą tablicę.' },
  { q: 'Które dwie metody mogą istnieć razem w jednej klasie (przeciążanie)?', options: ['int pole(int a) i double pole(int a)', 'int pole(int a) i int pole(int a, int b)', 'int pole(int a) i int pole(int b)', 'void pole() i int pole()'], answer: 1, explain: 'Przeciążone metody muszą różnić się listą parametrów. Sam typ zwracany albo nazwa parametru nie wystarczy.' },
]

export const flashcards = [
  { q: 'Anatomia metody `static int suma(int[] t)`?', a: '`static` (wywołasz z main bez obiektu), `int` (typ wyniku), `suma` (nazwa: czasownik), `int[] t` (parametr). W środku musi być `return`.' },
  { q: 'Parametr a argument?', a: 'Parametr to „puste miejsce” w definicji (`int x`). Argument to konkretna wartość przy wywołaniu (`kwadrat(5)`).' },
  { q: 'Co się dzieje z int, a co z tablicą przekazaną do metody?', a: 'int: metoda dostaje kopię, oryginał się nie zmieni. Tablica: metoda dostaje adres, zmiany są widoczne na zewnątrz.' },
  { q: 'Szkielet metody sprawdzającej warunek?', a: '```\nstatic boolean czyParzysta(int n) {\n    return n % 2 == 0;\n}\n```' },
  { q: 'Dlaczego na egzaminie nie używa się zmiennych globalnych?', a: 'Arkusze wprost tego zabraniają w podejściu strukturalnym. Dane przekazuj parametrami, a wyniki zwracaj przez `return`.' },
]
