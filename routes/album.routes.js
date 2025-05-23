const express = require("express");
const router = express.Router();
const albumController = require("../controllers/album.controller");

const handleErrors = (err, req, res, next) => {
  console.error(err.stack); // Log l'erreur pour le débogage
  res.status(500).send("Erreur interne du serveur"); // Envoie une réponse d'erreur générique
};

router.get("/albums/create", albumController.createAlbumForm);
router.post("/albums/create", albumController.createAlbum, handleErrors);

router.get("/albums", albumController.albums);
router.get("/albums/:id", albumController.album);
router.post("/albums/:id", albumController.addImage);

router.get("/albums/:id/delete", albumController.deleteAlbum);
router.get("/albums/:id/delete/:imageIndex", albumController.deleteImage);

module.exports = router;
