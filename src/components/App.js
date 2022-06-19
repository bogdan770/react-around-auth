import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsStateEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));

    api
      .getCardList()
      .then((res) => {
        setCards(
          res.map((card) => ({
            link: card.link,
            name: card.name,
            likes: card.likes,
            owner: card.owner,
            _id: card._id,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsStateEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIAddPlacePopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIAddPlacePopupOpen(false);
    setIsStateEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteCard(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const cardCopy = cards.filter((c) => c._id !== card._id);
        setCards(cardCopy);
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name,
          about,
        });
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar,
        });
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  return (
    <div className="shell">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          onAddPlaceClick={handleAddPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />

        <ImagePopup
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          isClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
