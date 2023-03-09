const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");
const con = require("../db/index.js");
require("dotenv").config();
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.PRIVATEKEY, {
    expiresIn: 60 * 60 * 24,
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESHKEY, {
    expiresIn: "10d",
  });
};

class AuthController {
  async createUser(req, res) {
    try {
      con.query(
        "SELECT * FROM user WHERE username = ? limit 1",
        [req.body.username],
        async function (err, result) {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "something wrong!" });
          } else {
            if (result.length < 1) {
              if (
                req.body.username &&
                req.body.email &&
                req.body.realname &&
                req.body.password
              ) {
                const salt = await bcrypts.genSalt(10);
                const hashed = await bcrypts.hash(req.body.password, salt);
                const sql =
                  "INSERT INTO `user` (`username`, `email`, `realname`, `password`) VALUES (?, ?, ?, ?)";
                con.query(
                  sql,
                  [
                    req.body.username,
                    req.body.email,
                    req.body.realname,
                    hashed,
                  ],
                  function (err, re) {
                    if (err) {
                      res.json({
                        success: false,
                        message: "Create user failled",
                      });
                    } else {
                      const access_token = jwt.sign(
                        {
                          username: req.body.username,
                          email: req.body.email,
                        },
                        process.env.PRIVATEKEY
                      );
                      res.status(201).json({
                        success: true,
                        message: "Create user successfully",
                        access_token,
                      });
                    }
                  }
                );
              }
            } else {
              res
                .status(400)
                .json({ success: false, message: "Username existing!" });
            }
          }
        }
      );
    } catch (error) {
      res.json({ success: false, message: "Have some errors" });
    }
  }

  login(req, res) {
    try {
      con.query(
        "SELECT * FROM user WHERE username = ? limit 1",
        [req.body.username],
        async function (err, result) {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "something wrong!" });
          } else {
            const currentUser = result[0];
            if (currentUser) {
              const valid = await bcrypts.compare(
                req.body.password,
                currentUser.password
              );
              if (valid) {
                const access_token = generateAccessToken({
                  username: req.body.username,
                  email: currentUser.email,
                });
                const refresh_token = generateRefreshToken({
                  username: req.body.username,
                  email: currentUser.email,
                });
                res.cookie("refreshToken", refresh_token, {
                  httpOnly: true,
                  secure: false,
                  domain: "localhost",
                  path: "/",
                  // sameSite: "strict",
                });
                res.status(200).json({
                  success: true,
                  message: "Success!",
                  access_token,
                  refresh_token,
                });
              } else {
                res
                  .status(400)
                  .json({ success: false, message: "password wrong!" });
              }
            } else {
              res
                .status(400)
                .json({ success: false, message: "User not found!" });
            }
          }
        }
      );
    } catch (error) {}
  }

  getNewAccessToken(req, res) {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) {
      res.status(400).json({
        success: false,
        message: "Unauthorize!",
      });
    } else {
      jwt.verify(refreshtoken, process.env.REFRESHKEY, (err, user) => {
        const newAccessToken = generateAccessToken({
          username: user.username,
          email: user.email,
        });
        const newRefreshToken = generateRefreshToken({
          username: user.username,
          email: user.email,
        });
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          accessToken: newAccessToken,
        });
      });
    }
  }

  addFavoriteSong(req, res) {
    try {
      const { songId } = req.body;
      if (!songId) {
        res.status(401).json({ success: false, message: "Missing song!" });
      } else {
        con.query(
          "SELECT * from favoritesongs WHERE songId = ? AND username=?",
          [songId, req.username],
          async function (err, result) {
            if (err) {
              res
                .status(400)
                .json({ success: false, message: "something wrong!" });
            } else {
              if (result.length > 0) {
                res.status(201).json({
                  success: true,
                  message: "Already in list!",
                });
              } else {
                con.query(
                  "INSERT INTO favoritesongs (`username`, `songId`) VALUES (?, ?)",
                  [req.username, songId],
                  async function (err) {
                    if (err) {
                      res
                        .status(400)
                        .json({ success: false, message: "something wrong!" });
                    } else {
                      res.status(200).json({
                        success: true,
                        message: "Add to favorite songs successfully",
                      });
                    }
                  }
                );
              }
            }
          }
        );
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "something wrong!" });
    }
  }

  getFavoriteSongs(req, res) {
    con.query(
      "SELECT * from favoritesongs WHERE username = ?",
      [req.username],
      async function (err, result) {
        if (err) {
          res.status(400).json({ success: false, message: "something wrong!" });
        } else {
          if (result) {
            const songs = result.map((item) => item.songId);
            res.status(200).json({
              success: true,
              message: "get favorite songs successfully",
              songs,
            });
          }
        }
      }
    );
  }

  deleteFavoriteSongs(req, res) {
    const { songId } = req.body;

    if (!songId) {
      res.status(401).json({ success: false, message: "Missing song!" });
    } else {
      con.query(
        "DELETE FROM favoritesongs WHERE favoritesongs.songId = ? AND favoritesongs.username = ?",
        [songId, req.username],
        async function (err) {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "something wrong!" });
          } else {
            res
              .status(200)
              .json({ success: true, message: "Remove successfully" });
          }
        }
      );
    }
  }
  getFavoritePlaylists(req, res) {
    con.query(
      "SELECT * from favoriteplaylist WHERE username = ?",
      [req.username],
      async function (err, result) {
        if (err) {
          res.status(400).json({ success: false, message: "something wrong!" });
        } else {
          if (result) {
            const playlists = result.map((item) => item.playlist_id);
            res.status(200).json({
              success: true,
              message: "get favorite playlists successfully",
              playlists,
            });
          }
        }
      }
    );
  }
  addFavoritePlaylist(req, res) {
    try {
      const { playlistId } = req.body;
      if (!playlistId) {
        res.status(401).json({ success: false, message: "Missing!" });
      } else {
        con.query(
          "SELECT * from favoriteplaylist WHERE playlist_id = ? and username = ?",
          [playlistId, req.username],
          async function (err, result) {
            if (err) {
              res
                .status(400)
                .json({ success: false, message: "something wrong!" });
            } else {
              if (result.length > 0) {
                res.status(201).json({
                  success: true,
                  message: "Đã có sẵn!",
                });
              } else {
                con.query(
                  "INSERT INTO favoriteplaylist (`username`, `playlist_id`) VALUES (?, ?)",
                  [req.username, playlistId],
                  async function (err) {
                    if (err) {
                      res
                        .status(400)
                        .json({ success: false, message: "something wrong!" });
                    } else {
                      res.status(200).json({
                        success: true,
                        message: "Thêm playlist yêu thich thành công",
                      });
                    }
                  }
                );
              }
            }
          }
        );
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "something wrong!" });
    }
  }
  deleteFavoritePlaylists(req, res) {
    const { playlistId } = req.body;

    if (!playlistId) {
      res.status(401).json({ success: false, message: "Missing song!" });
    } else {
      con.query(
        "DELETE FROM favoriteplaylist WHERE favoriteplaylist.playlist_id = ? AND favoriteplaylist.username = ?",
        [playlistId, req.username],
        async function (err) {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "something wrong!" });
          } else {
            res
              .status(200)
              .json({ success: true, message: "Remove successfully" });
          }
        }
      );
    }
  }
  getUserData(req, res) {
    if (req.username) {
      con.query(
        "SELECT * from user WHERE username = ? limit 1",
        [req.username],
        async function (err, result) {
          if (err) {
            res
              .status(400)
              .json({ success: false, message: "something wrong!" });
          } else {
            if (result.length > 0) {
              res.status(200).json({
                success: true,
                data: result[0],
              });
            } else {
              res.status(400).json({ success: false, message: "dont have" });
            }
          }
        }
      );
    }
  }

  logout(req, res) {
    try {
      res.clearCookie("refreshToken");
      res.status(200).json({
        success: true,
        message: "Đăng xuất thành công!",
      });
    } catch (error) {
      res.status(200).json({
        success: false,
        message: "Đăng xuất tb!",
        error,
      });
    }
  }
}

module.exports = new AuthController();
