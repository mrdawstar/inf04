export const meta = {
  id: '1.15',
  minutes: 35,
  summary: 'Losowanie z dowolnego zakresu (Random, Math.random), ziarno, losowy element tablicy, metody Math i zaokrąglanie.',
  keywords: ['Random', 'nextInt', 'losowanie', 'zakres', 'Math.random', 'ziarno', 'seed', 'Math', 'pow', 'sqrt', 'round', 'abs', 'max', 'min', 'ceil', 'floor', 'zaokrąglanie', 'kostka'],
}

export const quiz = [
  { q: 'Jakie wartości zwraca r.nextInt(6)?', options: ['1–6', '0–6', '0–5', '1–5'], answer: 2, explain: 'nextInt(n) daje od 0 do n-1. Dla kostki trzeba dodać 1: r.nextInt(6) + 1.' },
  { q: 'Które wyrażenie losuje liczbę całkowitą z przedziału 10–20 włącznie?', options: ['r.nextInt(20) + 10', 'r.nextInt(11) + 10', 'r.nextInt(10) + 10', 'r.nextInt(20 - 10)'], answer: 1, explain: 'Liczba możliwych wartości to max - min + 1 = 11, a przesunięcie to min = 10.' },
  { q: 'Jaki typ zwraca Math.pow(2, 3)?', options: ['int', 'long', 'double', 'float'], answer: 2, explain: 'Math.pow zawsze zwraca double (8.0). Do int trzeba rzutować: (int) Math.pow(2, 3).' },
  { q: 'Ile wynosi Math.round(2.5)?', options: ['2', '3', '2.5', '3.0'], answer: 1, explain: 'round zaokrągla „połówki” w górę i zwraca liczbę całkowitą (long).' },
]

export const flashcards = [
  { q: 'Wzór na losową liczbę całkowitą z przedziału [min, max]?', a: '`r.nextInt(max - min + 1) + min`' },
  { q: 'Rzut kostką na dwa sposoby?', a: '`new Random().nextInt(6) + 1` albo `(int) (Math.random() * 6) + 1`' },
  { q: 'Losowy element tablicy t?', a: '`t[r.nextInt(t.length)]`' },
  { q: 'Zaokrąglenie do 2 miejsc po przecinku (jako liczba)?', a: '`Math.round(x * 100) / 100.0` (do wypisania wystarczy `printf("%.2f", x)`)' },
  { q: 'Po co ziarno `new Random(42)`?', a: 'Ten sam „losowy” ciąg przy każdym uruchomieniu. Przydaje się w testach i przy szukaniu błędów.' },
  { q: 'Math: wartość bezwzględna, potęga, pierwiastek, zaokrąglenia?', a: '`Math.abs`, `Math.pow`, `Math.sqrt`, `Math.round` (najbliższa), `Math.floor` (w dół), `Math.ceil` (w górę)' },
]
