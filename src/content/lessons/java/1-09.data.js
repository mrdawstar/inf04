export const meta = {
  id: '1.9',
  minutes: 45,
  summary: 'Metody klasy String, znaki char i ich kody, Character, zamiana tekstu na liczbę, StringBuilder, walidacja napisów.',
  keywords: ['String', 'char', 'charAt', 'length', 'substring', 'indexOf', 'equals', 'split', 'StringBuilder', 'parseInt', 'Character', 'ASCII', 'toUpperCase', 'palindrom', 'email', 'kod pocztowy'],
}

export const quiz = [
  { q: 'Co zwróci "programista".substring(3, 7)?', options: ['„gram”', '„gra”', '„ogram”', '„grami”'], answer: 0, explain: 'substring(od, do) bierze znaki od indeksu 3 włącznie do 7 wyłącznie: g(3) r(4) a(5) m(6).' },
  { q: 'Ile wynosi \'7\' - \'0\'?', options: ['„70”', '7', '55', 'błąd'], answer: 1, explain: 'Znaki to w środku liczby (kody). Cyfry mają kolejne kody, więc różnica daje wartość cyfry: 7.' },
  { q: 'Co wypisze kod?', code: 'String s = "kot";\ns.toUpperCase();\nSystem.out.println(s);', options: ['KOT', 'kot', 'Kot', 'błąd'], answer: 1, explain: 'String jest niezmienny. toUpperCase() tworzy NOWY napis, który tu przepadł. Trzeba: s = s.toUpperCase();' },
  { q: 'Co zwróci "Ala ma kota".indexOf(\'x\')?', options: ['0', '-1', 'null', 'wyjątek'], answer: 1, explain: 'indexOf zwraca -1, gdy szukanego znaku albo tekstu nie ma.' },
]

export const flashcards = [
  { q: 'Pętla po wszystkich znakach napisu?', a: '```\nfor (int i = 0; i < s.length(); i++) {\n    char c = s.charAt(i);\n}\n```\nNapis: `length()` z nawiasami!' },
  { q: 'Jak zamienić cyfrę-znak na liczbę, a tekst na int?', a: 'Znak: `int cyfra = c - \'0\';`. Cały tekst: `int n = Integer.parseInt("123");`' },
  { q: 'Liczba na tekst?', a: '`String s = String.valueOf(42);` albo `"" + 42`' },
  { q: 'Jak sprawdzić rodzaj znaku?', a: '`Character.isDigit(c)`, `Character.isLetter(c)`, `Character.isUpperCase(c)`, `Character.toUpperCase(c)`' },
  { q: 'Po co StringBuilder?', a: 'Do budowania tekstu kawałek po kawałku (`append`) i odwracania (`reverse()`). Na końcu `toString()`.' },
  { q: 'Jak rozbić „Jan Kowalski” na części?', a: '`String[] czesci = s.split(" ");` czesci[0] = „Jan”, czesci[1] = „Kowalski”.' },
]
