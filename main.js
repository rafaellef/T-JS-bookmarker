// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //Get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null) {

        //Init array
        let bookmarks = [];

        //Add to array
        bookmarks.push(bookmark);

        //Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        //Get bookmarks from Localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //Add bookmark to array
        bookmarks.push(bookmark);

        //Re-set back to Localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear Form
    document.getElementById('myForm').reset();

    //Re-fetch bookmarks
    fetchBookmarks();

    //Prevent form from submiting
    e.preventDefault();

}

//Delete bookmark
function deleteBookmark(url) {
    //Get bookmarks from Localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Loop throught bookmarks
    for (let i=0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url){
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Re-set back to Localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    let bookmarksResults = document.getElementById('bookmarksResults')

    //Build output
    bookmarksResults.innerHTML = '';

    for(let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Visitar</a>' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Excluir</a> ' +
                                      '</h3>'+
                                      '</div>';
    }
}

//Validate Form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('Por favor preencha o formulário');
        return false;
    }

    //Regex url
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Por favor use uma URL válida');
        return false;
    }

    return true;
}