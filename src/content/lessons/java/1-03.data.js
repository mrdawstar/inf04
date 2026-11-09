export const meta = {
  id: '1.3',
  minutes: 30,
  summary: 'Arytmetyka, reszta z dzielenia, ++ i --, operatory przypisania, porównania i logiczne, kolejność działań.',
  keywords: ['operator', 'modulo', '%', 'reszta', '++', 'inkrementacja', '&&', '||', '!', '==', 'porównanie', 'priorytet', '+='],
}

export const quiz = [
  { q: 'Ile wynosi 17 % 5?', options: ['3', '2', '3.4', '0'], answer: 1, explain: '17 = 3·5 + 2, więc reszta to 2.' },
  { q: 'Co wypisze kod?', code: 'int a = 3;\nint b = a++ + 10;\nSystem.out.println(a + " " + b);', options: ['4 14', '4 13', '3 13', '3 14'], answer: 1, explain: 'a++ najpierw oddaje starą wartość (3), dopiero potem zwiększa a do 4. b = 3 + 10 = 13.' },
  { q: 'Które wyrażenie sprawdza, czy x jest w przedziale od 1 do 6 włącznie?', options: ['1 <= x <= 6', 'x >= 1 || x <= 6', 'x >= 1 && x <= 6', 'x > 1 && x < 6'], answer: 2, explain: 'Oba warunki muszą być spełnione naraz, więc &&. Zapis 1 <= x <= 6 w Javie się nie skompiluje. Z || każda liczba spełniłaby warunek.' },
  { q: 'Jaki jest wynik wyrażenia 2 + 3 * 4?', options: ['20', '14', '24', '9'], answer: 1, explain: 'Mnożenie ma pierwszeństwo przed dodawaniem: 3 · 4 = 12, potem 2 + 12 = 14.' },
]

export const flashcards = [
  { q: 'Jak sprawdzić, czy liczba n jest parzysta?', a: '`n % 2 == 0`' },
  { q: 'Jak wyciągnąć ostatnią cyfrę liczby n i jak ją „odciąć”?', a: 'Ostatnia cyfra: `n % 10`. Liczba bez ostatniej cyfry: `n / 10`.' },
  { q: 'Różnica między `a++` a `++a`?', a: '`a++` najpierw oddaje starą wartość, potem zwiększa. `++a` najpierw zwiększa, potem oddaje nową. W osobnej linii (`a++;`) działają tak samo.' },
  { q: 'Warunek roku przestępnego?', a: '`(rok % 4 == 0 && rok % 100 != 0) || rok % 400 == 0`' },
  { q: '`=` a `==`?', a: '`=` przypisuje (wkłada wartość do zmiennej). `==` porównuje i daje `true` albo `false`.' },
  { q: 'Co znaczą `&&`, `||`, `!`?', a: '`&&` i (oba muszą być prawdziwe), `||` lub (wystarczy jeden), `!` zaprzeczenie.' },
]
