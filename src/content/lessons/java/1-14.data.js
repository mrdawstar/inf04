export const meta = {
  id: '1.14',
  minutes: 35,
  summary: 'Czym jest wyjątek, jak czytać stack trace, try/catch/finally, najczęstsze wyjątki, throw i odporne wczytywanie danych.',
  keywords: ['wyjątek', 'exception', 'try', 'catch', 'finally', 'throw', 'stack trace', 'NumberFormatException', 'InputMismatchException', 'ArithmeticException', 'NullPointerException', 'walidacja', 'hasNextInt'],
}

export const quiz = [
  { q: 'Co wypisze kod?', code: 'try {\n    System.out.print("1");\n    int x = 5 / 0;\n    System.out.print("2");\n} catch (ArithmeticException e) {\n    System.out.print("3");\n} finally {\n    System.out.print("4");\n}', options: ['1234', '134', '14', '124'], answer: 1, explain: 'Po wyjątku reszta bloku try jest pomijana (bez 2), catch wypisuje 3, a finally wykonuje się zawsze.' },
  { q: 'Jaki wyjątek rzuci Integer.parseInt("12a")?', options: ['ArithmeticException', 'NumberFormatException', 'NullPointerException', 'Żaden, zwróci 12'], answer: 1, explain: 'Tekst nie jest poprawną liczbą. To najczęstszy wyjątek w aplikacjach z polami tekstowymi.' },
  { q: 'Kiedy wykonuje się blok finally?', options: ['Tylko gdy był wyjątek', 'Tylko gdy nie było wyjątku', 'Zawsze', 'Nigdy, jest opcjonalny'], answer: 2, explain: 'finally wykonuje się zawsze, niezależnie od tego, czy wystąpił wyjątek.' },
  { q: 'Do czego służy słowo throw?', options: ['Do przechwycenia wyjątku', 'Do samodzielnego zgłoszenia (rzucenia) wyjątku', 'Do zakończenia pętli', 'Do wypisania błędu'], answer: 1, explain: 'np. throw new IllegalArgumentException("Wiek nie może być ujemny");' },
]

export const flashcards = [
  { q: 'Szkielet try/catch?', a: '```\ntry {\n    // kod, który może się wywrócić\n} catch (NumberFormatException e) {\n    // co zrobić, gdy się wywróci\n}\n```' },
  { q: 'Pięć najczęstszych wyjątków?', a: '`ArithmeticException` (/0), `ArrayIndexOutOfBoundsException`, `NullPointerException`, `NumberFormatException` (parseInt), `InputMismatchException` (Scanner).' },
  { q: 'Jak czytać stack trace?', a: 'Pierwsza linia: nazwa wyjątku i opis. Szukaj pierwszej linii `at ...` z TWOIM plikiem, np. `Main.java:12`, czyli numer linii z błędem.' },
  { q: 'Pętla odporna na tekst zamiast liczby (Scanner)?', a: '```\nwhile (!sc.hasNextInt()) {\n    System.out.println("To nie liczba!");\n    sc.next();   // wyrzuć złe słowo\n}\nint n = sc.nextInt();\n```' },
  { q: 'Wyjątki sprawdzane a niesprawdzane?', a: 'Sprawdzane (checked, np. IOException) kompilator każe obsłużyć. Niesprawdzane (RuntimeException, np. NullPointer) nie muszą być obsłużone.' },
]
