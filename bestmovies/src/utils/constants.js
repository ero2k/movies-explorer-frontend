const URL_MOVIES = "https://api.nomoreparties.co/beatfilm-movies"
const LOADED_MOVIES = {
    'desktop': {
        'totalCards': 12,
        'columns': 3,
        'download': 3
    },
    'tablet': {
        'totalCards': 8,
        'columns': 2,
        'download': 2
    },
    'mobile': {
        'totalCards': 5,
        'columns': 1,
        'download': 2
    }
}

const burgerMenuCheckbox = document.querySelector('.page')

const initialCards = [{
    _id: 6,
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    time: '162'
},
    {
        _id: 1,
        name: 'Челябинская область Челябинская областьЧелябинская ',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        time: '86'
    },
    {
        _id: 2,
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        time: '162'
    },
    {
        _id: 3,
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        time: '162'
    },
    {
        _id: 4,
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        time: '100'
    },
    {
        _id: 5,
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        time: '100'
    },
    {
        _id: 6,
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        time: '162'
    },
    {
        _id: 1,
        name: 'Челябинская область Челябинская областьЧелябинская ',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        time: '86'
    },
    {
        _id: 2,
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        time: '162'
    },
    {
        _id: 3,
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        time: '162'
    },
    {
        _id: 4,
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        time: '100'
    },
    {
        _id: 5,
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        time: '100'
    }, {
        _id: 6,
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        time: '162'
    },
    {
        _id: 1,
        name: 'Челябинская область Челябинская областьЧелябинская ',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        time: '86'
    },
    {
        _id: 2,
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        time: '162'
    },
    {
        _id: 3,
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        time: '162'
    }
];

const savedCards = [{
    _id: 6,
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    time: '162'
},
    {
        _id: 1,
        name: 'Челябинская область Челябинская областьЧелябинская ',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        time: '86'
    },
    {
        _id: 2,
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        time: '162'
    },
    {
        _id: 3,
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        time: '162'
    },
    {
        _id: 4,
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        time: '100'
    },
    {
        _id: 5,
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        time: '100'
    },]

export default URL_MOVIES

export {
    savedCards, burgerMenuCheckbox, URL_MOVIES, LOADED_MOVIES
}
