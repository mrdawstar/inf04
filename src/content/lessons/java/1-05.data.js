export const meta = {
  id: '1.5',
  minutes: 30,
  summary: 'if, else if, else, zagnieżdżanie, switch w dwóch wersjach, operator ?: i porównywanie napisów.',
  keywords: ['if', 'else', 'else if', 'switch', 'case', 'break', 'default', 'warunek', 'trójargumentowy', '?:', 'equals'],
}

export const quiz = [
  { q: 'Co wypisze kod dla x = 7?', code: 'if (x > 5) System.out.print("A");\nelse if (x > 3) System.out.print("B");\nelse System.out.print("C");', options: ['AB', 'A', 'B', 'ABC'], answer: 1, explain: 'W łańcuchu else if wykonuje się tylko pierwsza pasująca gałąź. 7 > 5, więc A, a reszta jest pomijana.' },
  { q: 'Co wypisze kod?', code: 'int x = 2;\nswitch (x) {\n    case 1: System.out.print("a");\n    case 2: System.out.print("b");\n    case 3: System.out.print("c");\n}', options: ['b', 'bc', 'abc', 'nic'], answer: 1, explain: 'W klasycznym switchu bez break wykonanie „przelatuje” do kolejnych case. Zaczyna od case 2 i leci dalej.' },
  { q: 'Jaką wartość ma s?', code: 'int n = 4;\nString s = n % 2 == 0 ? "parzysta" : "nieparzysta";', options: ['„parzysta”', '„nieparzysta”', 'true', 'Błąd kompilacji'], answer: 0, explain: 'warunek ? wartośćGdyTak : wartośćGdyNie. 4 % 2 == 0 jest prawdą.' },
  { q: 'Jak poprawnie sprawdzić, czy napis odp jest równy "t"?', options: ['odp == "t"', 'odp = "t"', 'odp.equals("t")', 'odp.equals(t)'], answer: 2, explain: '== porównuje, czy to ten sam obiekt w pamięci, a nie treść. Treść porównuje equals.' },
]

export const flashcards = [
  { q: 'Szkielet łańcucha warunków?', a: '```\nif (warunek1) {\n    ...\n} else if (warunek2) {\n    ...\n} else {\n    ...\n}\n```\nWykona się tylko pierwsza pasująca gałąź.' },
  { q: 'Do czego służy `break` w klasycznym switchu?', a: 'Kończy switch. Bez `break` wykonanie „przelatuje” do następnego case.' },
  { q: 'Switch w nowej składni (strzałki)?', a: '```\nswitch (dzien) {\n    case 6, 7 -> System.out.println("weekend");\n    default -> System.out.println("dzień roboczy");\n}\n```\nNie potrzebuje break.' },
  { q: 'Operator trójargumentowy?', a: '`warunek ? jeśliTak : jeśliNie`, np. `int max = a > b ? a : b;`' },
  { q: 'Dlaczego `if (x > 5);` to błąd?', a: 'Średnik kończy if. Blok pod spodem wykona się zawsze, niezależnie od warunku.' },
]
