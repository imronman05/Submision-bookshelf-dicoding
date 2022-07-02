const INCOMPLETE_BOOKS_SHELF_LIST = 'incompleteBookshelfList';
const COMPLETE_BOOK_SHELF_LIST = 'completeBookshelfList';
const BOOK_ITEMID = 'itemId';

const search = document.getElementById('searchSubmit');
 search.addEventListener('click', () => {
 	event.preventDefault();

 	const searchButton = document.getElementById('searchBookTitle');
 	const elementArticle = document.querySelectorAll('article');

 	for(article of elementArticle){
 		if(article != ''){
 			if(searchButton.value == ''){
 				article.style.display = 'block';
 			}else if(article.childNodes[0].innerText.toLowerCase() != searchButton.value.toLowerCase()){
 				article.style.display = 'none';
 			}else{article.style.display = 'block'};
 		}
 	}
 })


function inputBook(){
	const INCOMPLETE_BOOKS_SHELF = document.getElementById(INCOMPLETE_BOOKS_SHELF_LIST);
	const COMPLETE_BOOK_SHELF = document.getElementById(COMPLETE_BOOK_SHELF_LIST);

	const iBookTitle = document.getElementById('inputBookTitle').value;
	const iBookAuthor = 'Penulis: ' + document.getElementById('inputBookAuthor').value;
	const iBookYear = 'Tahun: ' + document.getElementById('inputBookYear').value;
	const iBookCompleted = document.getElementById('inputBookIsComplete').checked;
	
	const book = bookItem(iBookTitle, iBookAuthor, iBookYear, iBookCompleted);
	const booksObject = composeBookObject(iBookTitle, iBookAuthor, iBookYear, iBookCompleted);

	books[BOOK_ITEMID] = booksObject.id;
	console.log(booksObject)
	books.push(booksObject);

	if(iBookCompleted){
		COMPLETE_BOOK_SHELF.append(book);
	}else{
		INCOMPLETE_BOOKS_SHELF.append(book);
	}

	if (document.body.classList.contains('bodyDark')) {
		darkAction();
	}
	
	updateDataStorage();
}
function bookItem(data, dataPenulis, year, isCompleted){
	const judul = document.createElement('h3');
	judul.innerText = data;

	const penulis = document.createElement('p');
	penulis.classList.add('tulis');
	penulis.innerText = `${dataPenulis}`;

	const tahun = document.createElement('p');
	tahun.classList.add('nuhat')
	tahun.innerText = `${year}`;

	const title = document.createElement('article');
	title.classList.add('book_item');
	title.append(judul, penulis, tahun);

	const action = document.createElement('div');
	action.classList.add('action');
	title.append(action);

	if(isCompleted){
		action.append(booksEdit(),createUndoButton(),removeCheckButton());
	}else{
		action.append(booksEdit(),createCheckButton(),removeCheckButton());
	}
	return title;
}

function createButton(buttonTypeClass, eventListener){
	const button = document.createElement('button');
	button.classList.add('fa-solid');
	button.classList.add('fa-check');
	button.classList.add('green');
	button.addEventListener('click', function(event){
		eventListener(event);
		darkAction();
	});
	return button;
}
function addTaskToCompleted(taskElement){
	const listCompleted = document.getElementById(COMPLETE_BOOK_SHELF_LIST);
	const taskJudul = taskElement.querySelector('.book_item > h3').innerText;
	const taskPenulis = taskElement.querySelector('.book_item > .tulis').innerText;
	const taskTahun = taskElement.querySelector('.book_item > .nuhat').innerText;

	const newBook = bookItem(taskJudul, taskPenulis, taskTahun, true);

	const book = findBook(taskElement[BOOK_ITEMID]);
	book.isCompleted = true;
	newBook[BOOK_ITEMID] = book.id;

	listCompleted.append(newBook);
	taskElement.remove();

	updateDataStorage()
}
function createCheckButton(){
	return createButton('green', function(event){
		addTaskToCompleted(event.target.parentElement.parentElement);
	});
}
const alert = document.querySelector('.card');
const popupDone = document.querySelector('.popup-done');
const popupDoneH1 = document.querySelector('.popup-done h1');
const popupDoneLabel = document.querySelector('.popup-done label');
const doneBtn =  document.querySelector('.done-btn');

function removeButton(buttonTypeClass, eventListener){
	const popupCard = document.querySelector('.popup-card');
	const button = document.createElement('button');
	button.classList.add('fa-solid');
	button.classList.add('fa-trash-can');
	button.classList.add('red');
	button.addEventListener('click', function(event){
		alert.style.display = 'inline-block';
		popupCard.style.display = 'inline-block';
		const btn1 =  document.querySelector('.btn1');
		btn1.addEventListener('click', function(){
			alert.style.display = 'none';
		})
		const btn2 =  document.querySelector('.btn2');
		btn2.addEventListener('click', function(){
			popupCard.style.display = 'none';
			popupDone.style.display = 'inline-block';
			eventListener(event);
				doneBtn.addEventListener('click', function(){
					popupDone.style.display = 'none';
					alert.style.display = 'none';
				})
		})
	});
	return button;
}
function removeTaskFromCompleted(taskFromCompleted){
	const bookPosition = findBookIndex(taskFromCompleted[BOOK_ITEMID]);
	books.splice(bookPosition, 1);

	taskFromCompleted.remove();
	updateDataStorage();
}
function removeCheckButton(){
	return removeButton('red', function(event){
		removeTaskFromCompleted(event.target.parentElement.parentElement)
	});
}
function undoTaskFromCompleted(taskElement){
	const listUnCompleted = document.getElementById( INCOMPLETE_BOOKS_SHELF_LIST);

	const taskJudul = taskElement.querySelector('.book_item > h3').innerText;
	const taskPenulis = taskElement.querySelector('.book_item > .tulis').innerText;
	const taskTahun = taskElement.querySelector('.book_item > .nuhat').innerText;

	const newBook = bookItem(taskJudul, taskPenulis, taskTahun, false);
	
	const book = findBook(taskElement[BOOK_ITEMID]);
	book.isCompleted = false;
	newBook[BOOK_ITEMID] = book.id;

	listUnCompleted.append(newBook);
	taskElement.remove();

	updateDataStorage();
}
function createUButton(buttonTypeClass, eventListener){
	const button = document.createElement('button');
	button.classList.add('fa-solid');
	button.classList.add('fa-arrow-rotate-left');
	button.classList.add('green');
	button.addEventListener('click', function(event){
		eventListener(event);
		darkAction();
	});
	return button;
}
function createUndoButton(){
	return createUButton('green', function(event){
		undoTaskFromCompleted(event.target.parentElement.parentElement);
	})
}
function editBooks(buttonTypeClass, eventListener){
	const button = document.createElement('button');

	button.classList.add('fa-solid');
	button.classList.add('fa-pen');
	button.classList.add('yellow');
	button.addEventListener('click', function(event){
		eventListener(event);
	})
	return button;
}
function booksEdit(){
	return editBooks('yellow', function(event){
		editsBooks(event.target.parentElement.parentElement);
	})
}
function editsBooks(taskElement){
	let iBookTitle = document.getElementById('inputBookTitle');
	let iBookAuthor = document.getElementById('inputBookAuthor');
	let iBookYear = document.getElementById('inputBookYear');
	let iBookCompleted = document.getElementById('inputBookIsComplete');

    const buttonEdit = document.getElementById("bookSubmit");

	const book = findBook(taskElement[BOOK_ITEMID]);

	
	iBookTitle.value = book.title;
	iBookAuthor.value = book.author.substring(9);
	iBookYear.value = parseInt(book.year.substring(6));
	if (book.isCompleted) {
		iBookCompleted.checked = true;
	}else{
		iBookCompleted.checked = false;
	}

	buttonEdit.innerText = 'Simpan Perubahan';

	buttonEdit.addEventListener('click',function(){
		const bookIndex = books.findIndex((item => item.id === book.id));
		if (bookIndex === -1) return null;


		books[bookIndex].title = iBookTitle.value;
		books[bookIndex].author = iBookAuthor.value;
		books[bookIndex].year = 'Tahun: ' + iBookYear.value;
		books[bookIndex].isCompleted = book.isCompleted;

		books.splice(bookIndex, 1);
		taskElement.remove();
		alert.style.display = 'inline-block';
		popupDone.style.display = 'inline-block';
		popupDone.style.zIndex = '9999';
		popupDoneH1.innerText = 'Berhasil diubah';
		popupDoneLabel.innerText = 'Data sudah berhasil diubah';
		doneBtn.addEventListener('click', function(){
			popupDone.style.display = 'none';
			alert.style.display = 'none';
			let span = document.createElement('span');
			let spanText = document.createTextNode(' Belum selesai dibaca');
			span.append(spanText);
			buttonEdit.innerText = `Masukkan Buku ke rak`;
			buttonEdit.append(span);
		});
	})
}
 const ceklistBox = document.getElementById('inputBookIsComplete');
 	ceklistBox.addEventListener('change', () =>{

 		if(ceklistBox.checked){
 			document.querySelector('span').innerText = ' Selesai dibaca';
 		}else{
 			document.querySelector('span').innerText = ' Belum selesai dibaca';
 		}
 	})

// Dark Mode
if (localStorage.getItem('themaDark') == 'dark') {
	darkMode();
	darkInput();
	darkAction();
}
const dark = document.querySelector('.toggle');
dark.addEventListener('click', darkMode);

function darkMode(){
	const nDark = document.querySelector('.circle');
	const hBar = document.querySelector('.head_bar');
	const sSection = document.querySelector('.search_section');
	const sIcon = document.querySelector('.fa-magnifying-glass');
	const iSection = document.querySelector('.input_section');
	const iSubmit = document.querySelector('#bookSubmit');
	const dark = document.querySelector('.toggle');
	let isDark	= document.body.classList.toggle('bodyDark');
	console.log(isDark);

	if (isDark) {
		nDark.classList.add('dark-mode');
		dark.classList.add('backGround');
		hBar.classList.add('headDark');
		sSection.classList.add('searchShadow');
		search.classList.add('buttonDark');
		sIcon.classList.add('iconDark');
		iSection.classList.add('inputSection-dark');
		iSubmit.classList.add('buttonDark');

		darkInput();
		darkAction();
		localStorage.setItem('themaDark', 'dark');
	}else{
		nDark.classList.remove('dark-mode');
		dark.classList.remove('backGround');
		hBar.classList.remove('headDark');
		sSection.classList.remove('searchShadow');
		search.classList.remove('buttonDark');
		sIcon.classList.remove('iconDark');
		iSection.classList.remove('inputSection-dark');
		iSubmit.classList.remove('buttonDark');

		darkInput();
		darkAction();
		localStorage.removeItem('themaDark');
	}
}
function darkInput(){
	const iInput = document.querySelectorAll('.input input');
	const bookShelfDark = document.querySelectorAll('.book_shelf');

	if (document.body.classList.contains('bodyDark')) {
		for(let i = 0; i < iInput.length; i++){
			iInput[i].classList.add('inputDark');
		};
		for(let i = 0; i < bookShelfDark.length; i++){
			bookShelfDark[i].classList.add('book_shelfDark');
		};
	}else{
		for(let i = 0; i < iInput.length; i++){
			iInput[i].classList.remove('inputDark');
		};
		for(let i = 0; i < bookShelfDark.length; i++){
			bookShelfDark[i].classList.remove('book_shelfDark');
		};
	}	
}
function darkAction(){
	const bookItemDark = document.querySelectorAll('.book_item');
	const bookItemH3Dark = document.querySelectorAll('.book_item h3');
	const bookItemPDark = document.querySelectorAll('.book_item p');

	if (document.body.classList.contains('bodyDark')) {
		for(let i = 0; i < bookItemDark.length; i++){
			bookItemDark[i].classList.add('bookItemDark');
		};
		for(let i = 0; i < bookItemH3Dark.length; i++){
			bookItemH3Dark[i].classList.add('bookItemH3Dark');
		};
		for(let i = 0; i < bookItemPDark.length; i++){
			bookItemPDark[i].classList.add('bookItemPDark');
		};
	}else{
		for(let i = 0; i < bookItemDark.length; i++){
			bookItemDark[i].classList.remove('bookItemDark');
		};
		for(let i = 0; i < bookItemH3Dark.length; i++){
			bookItemH3Dark[i].classList.remove('bookItemH3Dark');
		};
		for(let i = 0; i < bookItemPDark.length; i++){
			bookItemPDark[i].classList.remove('bookItemPDark');
		};

	}
}