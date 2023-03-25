const createCard = (config, template, item, name) => {
  const card = new Card({
    config,
    template,

    item,
    userId,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleDeleteIconClick: () => {
      popupConfirmation.open();
      popupConfirmation.setSubmitCallback(() => {
        api
          .deleteCard(cardId)
          .then((res) => {
            card.deleteButtonClick(res);
            popupConfirmation.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleLikeClick: (id) => {
      if (card.availableLikes()) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.countNewLike(res);
            card.toggleButtonLike();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            card.countNewLike(res);
            card.toggleButtonLike();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  return card.generateCard();
};
