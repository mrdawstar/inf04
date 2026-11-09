export const meta = {
  id: '1.2',
  minutes: 30,
  summary: 'Zmienne, typy prymitywne, String, nazewnictwo, stałe, rzutowanie i pułapka dzielenia całkowitego.',
  keywords: ['zmienna', 'typ', 'int', 'double', 'boolean', 'char', 'String', 'long', 'rzutowanie', 'cast', 'final', 'camelCase', 'dzielenie całkowite'],
}

export const quiz = [
  { q: 'Jaką wartość ma zmienna wynik?', code: 'double wynik = 7 / 2;', options: ['3.5', '3.0', '4.0', 'Błąd kompilacji'], answer: 1, explain: '7 / 2 to dzielenie dwóch intów, więc wychodzi 3. Dopiero potem 3 trafia do double i staje się 3.0.' },
  { q: 'Który typ najlepiej pasuje do przechowania ceny biletu 4,40 zł?', options: ['int', 'boolean', 'double', 'char'], answer: 2, explain: 'Cena ma część ułamkową, więc double. Na egzaminie R.1.5 sprawdza, czy typy pasują do danych.' },
  { q: 'Co wypisze kod?', code: 'int x = (int) 9.99;\nSystem.out.println(x);', options: ['10', '9', '9.99', 'Błąd kompilacji'], answer: 1, explain: 'Rzutowanie (int) obcina część ułamkową, nie zaokrągla.' },
  { q: 'Która nazwa zmiennej jest zgodna z konwencją Javy i zaliczy kryterium „znaczące nazwy”?', options: ['Liczba_Ocen', 'x', 'liczbaOcen', 'LICZBAOCEN'], answer: 2, explain: 'camelCase: pierwsze słowo małą literą, kolejne wielką. Nazwa x nic nie mówi, a WIELKIE_LITERY są zarezerwowane dla stałych.' },
]

export const flashcards = [
  { q: 'Pięć typów, których używasz najczęściej, i do czego?', a: '`int` liczby całkowite, `double` ułamki, `boolean` true/false, `char` jeden znak (w apostrofach), `String` tekst (w cudzysłowach).' },
  { q: 'Ile wynosi `5 / 2` w Javie, a ile `5 / 2.0`?', a: '`5 / 2` = 2 (dzielenie całkowite). `5 / 2.0` = 2.5, bo jedna liczba jest double.' },
  { q: 'Jak zamienić miejscami wartości zmiennych a i b?', a: '```\nint tmp = a;\na = b;\nb = tmp;\n```' },
  { q: 'Jak zrobić stałą w Javie?', a: '`final double VAT = 0.23;`. Słowo `final` blokuje zmianę wartości. Nazwy stałych piszemy WIELKIMI_LITERAMI.' },
  { q: 'Rzutowanie niejawne a jawne?', a: 'Niejawne: mniejszy typ do większego robi się samo (`double d = 5;`). Jawne: z większego do mniejszego musisz napisać `(int) 3.7` i tracisz część ułamkową.' },
]
