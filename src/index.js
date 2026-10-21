const { sequelize, Album, Song } = require('./models');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к SQLite установлено.');
    await sequelize.sync({ force: true });

    const album1 = await Album.create({ title: 'Корми демонов по расписанию', year: 2017 });
    const album2 = await Album.create({ title: 'Питер, чай, не Франция', year: 2019 });

    // Специальный метод createX (createSongs у hasMany с as: 'songs')
    await album1.createSong({ title: 'Легенда о Богине Гроз', durationSec: 214 });
    await album1.createSong({ title: 'Альтушка для скуфа', durationSec: 165, isSingle: true });

    // Специальный метод addX — привязываем уже созданные песни
    const s1 = await Song.create({ title: 'Ты такая дурная', durationSec: 190 });
    const s2 = await Song.create({ title: 'Если бы', durationSec: 201 });
    await album2.addSongs([s1, s2]);

    console.log(`В альбоме «${album1.title}» песен: ${await album1.countSongs()}`);

    // Жадная загрузка: альбомы вместе с песнями
    const albums = await Album.findAll({
      include: [{ model: Song, as: 'songs' }],
      order: [['year', 'ASC'], [{ model: Song, as: 'songs' }, 'id', 'ASC']],
    });
    console.log('\n=== Альбомы pyrokinesis ===');
    for (const a of albums) {
      console.log(`\n${a.title} (${a.year})`);
      a.songs.forEach((s, i) =>
        console.log(`  ${i + 1}. ${s.title} — ${Math.floor(s.durationSec / 60)}:${String(s.durationSec % 60).padStart(2, '0')}${s.isSingle ? ' [сингл]' : ''}`));
    }

    // Обратная сторона связи: песня + её альбом
    const song = await Song.findOne({ where: { title: 'Если бы' }, include: [{ model: Album, as: 'album' }] });
    console.log(`\nПесня «${song.title}» входит в альбом «${song.album.title}»`);
  } catch (err) {
    console.error('Ошибка:', err.message);
  } finally {
    await sequelize.close();
    console.log('\nСоединение закрыто.');
  }
}

main();
