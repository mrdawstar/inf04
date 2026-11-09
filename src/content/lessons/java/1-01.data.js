export const meta = {
  id: '1.1',
  minutes: 25,
  summary: 'Szkielet programu, main, kompilacja, println, komentarze, pierwsze kroki w IntelliJ.',
  keywords: ['main', 'klasa', 'kompilacja', 'javac', 'JVM', 'println', 'print', 'komentarz', 'IntelliJ', 'psvm', 'sout'],
}

export const quiz = [
  {
    q: 'Od której metody zaczyna się wykonywanie programu w Javie?',
    options: ['start()', 'main()', 'run()', 'Od pierwszej linii pliku, niezależnie od metody'],
    answer: 1,
    explain: 'JVM szuka metody public static void main(String[] args) i od niej zaczyna.',
  },
  {
    q: 'Co wypisze ten kod?',
    code: 'System.out.print("A");\nSystem.out.println("B");\nSystem.out.print("C");',
    options: ['A B C w trzech liniach', 'AB, a w nowej linii C', 'ABC w jednej linii', 'A, a w nowej linii BC'],
    answer: 1,
    explain: 'print nie przechodzi do nowej linii, println przechodzi po wypisaniu. Więc „AB”, enter, „C”.',
  },
  {
    q: 'Plik zawiera „public class Kalkulator”. Jak musi się nazywać?',
    options: ['Main.java', 'kalkulator.java', 'Kalkulator.java', 'Dowolnie, byle z końcówką .java'],
    answer: 2,
    explain: 'Klasa publiczna musi być w pliku o identycznej nazwie, łącznie z wielkością liter.',
  },
  {
    q: 'Co robi polecenie javac?',
    options: ['Uruchamia program', 'Kompiluje plik .java do kodu bajtowego .class', 'Instaluje Javę', 'Formatuje kod'],
    answer: 1,
    explain: 'javac = Java Compiler. Program uruchamia potem polecenie java (maszyna wirtualna JVM).',
  },
]

export const flashcards = [
  { q: 'Napisz z pamięci szkielet programu w Javie.', a: '```\npublic class Main {\n    public static void main(String[] args) {\n        // tu instrukcje\n    }\n}\n```' },
  { q: 'Różnica między `print` a `println`?', a: '`println` po wypisaniu przechodzi do nowej linii, `print` zostaje w tej samej.' },
  { q: 'Trzy rodzaje komentarzy w Javie?', a: '`// jedna linia`, `/* wiele linii */`, `/** dokumentacyjny (Javadoc) */`' },
  { q: 'Skróty IntelliJ: jak szybko wpisać main i println?', a: '`psvm` (albo `main`) + Tab tworzy metodę main. `sout` + Tab wpisuje `System.out.println();`' },
  { q: 'Co to jest JVM?', a: 'Java Virtual Machine: program, który wykonuje kod bajtowy (.class). Dzięki niej ten sam program działa na Windows, Linuksie i macOS.' },
]
