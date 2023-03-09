const express = require("express")
const AuthController = require("../controllers/AuthController")
const router = express.Router()

const ZingController = require("../controllers/ZingController")
const verifyToken = require("../middlewares/verifyToken")

// getSong
router.get("/song", ZingController.getSong)

// getDetailPlaylist
router.get("/detailplaylist", ZingController.getDetailPlaylist)

// getHome
router.get("/home", ZingController.getHome)

// getTop100
router.get("/top100", ZingController.getTop100)

// getChartHome
router.get("/charthome", ZingController.getChartHome)

// getNewReleaseChart
router.get("/newreleasechart", ZingController.getNewReleaseChart)

// getInfoSong
router.get("/infosong", ZingController.getInfo)

// getArtist
router.get("/artist", ZingController.getArtist)

// getArtistSong
router.get("/artistsong", ZingController.getArtistSong)

// getLyric
router.get("/lyric", ZingController.getLyric)

// search
router.get("/search", ZingController.search)

// getListMV
router.get("/listmv", ZingController.getListMV)

// getCategoryMV
router.get("/categorymv", ZingController.getCategoryMV)

// getVideo
router.get("/video", ZingController.getVideo)

// Auth routes
router.post("/user/create", AuthController.createUser)
// login
router.post("/user/login", AuthController.login)
// add addFavoriteSong
router.post("/user/add-favorite-song", verifyToken, AuthController.addFavoriteSong)
// get fav songs 
router.get("/user/get-favorite-songs", verifyToken, AuthController.getFavoriteSongs)
router.get("/user/get-userdata", verifyToken, AuthController.getUserData)
// delete a songs from favoriteList
router.delete("/user/delete-favorite-song", verifyToken, AuthController.deleteFavoriteSongs)
// add playlist
router.post("/user/add-favorite-playlist", verifyToken, AuthController.addFavoritePlaylist)
router.get("/user/get-favorite-playlists", verifyToken, AuthController.getFavoritePlaylists)
router.delete("/user/delete-favorite-playlist", verifyToken, AuthController.deleteFavoritePlaylists)
router.post("/refreshtoken", AuthController.getNewAccessToken)
router.post("/logout", AuthController.logout)

module.exports = router
