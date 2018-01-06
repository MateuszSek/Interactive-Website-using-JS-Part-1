Maciej: dodałbym margines na dole pola, a więc, żeby pod czarną linią "obramowania" zostało jeszcze trochę miejsca
Ja: zrobione, margines dolny dodany (CSS, body)

Maciej:wyrównałbym przyciski oblicz oraz wyczyść.
Ja:Przyciski Oblicz i Wyczyść są u mnie równo : 
Co mógłbym zrobić żeby były równo wszędzie, niezależnie od rozmiaru monitora?

Maciej:Możesz użyć czegoś takiego dla godziny rozpoczęcia, co do czasu picia, to też wystarczy input type chyba number i możesz podać min i max, a więc ograniczyć wpisanie do max 24.
Ja: Świetny pomysł! Zmieniłem ten długi kod HTML z select i 24 opcjami na proste pola input z ‘min’ i ‘max’. W przypadku akapitu ‘Picie rozpoczalem o godzinie’ nie uzywalem input type=’time’ bo tam jest precyzja minutowa a mi w zupelnosci wystarczy godzinowa. Natomiast input typu ‘number’ idealnie tu siadł. Teraz z Twoimi wskazówkami wygląda to już dużo przejrzyściej 

Maciej:Raczej nie powinieneś wrzucać do HTML pustych spanów na wyniki. Te spany spokojnie możesz wygenerować w JSie i je "appendować" czyli dodać do DOM.
Ja: Oki, zrobione

Maciej:Powinieneś również zrobić porządek w repo, skrypty do folderu scripts, cssy do folderu css itd.
Ja: Rozumiem, że to porada ogólna i należy ją stosować ZAWSZE nawet przy małych projektach gdy mam 1 plik HTML o nazwie index, 1 plik css o nazwie style i 1 plik JS o nazwie script? 
W tym wypadku nie mogę jeszcze tego zrobić, zmieniałem laptop i nie mam gita, chyba ze da sie potworzyc foldery poprzez przegladarke?

Maciej:Przyciski do czyszczenia i obliczania zamiast name powinny mieć id, selecktowanie po name jest przestarzałe i odchodzi się od tego.
Ja: Ok, zrobione

Maciej:ponazywanie zmiennych w logiczny sposób. Niestety ale nazywanie funkcji czego1, czego2 i czego3 jest niedopuszczalne,
Ja: Nigdy nie chce mi się tego robić ale masz racje -na dłuższą metę to konieczne. Zrobione, zmienne są po angielsku i nazwy trochę bardziej przejrzyste

Maciej:Chciałbym też abyś zrezygnował z funkcji anonimowych i pozamieniał swój kod:
$('jakis selecktor').click(function(){cos sie dzieje})
na: $('jakis selecktor').click(jakisSelectorClickHandler);
function jakisSelectorClickHandler() { cos sie dzieje };
Ja: Zrobione, dobra uwaga

Maciej:Co do podziału na funkcję, to chodzi mi o to, abyś najpierw zadeklarował zmienne globalne, tak, aby wszystkie funkcje mogły z nich korzystać (deklaracje zmiennych zrób po prostu na samej górze skryptu)
A następnie tworzył funkcje typu: getAllInputData, validateData, measureAlkoholPercent
Ja: Ten podpunkt to jest siekiera. Bardzo mi to otworzyło oczy na to jakim syfem był ten kod, tak wszystko w jednym. Trochę to zajęło ale wydaje mi się że już jest OK, pozamykałem wszystko w odpowiednich funkcjach odpowiedzialnych za poszczególne akcje i zrobiłem funckje dla przycisków.
