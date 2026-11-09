export const meta = {
  id: '1.6',
  minutes: 40,
  summary: 'for, while, do-while, break, continue, pętle zagnieżdżone i pętla walidująca dane jak w arkuszu 2024.',
  keywords: ['pętla', 'for', 'while', 'do while', 'break', 'continue', 'zagnieżdżona', 'iteracja', 'walidacja', 'nieskończona'],
}

export const quiz = [
  { q: 'Ile razy wykona się ciało pętli?', code: 'for (int i = 0; i < 5; i++) { ... }', options: ['4', '5', '6', 'w nieskończoność'], answer: 1, explain: 'i przyjmuje wartości 0, 1, 2, 3, 4. Dla i = 5 warunek i < 5 jest fałszywy.' },
  { q: 'Która pętla zawsze wykona się co najmniej raz?', options: ['for', 'while', 'do-while', 'for-each'], answer: 2, explain: 'do-while sprawdza warunek dopiero na końcu, po pierwszym przebiegu.' },
  { q: 'Co wypisze kod?', code: 'for (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    if (i == 5) break;\n    System.out.print(i);\n}', options: ['1245', '124', '12', '1234'], answer: 1, explain: 'continue pomija resztę przebiegu dla i = 3, a break kończy pętlę przy i = 5, zanim cokolwiek się wypisze.' },
  { q: 'Ile gwiazdek wypisze kod?', code: 'for (int i = 0; i < 3; i++)\n    for (int j = 0; j < 4; j++)\n        System.out.print("*");', options: ['7', '12', '3', '4'], answer: 1, explain: 'Pętla wewnętrzna wykonuje się w całości (4 razy) przy każdym z 3 przebiegów zewnętrznej: 3 · 4 = 12.' },
]

export const flashcards = [
  { q: 'Szkielet pętli for od 1 do n?', a: '```\nfor (int i = 1; i <= n; i++) {\n    ...\n}\n```\nstart; warunek; krok' },
  { q: 'Kiedy for, a kiedy while?', a: '`for`: znasz liczbę powtórzeń. `while`: powtarzasz, dopóki coś jest prawdą i nie wiesz, ile razy (np. dopóki liczba > 0).' },
  { q: 'Szkielet „pytaj, dopóki dane są złe”?', a: '```\nint n;\ndo {\n    System.out.print("Podaj (3-10): ");\n    n = sc.nextInt();\n} while (n < 3 || n > 10);\n```' },
  { q: '`break` a `continue`?', a: '`break` kończy całą pętlę. `continue` przerywa tylko bieżący przebieg i przechodzi do następnego.' },
  { q: 'Jak odwrócić liczbę 1234 → 4321 pętlą?', a: '```\nint odwrocona = 0;\nwhile (n > 0) {\n    odwrocona = odwrocona * 10 + n % 10;\n    n /= 10;\n}\n```' },
]
