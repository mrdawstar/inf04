export const meta = {
  id: '1.12',
  minutes: 45,
  summary: 'extends, super, @Override, protected, polimorfizm, klasy abstrakcyjne, interfejsy, przeciążanie a nadpisywanie.',
  keywords: ['dziedziczenie', 'extends', 'super', 'Override', 'nadpisywanie', 'polimorfizm', 'abstract', 'abstrakcyjna', 'interface', 'interfejs', 'implements', 'protected', 'instanceof', 'Object'],
}

export const quiz = [
  { q: 'Co wypisze kod?', code: 'class A { String nazwa() { return "A"; } }\nclass B extends A {\n    @Override String nazwa() { return "B"; }\n}\n// main:\nA obiekt = new B();\nSystem.out.println(obiekt.nazwa());', options: ['A', 'B', 'AB', 'błąd'], answer: 1, explain: 'Polimorfizm: liczy się prawdziwy typ obiektu (B), a nie typ zmiennej (A).' },
  { q: 'Ile klas może bezpośrednio rozszerzać (extends) klasa w Javie?', options: ['dowolnie wiele', 'jedną', 'dwie', 'żadnej'], answer: 1, explain: 'Java ma jednokrotne dziedziczenie klas. Interfejsów można za to implementować wiele.' },
  { q: 'Nadpisywanie (overriding) to:', options: ['metoda o tej samej nazwie i innych parametrach w tej samej klasie', 'ponowna definicja metody klasy bazowej w klasie pochodnej z tą samą sygnaturą', 'zmiana typu zmiennej', 'wywołanie konstruktora klasy bazowej'], answer: 1, explain: 'Inne parametry w tej samej klasie to przeciążanie (overloading).' },
  { q: 'Którą klasę dziedziczy niejawnie każda klasa w Javie?', options: ['Main', 'String', 'Object', 'System'], answer: 2, explain: 'Object jest „przodkiem wszystkich”. Stąd każda klasa ma toString(), equals() i hashCode().' },
]

export const flashcards = [
  { q: 'Szkielet klasy pochodnej z konstruktorem?', a: '```\nclass Pies extends Zwierze {\n    public Pies(String imie) {\n        super(imie);   // pierwsza linia!\n    }\n}\n```' },
  { q: 'Przeciążanie vs nadpisywanie?', a: 'Przeciążanie (overloading): ta sama nazwa, inne parametry, ta sama klasa. Nadpisywanie (overriding): ta sama sygnatura, klasa pochodna, `@Override`.' },
  { q: 'Klasa abstrakcyjna a interfejs?', a: 'Abstrakcyjna: może mieć pola, konstruktor i gotowe metody, dziedziczysz jedną (`extends`). Interfejs: kontrakt „co umiesz”, implementujesz wiele (`implements`).' },
  { q: 'Cztery filary programowania obiektowego?', a: 'Hermetyzacja, dziedziczenie, polimorfizm, abstrakcja.' },
  { q: 'Co znaczy `protected`?', a: 'Widoczne w klasie, w klasach pochodnych i w tym samym pakiecie.' },
]
