// ========================
//   Puerto
// ========================
process.env.PORT = process.env.PORT || 3000;

// ========================
//   Entorno
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
//   Base de datos
// ========================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/moviesDB';
} else {
	urlDB = 'mongodb+srv://user-engelber:123456@apimovies.pkskr.mongodb.net/moviesDB?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;