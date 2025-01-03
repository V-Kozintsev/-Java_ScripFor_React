//День 1: Рабочие механизмы JS

//Замыкания и области видимости
//Прототипное наследование
//this, call, apply, bind
//Задание: Написать функцию-счетчик с использованием замыканий.

function counterFunction() {
  let amount = 0;
  document.getElementById("count").innerText = amount;

  function counterAdd() {
    amount++;
    document.getElementById("count").innerText = amount;
    return amount;
  }
  function counterSubtract() {
    if (amount > 0) {
      amount--;
      document.getElementById("count").innerText = amount;
      return amount;
    }
  }

  return {
    counterAdd,
    counterSubtract,
  };
}
let ticktock = counterFunction();

document.getElementById("add").addEventListener("click", () => {
  ticktock.counterAdd();
});
document.getElementById("down").addEventListener("click", () => {
  ticktock.counterSubtract();
});

function Author(firstName, lastName) {
  // Приватные переменные
  let _firstName = firstName;
  let _lastName = lastName;

  // Публичные методы
  this.getFullName = function () {
    return `${_firstName} ${_lastName}`;
  };

  this.getFirstName = function () {
    return _firstName;
  };
}

function Book(title, year, author) {
  // Приватные переменные
  let _title = title;
  let _year = year;

  // Убедитесь, что author является экземпляром Author
  if (!(author instanceof Author)) {
    throw new Error("author must be an instance of Author");
  }

  // Использование this для присвоения автора
  this.author = author;

  // Публичные методы
  this.getBookInfo = function () {
    return `${_title}, published in ${_year}, by ${this.author.getFullName()}`;
  };

  // Метод для изменения автора
  this.changeAuthor = function (newAuthor) {
    if (!(newAuthor instanceof Author)) {
      throw new Error("newAuthor must be an instance of Author");
    }
    this.author = newAuthor;
  };

  // Метод для добавления краткого содержания
  this.setExcerpt = function (excerpt) {
    this.excerpt = excerpt;
  };

  this.getExcerpt = function () {
    return this.excerpt;
  };
}

// Создание экземпляров
const author1 = new Author("George", "Orwell");
const book1 = new Book("1984", 1949, author1);

// Изменить автора книги
const author2 = new Author("Aldous", "Huxley");
book1.changeAuthor.call(book1, author2);

// Добавить содержание
const setExcerpt = book1.setExcerpt.bind(book1);
setExcerpt("A dystopian novel set in a totalitarian society.");

// Получение информации о книге
console.log(book1.getBookInfo()); // "1984, published in 1949, by Aldous Huxley"
console.log(book1.getExcerpt()); // "A dystopian novel set in a totalitarian society."
