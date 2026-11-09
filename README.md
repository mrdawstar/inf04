# INF.04 krok po kroku

Strona do nauki na egzamin zawodowy **INF.04** (technik programista): Java, algorytmy, Android Studio, C# WPF, React, dokumentacja, testy i teoria.

Statyczna strona (Vite + React + Tailwind, treści w MDX), bez backendu. Postęp zapisuje się w przeglądarce (localStorage) i można go wyeksportować do pliku JSON.

## Uruchomienie u siebie

Potrzebujesz Node.js w wersji 20.19 lub nowszej.

```bash
npm install
npm run dev          # strona na http://localhost:5173
npm run build        # wersja produkcyjna do folderu dist/
npm run check:java   # kompiluje i uruchamia WSZYSTKIE przykłady Javy z lekcji (wymaga JDK 17+)
```

## Gdzie co jest

| Ścieżka | Co tam jest |
|---|---|
| `src/data/roadmap.js` | lista działów i tematów (roadmapa) |
| `src/content/lessons/<dział>/X-YY.mdx` | treść lekcji |
| `src/content/lessons/<dział>/X-YY.data.js` | meta lekcji, mini-quiz i fiszki |
| `src/content/sciagi/` | ściągi |
| `src/data/theory.js` | bank pytań do testu teoretycznego |
| `src/data/exams.js` | próbne arkusze praktyczne i checklisty |
| `src/components/mdx.jsx` | klocki lekcji: `Why`, `Analogy`, `Note`, `ExamTip`, `Trick`, `Mistake`, `Task`, `Hint`, `Solution`, `Trace` |
| `scripts/check-java.mjs` | sprawdzarka kodu Javy |

### Jak dodać lekcję

1. Dopisz temat w `src/data/roadmap.js` (jeśli go nie ma).
2. Utwórz parę plików, np. `src/content/lessons/konsola/2-07.data.js` i `2-07.mdx`. W `meta.id` wpisz numer z roadmapy.
3. W `.mdx` trzymaj układ: `<Why>` → `## Teoria krok po kroku` → `## Wizualizacja` → `## Przykład kodu` → `## Najczęstsze błędy` → `## Trik na zapamiętanie` → `## Zadania`. Mini-quiz dokleja się sam z pliku `.data.js`.
4. Bloki ` ```java ` są sprawdzane przez `npm run check:java`. Atrybut `check` mówi, jak:
   `body` (fragment do `main`), `class` (metody), `types` (klasy), `error` (ma się NIE kompilować), `throws` (ma rzucić wyjątek), `none` (pomiń). Do tego `stdin="..."` i `expect="..."`.

## Wdrożenie: GitHub → Vercel

### 1. Załóż repozytorium na GitHubie

1. Wejdź na <https://github.com/new>.
2. Nazwa, np. `inf04-nauka`. Zostaw **puste** (bez README, bez .gitignore).
3. Kliknij **Create repository** i skopiuj adres, np. `https://github.com/TWOJ-LOGIN/inf04-nauka.git`.

### 2. Wyślij kod

W terminalu, w folderze projektu (tym z plikiem `package.json`):

```bash
git remote add origin https://github.com/TWOJ-LOGIN/inf04-nauka.git
git branch -M main
git push -u origin main
```

Jeśli Git poprosi o hasło, użyj **Personal Access Token** (GitHub → Settings → Developer settings → Tokens) albo zaloguj się przez GitHub Desktop.

### 3. Podłącz Vercel

1. Wejdź na <https://vercel.com> i zaloguj się kontem GitHub.
2. **Add New… → Project** → przy repozytorium `inf04-nauka` kliknij **Import**.
3. Vercel sam rozpozna **Vite**. Sprawdź tylko:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Kliknij **Deploy**. Po około minucie dostaniesz adres typu `inf04-nauka.vercel.app`.

### 4. Kolejne zmiany

Każdy `git push` na gałąź `main` automatycznie publikuje nową wersję. Nic więcej nie trzeba klikać.

### 5. Na telefonie

Otwórz adres w przeglądarce i wybierz **Dodaj do ekranu głównego**. Strona będzie się otwierać jak aplikacja.

Postęp jest zapisany w przeglądarce **na danym urządzeniu**. Żeby przenieść go między telefonem a komputerem: **Więcej → Postęp i kopia → Pobierz kopię**, a na drugim urządzeniu **Wczytaj z pliku**.
