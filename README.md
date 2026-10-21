# Sequelize + SQLite: связи таблиц (pyrokinesis)

Консольное приложение: альбомы и песни исполнителя pyrokinesis.

## Связь
**Album 1 — N Song** (`Album.hasMany(Song)` + `Song.belongsTo(Album)`), внешний ключ `albumId` в таблице `songs`, псевдонимы `songs` / `album`.

## Поля
- **Album**: `title` (строка, обязательное), `year` (целое).
- **Song**: `title` (строка, обязательное), `durationSec` (целое), `isSingle` (логическое), `albumId` (внешний ключ).

Используются специальные методы `createSong`, `addSongs`, `countSongs`, жадная загрузка через `include`.

## Запуск
```bash
npm install
npm start
```
