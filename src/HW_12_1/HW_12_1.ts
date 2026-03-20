/*
У вас есть две сущности – список фильмов и список категорий фильмов.
Каждый фильм включает в себя поля: название, год выпуска, рейтинг, список наград.
Категория включает поля: название и фильмы.
У каждого списка есть поиск по имени (это, по сути, фильтрация), в списке фильмов есть дополнительная фильтрация по году выпуска, рейтингу и наградам.
У нас определены три типа фильтров:
Фильтр соответствия имеет полеfilter
Фильтр диапазона имеет поле filterиfilterTo
Фильтр поиска по значениям имеет полеvalues
Каждый список содержит состояние его фильтров, которое может быть изменено только методом applySearchValueили applyFiltersValue(при наличии дополнительных фильтров)
Вам необходимо подумать о разделении вашего кода на разные сущности, интерфессы и типы, чтобы сделать ваше решение типобезопасным. Реализация всех методов не необходима – это по желанию.
*/

//Basic entities
type Award = string;

interface Movie {1
  title: string;
  year: number;
  rating: number;
  awards: Award[];
}

interface Category {
  name: string;
  movies: Movie[];
}
//==================================================================
//Filters types
interface MatchFilter<T> {
  type: 'match';
  filter: T;
}

interface RangeFilter<T> {
  type: 'range';
  filter: T;
  filterTo: T;
}

interface ValuesFilter<T> {
  type: 'values';
  values: T[];
}
//==================================================================
//Union types
type Filter<T> = MatchFilter<T> | RangeFilter<T> | ValuesFilter<T>;
//==================================================================
//Movies filters
interface MovieFilters {
  year?: Filter<number>;
  rating?: Filter<number>;
  awards?: Filter<string>;
}
//==================================================================
//Basic interface of the list
interface SearchableList<T> {
  searchValue: string;
  applySearchValue(value: string): void;
  getFilteredItems(): T[];
}
//==================================================================
//Extend for lists with filters
interface FilterableList<T, F> extends SearchableList<T> {
  filters: F;
  applyFiltersValue(filters: F): void;
}
//==================================================================
//Implementation list of movies
class MovieList implements FilterableList<Movie, MovieFilters> {
  private movies: Movie[];

  searchValue: string = '';
  filters: MovieFilters = {};

  constructor(movies: Movie[]) {
    this.movies = movies;
  }

  applySearchValue(value: string) {
    this.searchValue = value;
  }

  applyFiltersValue(filters: MovieFilters) {
    this.filters = filters;
  }

  getFilteredItems(): Movie[] {
    let result = [...this.movies];

    // 🔍 пошук по назві
    if (this.searchValue) {
      result = result.filter(m =>
        m.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }

    // 🎯 приклад фільтра по рейтингу (можеш розширити)
    if (this.filters.rating?.type === 'range') {
      const { filter, filterTo } = this.filters.rating;
      result = result.filter(m => m.rating >= filter && m.rating <= filterTo);
    }

    return result;
  }
}
//==================================================================
//Lit of categories
class CategoryList implements SearchableList<Category> {
  private categories: Category[];

  searchValue: string = '';

  constructor(categories: Category[]) {
    this.categories = categories;
  }

  applySearchValue(value: string) {
    this.searchValue = value;
  }

  getFilteredItems(): Category[] {
    if (!this.searchValue) return this.categories;

    return this.categories.filter(c =>
      c.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }
}


