const STORAGE = 'BOOKSELF_APPS';

let books = [];

function isStorageExist(){
	if(typeof(Storage) === undefined){
		alert('browser anda tidak mendukung Storage');
		return false;
	}
	return true;
}
function saveData(){
	const parsed = JSON.stringify(books);
	localStorage.setItem(STORAGE, parsed);
	document.dispatchEvent(new Event('ondatasaved'));
}
function loadDataFromStorage(){
	let serialiezeData = localStorage.getItem(STORAGE);

	let data = JSON.parse(serialiezeData);

	if(data !== null){
		books = data;

		document.dispatchEvent(new Event('ondataloaded'));
	}
}
function updateDataStorage(){
	if(isStorageExist())
		saveData();
}
function composeBookObject(title ,author , year, isCompleted){
	return{
		id: +new Date(),
		title,
		author,
		year,
		isCompleted
	};
}
function findBook(bookId){
	for (book of books){
		if(book.id === bookId)
			return book;
	}
	return book;
}
function findBookIndex(bookId){
	let index = 0;
	for (book of books){
		if (book.id === bookId)
			return index;

		index++;
	}
	return -1;
}
function refreshDataFromBook(){
	const listUncompleted = document.getElementById(INCOMPLETE_BOOKS_SHELF_LIST);
	let listCompleted = document.getElementById(COMPLETE_BOOK_SHELF_LIST);

	for(book of books){
		const newBook = bookItem(book.title, book.author, book.year, book.isCompleted);
		newBook[BOOK_ITEMID] = book.id;


		if(book.isCompleted){
			listCompleted.append(newBook);
		}else{
			listUncompleted.append(newBook);
		}
	}
}