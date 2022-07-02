document.addEventListener("DOMContentLoaded", function () {
 
    const iBook = document.getElementById("inputBook");
 
    iBook.addEventListener("submit", function (event) {
        event.preventDefault();
        inputBook();
        iBook.reset();
    });

    if(isStorageExist()){
    	loadDataFromStorage();
    };
});

document.addEventListener('ondatasaved', () =>{
});

document.addEventListener('ondataloaded', () =>{
	refreshDataFromBook();
	darkAction();
});
