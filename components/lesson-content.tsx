import { CodeBlock } from "./code-block"
import Image from "next/image"
import Link from "next/link"

interface LessonContentProps {
  slug: string
}

export function LessonContent({ slug }: LessonContentProps) {
  const content = lessonContents[slug]
  
  if (!content) {
    return (
      <div className="text-center py-8">
        <p>Контент урока загружается...</p>
      </div>
    )
  }

  return content
}

// Lesson contents as JSX
const lessonContents: Record<string, React.ReactNode> = {
  variables: <VariablesContent />,
  converters: <ConvertersContent />,
  datetime: <DatetimeContent />,
  var: <VarContent />,
  transformation: <TransformationContent />,
  if: <IfContent />,
  cycles: <CyclesContent />,
  collections: <CollectionsContent />,
  trycatch: <TrycatchContent />,
  linq: <LinqContent />,
  ternar: <TernarContent />,
  regex: <RegexContent />,
  readkey: <ReadkeyContent />,
  consoleuse: <ConsoleuseContent />,
  arrowmenu: <ArrowmenuContent />,
  methods: <MethodsContent />,
  classasmodel: <ClassasmodelContent />,
  classascontainer: <ClassascontainerContent />,
  staticclass: <StaticclassContent />,
  files: <FilesContent />,
  json: <JsonContent />,
  xml: <XmlContent />,
  directory: <DirectoryContent />,
  process: <ProcessContent />,
  threads: <ThreadsContent />,
  nasled: <NasledContent />,
  interface: <InterfaceContent />,
  enum: <EnumContent />,
  tests: <TestsContent />,
  generic: <GenericContent />,
  this: <ThisContent />,
}

// Variables lesson
function VariablesContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 id="variables" className="anchor text-2xl font-bold mb-4">Переменные</h2>
      <p>
        Переменная - некое значение, которому дали имя. Значение внутри переменной может меняться. Кратко говоря -
        коробочка с названием, в которой мы можем хранить что-то одного типа. Например:
      </p>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>
          В коробку «ТолькоКрасные» я могу положить только красные карандаши и не могу положить синие. Однако
          количество и вид карандаша может быть любым. Здесь «карандаш» - тип данных, а «ТолькоКрасные» - имя переменной
        </li>
        <li>
          В коробку «MyNumber» я могу положить только целое число и не могу положить дробное. Однако число может быть
          любое. Целое число - тип данных. MyNumber - название переменной
        </li>
      </ul>
      <p>Базовые типы данных в C#:</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>int</strong> - целое число</li>
        <li><strong>double</strong> - дробное (потому что два числа, разделенные точкой, 45.5)</li>
        <li><strong>string</strong> - текст</li>
        <li><strong>char</strong> - символ</li>
        <li><strong>bool</strong> - буленово значение (true/false)</li>
      </ul>
      <p className="text-center">
        Создаются они по примеру <strong>типданных название;</strong>
      </p>

      <div className="line" />

      <p>Создадим переменную MyNumber из верхнего примера. Мы уже знаем, что целое число это int:</p>
      <CodeBlock>{`int MyNumber;`}</CodeBlock>

      <p>
        В конце каждой строчки в C# мы будем писать точку с запятой. Она - аналогия точки в предложениях. Мысль
        закончена - ставим точку. Создали переменную, присвоили значение - ставим точку с запятой.
      </p>
      <p>
        Изначально, внутри переменной ничего нет. Ничего в мире программирования - null. Чтобы присвоить ей значение, мы
        пишем, что наша <strong>переменная равна значению</strong>:
      </p>
      <CodeBlock>{`int MyNumber;
MyNumber = 1;`}</CodeBlock>

      <p>Также, значение можно сразу записать при создании:</p>
      <CodeBlock>{`int MyNumber = 1;`}</CodeBlock>

      <p>Null можно присвоить только к типам данных, которые не являются числами:</p>
      <CodeBlock>{`string myText = null; //все ок
int MyNumber = null; //не ок, null для чисел - 0`}</CodeBlock>

      <p>Чтобы разрешить хранение null в переменной, после типа данных нужно поставить «?»:</p>
      <CodeBlock>{`string? myText = null; //все ок
int? MyNumber = null; //все ок`}</CodeBlock>

      <p>Если переменных много и они одного типа, их можно объявить через запятую:</p>
      <CodeBlock>{`int numberThree = 3, numberFour = 4, numberFive = 5;`}</CodeBlock>

      <div className="line" />

      <h2 id="writeline" className="anchor text-2xl font-bold mb-4">Вывод в консоль - Console.WriteLine</h2>
      <p>
        Ввод и вывод в консоль - это методы. У всех методов после их имени будут стоять круглые скобки.
      </p>
      <p>
        С названиями в C# все очень просто - я хочу <strong>написать строку</strong>. Переводим на английский:
        I want to <strong>write a line</strong>
      </p>
      <p>Метод для вывода: <strong>Console.WriteLine()</strong></p>
      <CodeBlock>{`Console.WriteLine("Hello, world!");`}</CodeBlock>

      <p>Можно выводить значения переменных:</p>
      <CodeBlock>{`Console.WriteLine("Hello, world!");

string hiiii = "Hello, world!";
Console.WriteLine(hiiii);`}</CodeBlock>

      <p>
        Переменная - прозвище для какого-либо значения. Как меня зовут София, но друзья называют меня Софа.
        София - значение, Софа - прозвище. К значению можно обратиться и по полному имени, и по прозвищу.
      </p>
      <CodeBlock>{`string sofa = "София";

Console.WriteLine("София");
Console.WriteLine(sofa);`}</CodeBlock>

      <p>Если не хотите переносить текст на новую строку, используйте Console.Write():</p>
      <CodeBlock>{`Console.Write("София");
Console.Write("София"); // выведет СофияСофия в одну строку`}</CodeBlock>

      <div className="line" />

      <h2 id="readline" className="anchor text-2xl font-bold mb-4">Ввод в консоль - Console.ReadLine</h2>
      <p>Этот метод позволяет считать целую введенную <strong>строку</strong> из консоли.</p>
      <p>
        C# - строго типизированный язык, он не может сам понять, что ему ввели. Все что вы читаете - <strong>текст</strong>,
        который был введен с клавиатуры. А тип данных для текста - string.
      </p>
      <CodeBlock>{`string input = Console.ReadLine();`}</CodeBlock>
      <p>
        С этим значением можно делать что угодно в рамках текста. Если ввели цифру и хотите работать с ней как с числом,
        смотрите статью о <Link href="/csharp/converters" className="text-[var(--primary)] hover:underline">конвертации</Link>.
      </p>
    </article>
  )
}

// Converters lesson
function ConvertersContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 id="convert" className="anchor text-2xl font-bold mb-4">Конвертация</h2>
      <p>
        Если я хочу сделать из текста цифру, я буду ее конвертировать (переводим на английский - to convert,
        значит нам нужно слово <strong>Convert</strong>)
      </p>
      <p>
        Я хочу конвертировать текст, <strong>а именно</strong>, конвертировать в Int. Интов много:
      </p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Int16</strong> - short (короткий инт)</li>
        <li><strong>Int32</strong> - int (обычный инт)</li>
        <li><strong>Int64</strong> - long (длинный инт)</li>
      </ul>
      <p>Хотим обычный - выбираем Int32:</p>
      <CodeBlock>{`int x = Convert.ToInt32(input);`}</CodeBlock>

      <p>Пример - вводим текст «5», конвертируем в число, прибавляем 5:</p>
      <CodeBlock>{`string input = Console.ReadLine();
int x = Convert.ToInt32(input);

int result = x + 5;
Console.WriteLine(result);`}</CodeBlock>

      <div className="line" />

      <h4 id="parse" className="anchor text-xl font-bold mb-4">типданных.Parse()</h4>
      <p>
        Аналог <strong>Convert.ToТипданных</strong> это <strong>типданных.Parse()</strong>.
        Convert.ToInt32(строка) это int.Parse(строка). Работают одинаково, но Convert может работать с null, Parse - нет.
      </p>
      <CodeBlock>{`string? noValue = null;

int valueOne = Convert.ToInt32(noValue);
Console.WriteLine(valueOne); // выведет 0

int valueTwo = int.Parse(noValue);
Console.WriteLine(valueTwo); // выдаст ошибку`}</CodeBlock>

      <div className="line" />

      <h4 id="tryparse" className="anchor text-xl font-bold mb-4">типданных.TryParse()</h4>
      <p>
        Эта конструкция только пробует конвертировать значение. Если получилось - идем дальше. Если нет - тоже идем
        дальше, но значение установится по умолчанию (null или 0).
      </p>
      <CodeBlock>{`string? noValue = null;
int valueTwo;

// Структура:
// int.TryParse(чтоконвертируем, out кудаконвертируем);

int.TryParse(noValue, out valueTwo);
Console.WriteLine(valueTwo); // выдаст 0`}</CodeBlock>

      <p>TryParse() возвращает буленово значение: true если конвертация успешна, false если нет:</p>
      <CodeBlock>{`string? noValue = "45";
bool isConverted = int.TryParse(noValue, out int valueTwo);
Console.WriteLine(isConverted); // выдаст true`}</CodeBlock>
    </article>
  )
}

// DateTime lesson
function DatetimeContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Работа с датами - тип данных DateTime</h2>
      <p>
        DateTime позволяет работать с полным набором - секунды, минуты, часы, дни, месяцы и года, не разбивая это на
        отдельные переменные. Создается как сложные переменные: <strong>типданных название = new типданных</strong>
      </p>
      <CodeBlock>{`DateTime dt = new DateTime(); // 01.01.0001 00:00:00
DateTime dt2 = new DateTime(2022,12,30); // 30.12.2022 00:00:00
DateTime dt3 = new DateTime(2022,12,30, 23,40,59); // 30.12.2022 23:40:59
DateTime dt4 = DateTime.Now; //текущая дата`}</CodeBlock>

      <p>
        Из даты можно взять любое число - год, месяц, дату и прочее. Беру дату, <strong>а именно</strong>, минуту, день,
        время.
      </p>

      <p>К датам можно прибавлять или убирать дни, месяцы, года с помощью AddDays, AddMonths, AddYears:</p>
      <CodeBlock>{`DateTime dt4 = DateTime.Now;
dt4 = dt4.AddDays(-4); // вычитаем 4 дня`}</CodeBlock>

      <p>Даты можно отображать в различных форматах:</p>
      <CodeBlock>{`Console.WriteLine(dt4.ToShortDateString()); // 01.08.2023
Console.WriteLine(dt4.ToLongDateString()); // 01 августа 2023 г.

Console.WriteLine(dt4.ToString("День недели: dddd, Дата: dd MMMM yyyy"));
// День недели: вторник, Дата: 01 августа 2023`}</CodeBlock>
    </article>
  )
}

// Var lesson
function VarContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Var</h2>
      <p>
        Иногда, когда мы создаем переменные, Visual Studio нам вместо определенного типа данных предлагает
        подставить <strong>var</strong>. Что же это такое?
      </p>
      <CodeBlock>{`int num = 5; //int тут излишен, и так понятно, что это целое число
var numVar = 5;`}</CodeBlock>

      <p>Var не может понять тип данных, если значения нет:</p>
      <CodeBlock>{`var noValue; // Ошибка! Нет значения`}</CodeBlock>

      <p>
        Var - не слаботипизированная переменная. Компилятор при запуске смотрит на значение, подставляет вместо var
        нужный тип данных, и работает с ней как с этим типом.
      </p>

      <p className="text-center font-bold">
        Если справа от равно сразу понятно, что за тип данных - ставьте var. Если не понятно - явно укажите тип данных.
      </p>

      <p>
        Раз компилятор может понимать тип данных без конвертера, можно использовать{" "}
        <Link href="/csharp/transformation" className="text-[var(--primary)] hover:underline">
          явное и неявное преобразование переменных
        </Link>
      </p>
    </article>
  )
}

// Transformation lesson
function TransformationContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Явное и неявное преобразование данных</h2>
      <p>
        Преобразование - то же самое, что и конвертация. Использовать явное и неявное преобразование можно, чтобы не
        писать каждый раз конвертацию.
      </p>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>Из одной группы типов в другую (string в int) - <strong>конвертация</strong></li>
        <li>Из маленького в больший (short в int) - <strong>неявное преобразование</strong></li>
        <li>Из большего в меньший (int в short) - <strong>явное преобразование</strong></li>
      </ul>

      <div className="line" />

      <h4 id="implict" className="anchor text-xl font-bold mb-4">Неявное преобразование</h4>
      <p>
        Неявное преобразование можно выполнить, если значение может уместиться в переменной без усечения:
      </p>
      <CodeBlock>{`int num = 3758392;
long bigNum = num; //все ок!`}</CodeBlock>

      <div className="line" />

      <h4 id="explict" className="anchor text-xl font-bold mb-4">Явное преобразование (приведение)</h4>
      <p>
        Приведение - способ явно указать компилятору, что необходимо выполнить преобразование и что мы знаем о
        возможной потере данных.
      </p>
      <p>С помощью круглых скобок (может выбросить ошибку):</p>
      <CodeBlock>{`double dou = 1024.5;
int num = (int)dou;

Console.WriteLine(num); //1024`}</CodeBlock>

      <p>С помощью оператора as (вместо ошибки вернет null):</p>
      <CodeBlock>{`object dou = 1024.5;
string text = dou as string;

Console.WriteLine(text); //null`}</CodeBlock>
    </article>
  )
}

// If lesson
function IfContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 id="if" className="anchor text-2xl font-bold mb-4">Условия</h2>
      <p>
        Алгоритм программы должен удовлетворить всех. Возьмем кофемашину: один хочет просто кофе, другой американо.
        Для каждого программа должна работать по-своему. Здесь нам понадобятся условия.
      </p>
      <p>
        <strong>Если</strong> он хочет просто кофе, <strong>то</strong> сделать ему эспрессо.
        <strong>Если</strong> он хочет латте, <strong>то</strong> сделать эспрессо и взбить молоко.
      </p>
      <CodeBlock>{`Console.WriteLine("Что вы хотите?");
string answer = Console.ReadLine();

if (answer == "Кофе")
{
    Console.WriteLine("Вот ваш кофе!");
}
if (answer == "Латте")
{
    Console.WriteLine("Вот латте!");
}`}</CodeBlock>

      <p>Операторы для составления условий:</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><code>==</code> - Равно</li>
        <li><code>!=</code> - Не равно</li>
        <li><code>{'>'}</code> - Больше</li>
        <li><code>{'<'}</code> - Меньше</li>
        <li><code>{'>='}</code> - Больше или равно</li>
        <li><code>{'<='}</code> - Меньше или равно</li>
      </ul>

      <div className="line" />

      <h4 id="moreif" className="anchor text-xl font-bold mb-4">If с несколькими условиями</h4>
      <p>Условия можно объединять с помощью && (И) или || (ИЛИ):</p>
      <CodeBlock>{`if (answer == "добавьте молоко" || answer == "сделайте кофе с молоком")
{
    Console.WriteLine("Вот кофе с молоком!");
}`}</CodeBlock>

      <div className="line" />

      <h4 id="ifelse" className="anchor text-xl font-bold mb-4">If...else</h4>
      <p>Else - «иначе», универсальный ответ для всех вариантов, которые не подходят:</p>
      <CodeBlock>{`if (answer == "Кофе")
{
    Console.WriteLine("Вот ваш кофе!");
}
else
{
    Console.WriteLine("Ничего другого у нас нет");
}`}</CodeBlock>

      <div className="line" />

      <h4 id="ifelseif" className="anchor text-xl font-bold mb-4">If...else if</h4>
      <p>Else if - условие, которое выполняется только если предыдущее было неверным:</p>
      <CodeBlock>{`if (answer == "Кофе")
{
    Console.WriteLine("Вот ваш кофе!");
}
else if (answer == "Эспрессo")
{
    Console.WriteLine("Вот ваш эспрессo");
}
else
{
    Console.WriteLine("Ничего другого у нас нет");
}`}</CodeBlock>

      <div className="line" />

      <h4 id="switchcase" className="anchor text-xl font-bold mb-4">Switch-case</h4>
      <p>Если конструкция if-else if проверяет только значение переменной, можно записать как switch-case:</p>
      <CodeBlock>{`switch (answer)
{
    case "Кофе":
    case "кофе":
    case "кофейку":
        Console.WriteLine("Вот ваш кофе!");
        break;
    case "Эспресco":
        Console.WriteLine("Вот ваш эспрессo");
        break;
    default:
        Console.WriteLine("Ничего другого у нас нет");
        break;
}`}</CodeBlock>
    </article>
  )
}

// Cycles lesson
function CyclesContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Циклы: while, for, do..while</h2>
      <p>
        Цикл - повторяющийся блок кода. Когда использовать:
      </p>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>Когда есть несколько повторяющихся строк кода</li>
        <li>Когда код должен повторится, но не знаем сколько раз</li>
      </ul>
      <p>
        Слышим слово <strong>пока</strong> - ставим цикл: «Пока человек хочет сахар, добавить сахар в кофе»
      </p>

      <div className="line" />

      <h4 id="while" className="anchor text-xl font-bold mb-4">While</h4>
      <p>While - тот же if, только выполняется много раз:</p>
      <CodeBlock>{`Console.WriteLine("Вам добавить сахар в кофе?");
string answer = Console.ReadLine();

while (answer == "Да")
{
    Console.WriteLine("Добавила ложку сахара в кофе");
    Console.WriteLine("Добавить еще?");
    answer = Console.ReadLine();
}`}</CodeBlock>

      <p className="text-center font-bold">
        Если в условии цикла используется переменная, она должна меняться внутри цикла!
      </p>

      <div className="line" />

      <h4 id="breakcontinue" className="anchor text-xl font-bold mb-4">Break и continue</h4>
      <p>Break - «ломает» цикл и выходит из него, continue - пропускает все что после него:</p>
      <CodeBlock>{`int sugarAmount = 0;

while (sugarAmount < 10)
{
    sugarAmount++;

    if (sugarAmount > 5)
    {
        Console.WriteLine(sugarAmount + " - это очень много");
        break; // или continue
    }

    Console.WriteLine("Добавлено " + sugarAmount + " ложек сахара");
}

Console.WriteLine("все!");`}</CodeBlock>

      <div className="line" />

      <h4 id="for" className="anchor text-xl font-bold mb-4">For</h4>
      <p>For - компактный вариант записи while с созданием переменной, условием и действием:</p>
      <CodeBlock>{`Console.WriteLine("Сколько сахара вы хотите?");
int askedAmount = Convert.ToInt32(Console.ReadLine());

for (int i = 1; i <= askedAmount; i++)
{
    Console.WriteLine("Теперь в чае " + i + " ложек");
}`}</CodeBlock>

      <div className="line" />

      <h4 id="dowhile" className="anchor text-xl font-bold mb-4">Do..while</h4>
      <p>Do..while сначала выполняет код, а потом проверяет условие (выполнится минимум 1 раз):</p>
      <CodeBlock>{`bool isListening;

do
{
    Console.WriteLine("Говорю");
    Console.WriteLine("Меня слушают?");
    isListening = Convert.ToBoolean(Console.ReadLine());
} while (isListening);`}</CodeBlock>
    </article>
  )
}

// Collections lesson
function CollectionsContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Коллекции: массив, лист, матрица</h2>
      <p>
        Коллекция - набор однотипных данных, где каждый элемент пронумерован. Как гардероб - хранится только верхняя
        одежда, и все вешалки имеют свой номерок.
      </p>

      <div className="line" />

      <h4 id="array" className="anchor text-xl font-bold mb-4">Массив</h4>
      <p>Массив - ограниченная коллекция. После указания типа ставятся квадратные скобки:</p>
      <CodeBlock>{`string[] garderobe;
string[] mainGarderobe = new string[4];
string[] mainGarderobe = ["шуба", "-", "пуховик", "ветровка"];`}</CodeBlock>

      <div className="line" />

      <h4 id="indexes" className="anchor text-xl font-bold mb-4">Индексация</h4>
      <p>Индекс ВСЕГДА начинается с нуля:</p>
      <CodeBlock>{`string[] mainGarderobe = ["шуба", "-", "пуховик", "ветровка"];

Console.WriteLine(mainGarderobe[0]); // шуба
Console.WriteLine(mainGarderobe[3]); // ветровка

mainGarderobe[0] = "пальто";
Console.WriteLine(mainGarderobe[0]); // пальто`}</CodeBlock>

      <div className="line" />

      <h4 id="list" className="anchor text-xl font-bold mb-4">Лист</h4>
      <p>Лист - динамическая коллекция, можно добавлять и убирать элементы:</p>
      <CodeBlock>{`List<string> pokupki = new List<string>();
List<string> pokupki = ["яица", "молоко", "хлеб"];

pokupki.Add("энергетик"); // добавить
pokupki.Remove("молоко"); // удалить
pokupki.RemoveAt(1); // удалить по индексу`}</CodeBlock>

      <div className="line" />

      <h4 id="matrix" className="anchor text-xl font-bold mb-4">Матрица</h4>
      <p>Матрица - многомерная коллекция:</p>
      <CodeBlock>{`int[,] table = new int[2, 4];
int[,] table = { { 0, 1, 2, 3 }, { 4, 5, 6, 7 } };

Console.WriteLine(table[1, 2]); // элемент в ряду 1, столбце 2`}</CodeBlock>

      <div className="line" />

      <h4 id="printcollections" className="anchor text-xl font-bold mb-4">Вывод коллекций</h4>
      <p>Цикл for или foreach:</p>
      <CodeBlock>{`string[] mainGarderobe = ["шуба", "-", "пуховик", "ветровка"];

for (int i = 0; i < mainGarderobe.Length; i++)
{
    Console.WriteLine(mainGarderobe[i]);
}

foreach (string kurtka in mainGarderobe)
{
    Console.WriteLine(kurtka);
}`}</CodeBlock>

      <div className="line" />

      <h4 id="printmatrix" className="anchor text-xl font-bold mb-4">Вывод матрицы</h4>
      <p>Два вложенных цикла for:</p>
      <CodeBlock>{`for (int m = 0; m < cloakroom.GetLength(0); m++)
{
    for (int n = 0; n < cloakroom.GetLength(1); n++)
    {
        Console.Write(cloakroom[m,n] + "\\t");
    }
    Console.WriteLine();
}`}</CodeBlock>
    </article>
  )
}

// Trycatch lesson
function TrycatchContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Обработка ошибок: try-catch-finally</h2>
      <p>
        Иногда программа выкидывает ошибку и заканчивается. Мы хотим, чтобы программа продолжила работу,
        оповестив пользователя о проблеме.
      </p>

      <p>Try-catch позволяет выполнить код в блоке try. Если ошибка - переходим в catch:</p>
      <CodeBlock>{`try
{
    int zero = 0;
    int a = 5 / zero;
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}`}</CodeBlock>

      <p>Exception берет любую ошибку. Для конкретной ошибки указываем её тип:</p>
      <CodeBlock>{`try
{
    string zero = Console.ReadLine();
    int a = 5 / Convert.ToInt32(zero);
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Это ошибка деления на ноль");
}
catch (FormatException ex)
{
    Console.WriteLine("Тут я ввела не число, a текст");
}`}</CodeBlock>

      <p>Блок finally выполняется всегда, после try или catch:</p>
      <CodeBlock>{`try
{
    // код
}
catch (Exception ex)
{
    // обработка ошибки
}
finally
{
    Console.WriteLine("Выполняется всегда");
}`}</CodeBlock>
    </article>
  )
}

// LINQ lesson
function LinqContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">LINQ запросы с коллекциями</h2>
      <p>
        Для работы с коллекциями есть много методов - выборка, минимум/максимум, перебор и многое другое.
      </p>

      <div className="line" />

      <h4 id="simple" className="anchor text-xl font-bold mb-4">Простые методы</h4>
      <p>Нахождение минимума:</p>
      <CodeBlock>{`int[] massive = new[] { 6, 3, 8, 12, 0, -4, 4 };
int min = massive.Min();
Console.WriteLine(min); // -4`}</CodeBlock>

      <p>Другие простые методы:</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><code>Max()</code> - максимальное</li>
        <li><code>Sum()</code> - сумма элементов</li>
        <li><code>Count()</code> - количество элементов</li>
        <li><code>Average()</code> - среднее значение</li>
        <li><code>First()</code> / <code>FirstOrDefault()</code> - первый элемент</li>
        <li><code>Last()</code> / <code>LastOrDefault()</code> - последний элемент</li>
      </ul>

      <div className="line" />

      <h4 id="hard" className="anchor text-xl font-bold mb-4">Сложные методы</h4>
      <p>Методы с условиями используют лямбда-выражения:</p>
      <CodeBlock>{`int[] massive = new[] { 1, 1, 2, 4, 1, 6 };

// Выборка элементов не равных 1
int[] newMassive = massive.Where(item => item != 1).ToArray();
// newMassive = { 2, 4, 6 }`}</CodeBlock>

      <p>Другие сложные методы:</p>
      <CodeBlock>{`// Сортировка
int[] sorted = massive.OrderBy(x => x).ToArray();
int[] sortedDesc = massive.OrderByDescending(x => x).ToArray();

// Все ли удовлетворяют условию
bool isAllOne = massive.All(x => x == 1); // false

// Хотя бы один удовлетворяет
bool hasLarge = massive.Any(x => x > 2); // true

// Первый по условию
int item = massive.FirstOrDefault(x => x < 0);

// Количество по условию
int count = massive.Count(item => item == 1); // 3`}</CodeBlock>
    </article>
  )
}

// Ternar lesson
function TernarContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Тернарные выражения, проверки на пустоту</h2>
      <p>
        Сегодня научимся делать быстрые проверки на пустоту и сокращать простые if/else.
      </p>

      <div className="line" />

      <h4 id="nullbridge" className="anchor text-xl font-bold mb-4">Продолжение действия если не null - ?</h4>
      <p>
        Если переменная null, нельзя делать с ней операции. Вопросительный знак после кода,
        который может вернуть null, предотвращает ошибку:
      </p>
      <CodeBlock>{`string notFound = ReturnTextOrNull("не текст")?.ToString();
// Если null, ToString не выполнится`}</CodeBlock>

      <div className="line" />

      <h4 id="nullcheck" className="anchor text-xl font-bold mb-4">Проверка на пустоту - ??</h4>
      <p>Два вопросительных знака - значение по умолчанию если null:</p>
      <CodeBlock>{`string notFound = ReturnTextOrNull("не текст") ?? "По умолчанию";`}</CodeBlock>

      <div className="line" />

      <h4 id="shortif" className="anchor text-xl font-bold mb-4">Сокращение if - ? :</h4>
      <p>Тернарный оператор - сокращение if/else для присваивания:</p>
      <CodeBlock>{`// Вместо:
if (notFound == "текст")
    notFound = "Метод вернул текст";
else
    notFound = "Метод вернул пустоту";

// Можно написать:
string notFound = ReturnTextOrNull("текст") == "текст" 
    ? "Метод вернул текст" 
    : "Метод вернул пустоту";`}</CodeBlock>

      <div className="line" />

      <h4 id="result" className="anchor text-xl font-bold mb-4">Итог</h4>
      <ul className="list-disc pl-6 space-y-2 my-4">
        <li>Код не шел дальше если null - <strong>ставлю ? после null-значения</strong></li>
        <li>Значение по умолчанию если null - <strong>ставлю ?? и значение</strong></li>
        <li>Сократить if с присваиванием - <strong>строю if через ? :</strong></li>
      </ul>
    </article>
  )
}

// Placeholder components for other lessons
function RegexContent() {
  return <LessonPlaceholder title="Регулярные выражения - Regex" />
}

function ReadkeyContent() {
  return <LessonPlaceholder title="Чтение символов с клавиатуры" />
}

function ConsoleuseContent() {
  return <LessonPlaceholder title="Взаимодействие с консолью" />
}

function ArrowmenuContent() {
  return <LessonPlaceholder title="Пример стрелочного меню" />
}

function MethodsContent() {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Методы</h2>
      <p>
        Весь код пишется сплошняком сверху вниз. Однако блоки кода выполняют различные действия.
        Эти блоки можно выделить в <strong>методы</strong>.
      </p>

      <div className="line" />

      <h4 id="structure" className="anchor text-xl font-bold mb-4">Структура проекта с методами</h4>
      <p>
        Пространство имен - контейнер для классов. Класс - контейнер для методов.
        Метод - контейнер кода.
      </p>

      <div className="line" />

      <h4 id="creation" className="anchor text-xl font-bold mb-4">Создание метода</h4>
      <CodeBlock>{`void Avtomat()
{
    Console.WriteLine("Выбираю жвачку...");
    Console.WriteLine("Вот ваша жвачка!");
}

// Вызов метода:
Avtomat();`}</CodeBlock>

      <div className="line" />

      <h4 id="return" className="anchor text-xl font-bold mb-4">Возврат значения</h4>
      <p>Void - метод ничего не возвращает. Для возврата указываем тип данных:</p>
      <CodeBlock>{`string Avtomat()
{
    Console.WriteLine("Выбираю жвачку...");
    return "жвачка";
}

string ruchki = Avtomat(); // сохраняем результат`}</CodeBlock>

      <div className="line" />

      <h4 id="parameters" className="anchor text-xl font-bold mb-4">Параметры</h4>
      <p>В метод можно передавать значения через параметры:</p>
      <CodeBlock>{`string Avtomat(int monetopriemnik)
{
    if (monetopriemnik == 10)
    {
        return "жвачка";
    }
    return "ничего";
}

string result = Avtomat(10);`}</CodeBlock>
    </article>
  )
}

function ClassasmodelContent() {
  return <LessonPlaceholder title="Классы как свои типы данных" />
}

function ClassascontainerContent() {
  return <LessonPlaceholder title="Классы как контейнеры" />
}

function StaticclassContent() {
  return <LessonPlaceholder title="Статичные классы" />
}

function FilesContent() {
  return <LessonPlaceholder title="Работа с файлами" />
}

function JsonContent() {
  return <LessonPlaceholder title="Работа с JSON" />
}

function XmlContent() {
  return <LessonPlaceholder title="Работа с XML" />
}

function DirectoryContent() {
  return <LessonPlaceholder title="Папки: создание, чтение, удаление" />
}

function ProcessContent() {
  return <LessonPlaceholder title="Процессы: запуск, выключение" />
}

function ThreadsContent() {
  return <LessonPlaceholder title="Потоки, Thread" />
}

function NasledContent() {
  return <LessonPlaceholder title="Наследование" />
}

function InterfaceContent() {
  return <LessonPlaceholder title="Интерфейсы" />
}

function EnumContent() {
  return <LessonPlaceholder title="Перечисляемые типы, enum" />
}

function TestsContent() {
  return <LessonPlaceholder title="Unit-тесты, библиотека NUnit" />
}

function GenericContent() {
  return <LessonPlaceholder title="Generic-методы, тип данных T" />
}

function ThisContent() {
  return <LessonPlaceholder title="Методы расширения, this" />
}

function LessonPlaceholder({ title }: { title: string }) {
  return (
    <article className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
        <p className="text-[var(--muted-foreground)]">
          Контент этого урока будет добавлен в ближайшее время. Пока вы можете ознакомиться с другими статьями.
        </p>
      </div>
    </article>
  )
}
