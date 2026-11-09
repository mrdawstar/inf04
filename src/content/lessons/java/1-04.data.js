export const meta = {
  id: '1.4',
  minutes: 30,
  summary: 'Wczytywanie danych klasą Scanner, pułapka nextInt + nextLine, przecinek w liczbach, printf i String.format.',
  keywords: ['Scanner', 'nextInt', 'nextLine', 'nextDouble', 'next', 'printf', 'String.format', '%d', '%.2f', '%s', 'Locale', 'wejście', 'wyjście'],
}

export const quiz = [
  { q: 'Użytkownik wpisuje „Jan Kowalski”. Co zwróci sc.next()?', options: ['„Jan Kowalski”', '„Jan”', '„Kowalski”', 'Pusty napis'], answer: 1, explain: 'next() czyta jedno słowo, do pierwszej spacji. Całą linię czyta nextLine().' },
  { q: 'Co wypisze printf("%.2f", 3.14159)?', options: ['3.14159', '3.14', '3.1', '3'], answer: 1, explain: '%.2f = liczba rzeczywista z dwoma miejscami po przecinku. Na polskim systemie zobaczysz 3,14.' },
  { q: 'Po sc.nextInt() wywołujesz sc.nextLine() i dostajesz pusty napis. Dlaczego?', options: ['Scanner jest zepsuty', 'nextInt nie zabiera Entera z bufora, a nextLine czyta do najbliższego Entera', 'Trzeba użyć next()', 'Brakuje import java.util.Scanner'], answer: 1, explain: 'Enter po liczbie zostaje w buforze. Wywołaj dodatkowe sc.nextLine(), żeby go „zjeść”.' },
  { q: 'Który znacznik formatu wypisze liczbę całkowitą?', options: ['%s', '%f', '%d', '%c'], answer: 2, explain: '%d = decimal (liczba całkowita), %f = liczba rzeczywista, %s = napis, %c = znak.' },
]

export const flashcards = [
  { q: 'Trzy linie potrzebne, żeby wczytać liczbę z klawiatury?', a: '```\nimport java.util.Scanner;          // nad klasą\nScanner sc = new Scanner(System.in);\nint liczba = sc.nextInt();\n```' },
  { q: '`next()` a `nextLine()`?', a: '`next()` czyta jedno słowo (do spacji). `nextLine()` czyta całą linię (do Entera).' },
  { q: 'Jak naprawić pusty `nextLine()` po `nextInt()`?', a: 'Dodaj puste `sc.nextLine();` zaraz po `nextInt()`, żeby zabrać Enter z bufora.' },
  { q: 'Format: liczba z 2 miejscami po przecinku?', a: '`System.out.printf("%.2f%n", x);` albo `String.format("%.2f", x)`' },
  { q: 'Dlaczego `nextDouble()` nie przyjmuje „1.80”?', a: 'Na polskim systemie Scanner oczekuje przecinka: „1,80”. Rozwiązanie: wpisuj z przecinkiem albo ustaw `sc.useLocale(Locale.US);`' },
]
